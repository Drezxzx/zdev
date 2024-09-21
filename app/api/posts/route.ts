import client from "@/app/conn/conn";
import cloudinary from "@/app/conn/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function GET(req : Request) {
    const posts = await client.execute("SELECT posts.created_at,  users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name, users.name as username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id order by posts.created_at desc LIMIT 100;");
    console.log(posts.rows);
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

    console.log({author_email, id_language, title, code, file});

    let imageUrl: string | null = null;

    // Verificamos si se ha enviado un archivo (imagen)
    if (file && typeof file === "object") {
        try {
            // Utilizamos el método `stream()` para obtener un stream de lectura del archivo
            const fileStream = (file as Blob).stream();
            
            const result = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: "ZDEV_TEST" }, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });

                // Conectamos el stream del archivo al stream de subida de Cloudinary
                fileStream.pipeTo(uploadStream);
            });

            console.log(result);

            if (!result) {
                return new Response(JSON.stringify({ error: "Error subiendo imagen" }), { status: 500 });
            }

            // Si la imagen se subió correctamente, asignamos la URL
            imageUrl = result.secure_url;

        } catch (error) {
            console.error("Error en la subida de la imagen:", error);
            return new Response(JSON.stringify({ error: "Error subiendo la imagen" }), { status: 500 });
        }
    }

    // Ahora hacemos la inserción en la base de datos
    try {
        const insertSql = imageUrl
            ? "INSERT INTO posts (title, code, id_language, image, created_at, updated_at, author_id) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE email = ?));"
            : "INSERT INTO posts (title, code, id_language, created_at, updated_at, author_id) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE email = ?));";

        const args = imageUrl
            ? [title, code, id_language, imageUrl, author_email]
            : [title, code, id_language, author_email];

        const insert = await client.execute({
            sql: insertSql,
            args: args
        });

        console.log(insert);
        return new Response(JSON.stringify({ success: insert.rowsAffected > 0 }), { status: 200 });

    } catch (error) {
        console.error("Error insertando en la base de datos:", error);
        return new Response(JSON.stringify({ error: "Error insertando en la base de datos" }), { status: 500 });
    }
}


