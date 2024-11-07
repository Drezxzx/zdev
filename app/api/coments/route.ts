import client from "@/app/conn/conn";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const numberComents = url.searchParams.get("numberComents") as string
    const postId = url.searchParams.get("postId") as string

    try {
       if (numberComents.length > 0 && postId) {
           const numberComents = await getNumberComents(postId)
           console.log(numberComents.rows[0])
           return Response.json( numberComents.rows[0], { status: 200 });
       }

       
    }catch(error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error al obtener comentarios" }), { status: 500 });
    }
}

export async function POST(req: Request) {
    const {post_id, comment, username} = await req.json();
    
    const url = new URL(req.url)
    const insertLike = url.searchParams.get("insertLike") as string
    console.log(insertLike)
    try {
        if (username && username.length > 0 && insertLike === null) {
            console.log({post_id, comment, username})
            const res = await createNewComent(post_id, comment, username)
            return Response.json(res, {status: 200});
        }

        if (insertLike && insertLike.length > 0) {
            console.log({post_id, username})
            const res = await likeComent(post_id, username)
            return Response.json(res, {status: 200});
        }

        return Response.json({ error: "Error al insertar comentario" }), { status: 500 };

    } catch (error) {
        console.log(error);
        return  Response.json({ error: "Error al insertar comentario" }), { status: 500 };
    }
}
async function likeComent (post_id: string, username: string) {
    const res = await client.execute({
        sql : "insert into comments_like_users (user_id, comment_id) VALUES ((SELECT id FROM users WHERE username = ?), ?);",
        args : [username,post_id]
    })

    return res.rowsAffected > 0
}

async function unlikeComent (post_id: string, username: string) {
    const res = await client.execute({
        sql : "delete from comments_like_users where user_id = (SELECT id FROM users WHERE username = ?) and comment_id = ?;",
        args : [username,post_id]
    })

    return res.rowsAffected > 0
}

export async function DELETE (req: Request) {
    const {post_id, username} = await req.json();
    try {
            const res = await unlikeComent(post_id, username)
            return Response.json(res, {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Error al eliminar un comentario" }), { status: 500 });
    }
}

async function createNewComent(post_id: string, comment: string, username: string) {
    const res = await client.execute({
        sql: "INSERT INTO coments (post_id, user_id, comment, created_at) VALUES (?, (SELECT id FROM users WHERE username = ?), ?, CURRENT_TIMESTAMP);",
        args: [post_id, username, comment]
    })
    return JSON.stringify({ success: res.rowsAffected > 0 }), { status: 200 };
}


async function getNumberComents(postId: string) {
    const numberComents = await client.execute({
        sql : "SELECT COUNT(*) as comentarios FROM coments WHERE post_id = ?;",
        args : [postId]
    })

    return numberComents
}
