import { sendNotification } from "@/app/clients";
import client from "@/app/conn/conn";
import {createNotification} from '@/app/api/notifications/controler'

export async function GET(req: Request) {
    const url = new URL(req.url);
    const post_id = url.searchParams.get("post_id");
    const userLiked = url.searchParams.get("userLiked");
    const page = url.searchParams.get("page")
    const pageNumber = Number(page)
    const email = url.searchParams.get("email");

    if (userLiked && userLiked.length > 0) {
        const res = await client.execute({
            sql : `SELECT u.username, u.profile_pic, u.is_verified
                    FROM users AS u
                    WHERE u.id IN (
                        SELECT ul.user_id
                        FROM users_likes AS ul
                        WHERE ul.post_id = ?
                        LIMIT 10 OFFSET ?
                    )
                    ORDER BY u.is_verified DESC;
            ` ,
            args : [post_id, pageNumber*10]
        })

        return Response.json(res.rows, { status: 200 });
    }


    try {
        const posts = await client.execute({ sql: "SELECT COUNT(*) as likes FROM users_likes WHERE post_id = ? and user_id = (SELECT id FROM users WHERE email = ?)", args: [post_id, email] });
        const likes = posts.rows[0].likes as number;

        if (likes <= 0) return Response.json({ "isLiked": false }, { status: 200 });

        return Response.json({ "isLiked": true }, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ "error": "Error al obtener likes" }, { status: 400 });
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { post_id, email } = body;
    const isLikedd = await isliked(post_id, email);
    // console.log(isLiked);
    if (isLikedd) return Response.json({ "error": "Ya ha dado like a este post" }, { status: 400 });

    try {
        const like = await client.execute({
            sql: "INSERT INTO users_likes (user_id, post_id) VALUES ((SELECT id FROM users WHERE email = ?), ?)",
            args: [email, post_id]
        })

        if (like.rowsAffected > 0) {
            console.log(Number(like.rowsAffected.toString()));
            const datauser1 = await client.execute({
                sql: `SELECT * from users
                      INNER JOIN posts ON posts.author_id = users.id
                      WHERE posts.id = ?`, 
                args: [post_id]
            });
            
            const datauser2 = await client.execute({
                sql: `SELECT * from users WHERE email = ?`, 
                args: [email]
            });
            
            
            const userNotificed = datauser1.rows[0];
            const userCreatorNotification = datauser2.rows[0];

            console.log(userNotificed.email, email);
            if (userNotificed.email !== email) {
              const res =  await createNotification({checkIfIsTheSame : true, userEmail : userNotificed.email as string, message : `${userCreatorNotification.username} has liked your post`, idPost : post_id as string, idType : "1", idProfile : ""});

              console.log(res);
            }
        }


        console.log(Number(like.rowsAffected.toString()));

        return Response.json({ "data": true });
    } catch (error) {
        console.log(error);
        return Response.json({ "error": "Error al insertar like" }, { status: 400 });
    }


}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { post_id, email } = body;

        console.log('Request received:', { post_id, email }); // Verificar valores recibidos

        const like = await client.execute({
            sql: "DELETE FROM users_likes WHERE user_id = (SELECT id FROM users WHERE email = ?) AND post_id = ?",
            args: [email, Number(post_id)]
        });

        console.log(`Rows affected: ${Number(like.rowsAffected)}`); // Verificar filas afectadas

        if (Number(like.rowsAffected) === 0) {
            console.log('No likes were deleted.'); // Log si no se afectaron filas
            return Response.json({ "error": "No se eliminó ningún like" }, { status: 404 });
        }

        return Response.json({ "data": true });
    } catch (e) {
        console.error('Error:', e); // Usar console.error para errores
        return Response.json({ "error": "Error al eliminar like" }, { status: 500 }); // Cambiar estado a 500 para errores del servidor
    }
}



const isliked = async (post_id: string, user_id: string) => {
    try {
        const res = await client.execute({
            sql: "SELECT * FROM users_likes WHERE user_id = ? AND post_id = ?", args: [user_id, post_id]
        })

        if (res.rows.length <= 0) return false;

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}