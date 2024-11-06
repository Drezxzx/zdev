import client from "@/app/conn/conn";
import cloudinary from "@/app/conn/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import auth from "@/app/libs/auth";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const username = url.searchParams.get("username") as string
    console.log(username)
    const post_id = url.searchParams.get("post_id") as string
    const autorired = await auth()
    console.log(post_id)

    // if(!autorired){
    //     return new Response(JSON.stringify({error:"No autorizado"}), {status:401})
    // }

    if (post_id && post_id.length > 0) {
        const post = await client.execute({
            sql: `SELECT posts.created_at,users.is_verified, users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name as language, users.name, users.username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id where posts.id = ?;`,
            args: [post_id]
        });

        const comments = await client.execute({
            sql: `SELECT coments.created_at, users.is_verified,
            (SELECT COUNT(comment_id) FROM comments_like_users WHERE comments_like_users.comment_id  = coments.id ) as likes,
            users.name as username, users.profile_pic as profile_pic, coments.id, coments.comment, users.username FROM coments INNER JOIN users ON coments.user_id = users.id where coments.post_id = ? ORDER BY likes desc LIMIT 50;`,
            args: [ post_id]
        });
       
        const response = await Promise.all(
            comments.rows.map(async (com) => {
              const liked = await isLiked(username, com.id as string);
              return { ...com, liked };
            })
          );
          console.log(post.rows[0])
            return Response.json({ post: post.rows[0], comments: response });
        
        
    }

    if (username && username.length > 0) {
        const post = await client.execute({sql:`SELECT posts.created_at, users.is_verified,  users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name as language, users.name, users.username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id where posts.author_id = (SELECT id FROM users WHERE username = ?) order by posts.created_at desc LIMIT 100;`, args: [username]});
        return Response.json(post.rows);
    }

    const posts = await client.execute("SELECT posts.created_at, users.is_verified,  users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name as language, users.name,  users.username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id order by posts.created_at desc LIMIT 100;");

    return Response.json(posts.rows);
}

export async function POST(req: Request) {
    const body = await req.formData();
    const title = body.get("title") as string;
    const code = body.get("code") as string;
    const author_email = body.get("author_email") as string;
    console.log(author_email)
    let id_language = body.get("id_language") as string;
    id_language = id_language === "" ? "1000" : id_language;
    const file = body.get("file");

    console.log({ author_email, id_language, title, code, file });

    let imageUrl: string | null = null;

    async function blobToBuffer(blob: Blob): Promise<Buffer> {
        const arrayBuffer = await blob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }

    const checkEmail = await client.execute({
        sql: `SELECT COUNT(*) as count FROM users WHERE email = ?;`,
        args: [author_email]
    })
    console.log(checkEmail)
    


    // Si se ha enviado un archivo, intentamos subirlo a Cloudinary
    if (file && typeof file === "object") {
        try {
            const fileBuffer = await blobToBuffer(file as Blob);
            const readableStream = Readable.from(fileBuffer);

            const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "ZDEV_TEST" },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
                readableStream.pipe(uploadStream);
            });

            if (!result) {
                return new Response(JSON.stringify({ error: "Error subiendo imagen" }), { status: 500 });
            }

            imageUrl = result.secure_url;
        } catch (error) {
            console.error("Error subiendo la imagen:", error);
            return new Response(JSON.stringify({ error: "Error subiendo la imagen" }), { status: 500 });
        }
    }

    

    // Inserción en la base de datos
    try {
        const insertSql = imageUrl
            ? "INSERT INTO posts (title, code, id_language, image, created_at, updated_at, author_id) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE email = ?));"
            : "INSERT INTO posts (title, code, id_language, created_at, updated_at, author_id) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE email = ?));";

        const args = imageUrl
            ? [title !== undefined ? title : "", code !== null ? "" : "", Number(id_language), imageUrl, author_email]
            
            : [title !== undefined ? title : "", code !== null ? "" : "", Number(id_language), author_email];

            console.log(args)

        const insert = await client.execute({
            sql: insertSql,
            args: args,
        });

        console.log(insert);
        return new Response(JSON.stringify({ success: insert.rowsAffected > 0 }), { status: 200 });
    } catch (error) {
        console.error("Error insertando en la base de datos:", error);
        return new Response(JSON.stringify({ error: "Error insertando en la base de datos" }), { status: 500 });
    }
}

async function isLiked( username: string, comment_id: string) {
    const res = await client.execute({
        sql: `SELECT COUNT(*) as liked 
        FROM comments_like_users 
        WHERE user_id = (SELECT id FROM users WHERE username = ?) 
        AND comment_id = ?`,
        args: [username, comment_id]
    })
    const count = res.rows[0]?.liked as number

    return count > 0
}


