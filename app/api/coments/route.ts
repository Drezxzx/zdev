import client from "@/app/conn/conn";
import { NextResponse } from 'next/server';
import { createNotification } from "../notifications/controler";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const numberComents = url.searchParams.get("numberComents") as string;
    const postId = url.searchParams.get("postId") as string;

    try {
       if (numberComents.length > 0 && postId) {
           const numberComentsResult = await getNumberComents(postId);
           console.log(numberComentsResult.rows[0]);
           return NextResponse.json(numberComentsResult.rows[0], { status: 200 });
       }
       return NextResponse.json({ error: "Número de comentarios o postId no válido" }, { status: 400 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "Error al obtener comentarios" }), { status: 500 });
    }
}

export async function POST(req: Request) {
    const { post_id, comment, username } = await req.json();
    const url = new URL(req.url);
    const insertLike = url.searchParams.get("insertLike");

    try {
        if (username && username.length > 0 && insertLike === null) {
            console.log({ post_id, comment, username });
            const res = await createNewComent(post_id, comment, username);
            
            if (res.success) {
                const userCreatorNotification = await client.execute({
                    sql: `SELECT * from users WHERE username = ?`,
                    args: [username]
                });
                
                const userNotificed = await client.execute({
                    sql: `SELECT u.username, u.email FROM posts as p
                        INNER JOIN users as u ON p.author_id = u.id
                        WHERE p.id = ?;`,
                    args: [post_id]
                });

                if (userNotificed.rows[0].email !== userCreatorNotification.rows[0].email) {
                    await createNotification({checkIfIsTheSame : false, userEmail : userNotificed.rows[0].email as string, message : `${userCreatorNotification.rows[0].username} commented on your post`, idPost : post_id as string, idType : "1", idProfile : ""});
                }
            }

            return NextResponse.json(res, { status: 200 });
        }

        if (insertLike && insertLike.length > 0) {
            const res = await likeComent(post_id, username);
            console.log({post_id, username});
            if(res.success) {
                const userCreatorNotification = await client.execute({
                    sql: `SELECT * from users WHERE username = ?`,
                    args: [username]
                });

              
              console.log(typeof post_id)  
              const userNotificed = await client.execute({
                sql: `SELECT users.username, users.email, coments.post_id 
                            FROM coments
                            INNER JOIN users ON coments.user_id = users.id
                            WHERE coments.id = ? LIMIT 1;`,
                args: [post_id]
            });
                console.log(userNotificed.rows[0].email, userCreatorNotification.rows[0].email)

                if (userNotificed.rows[0].email !== userCreatorNotification.rows[0].email) {
                    await createNotification({checkIfIsTheSame : false, userEmail : userNotificed.rows[0].email as string, message : `${userCreatorNotification.rows[0].username} has liked your comment`, idPost : userNotificed.rows[0].post_id as string, idType : "1", idProfile : ""});
                }
            }
            

            
            
            return NextResponse.json(res, { status: 200 });
        }

        return NextResponse.json({ error: "Error al insertar comentario" }, { status: 500 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error al insertar comentario" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { post_id, username } = await req.json();
    try {
        const res = await unlikeComent(post_id, username);
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Error al eliminar un comentario" }), { status: 500 });
    }
}

async function likeComent(post_id: string, username: string) {
    const res = await client.execute({
        sql: "insert into comments_like_users (user_id, comment_id) VALUES ((SELECT id FROM users WHERE username = ?), ?);",
        args: [username, post_id]
    });
    return { success: res.rowsAffected > 0 };
}

async function unlikeComent(post_id: string, username: string) {
    const res = await client.execute({
        sql: "delete from comments_like_users where user_id = (SELECT id FROM users WHERE username = ?) and comment_id = ?;",
        args: [username, post_id]
    });
    return { success: res.rowsAffected > 0 };
}

async function createNewComent(post_id: string, comment: string, username: string) {
    const res = await client.execute({
        sql: "INSERT INTO coments (post_id, user_id, comment, created_at) VALUES (?, (SELECT id FROM users WHERE username = ?), ?, CURRENT_TIMESTAMP);",
        args: [post_id, username, comment]
    });
    return { success: res.rowsAffected > 0 };
}

async function getNumberComents(postId: string) {
    const numberComents = await client.execute({
        sql: "SELECT COUNT(*) as comentarios FROM coments WHERE post_id = ?;",
        args: [postId]
    });
    return numberComents;
}
