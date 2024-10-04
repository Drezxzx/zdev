import client from "@/app/conn/conn";
import cloudinary from "@/app/conn/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

export async function GET(req : Request) {
    const url = new URL(req.url)
    const username = url.searchParams.get("username") as string
    const isLogged = url.searchParams.get("isLogged") as string
    
    if (username &&username.length > 0) {
        const posts = await client.execute({
            sql :`SELECT posts.created_at,  users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name, users.name as username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id where posts.author_id = (SELECT id FROM users WHERE username = ?) order by posts.created_at desc LIMIT 100;`, 
            args :[username]});
            console.log(posts)
            return Response.json(posts.rows);
    }

    if (isLogged && isLogged === "true") {

    }
    const posts = await client.execute("SELECT posts.created_at,  users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name, users.name as username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id order by posts.created_at desc LIMIT 100;");
    
    return Response.json(posts.rows);
}

export async function POST(req: Request) {
    const body = await req.formData();
    const title = body.get("title") as string;
    const code = body.get("code") as string;
    const author_email = body.get("author_email") as string;
    let id_language = body.get("id_language") as string;
    id_language = id_language === "" ? "1000" : id_language;
    const file = body.get("file");

    console.log({ author_email, id_language, title, code, file });

    let imageUrl: string | null = null;

    // Función para convertir Blob a Buffer
    async function blobToBuffer(blob: Blob): Promise<Buffer> {
        const arrayBuffer = await blob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }

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
            ? [title, code, id_language, imageUrl, author_email]
            : [title, code, id_language, author_email];

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


