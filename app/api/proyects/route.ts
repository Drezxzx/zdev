import cloudinary from "@/app/conn/cloudinary"
import client from "@/app/conn/conn"
import { UploadApiResponse } from "cloudinary"
import { Readable } from "stream"

export async function GET(req : Request) {
    const url = new URL(req.url).searchParams
    const email = url.get("email")?.trim()
    const username = url.get("username")?.trim()
     console.log(email, username)

    if (username && username.length > 0) {
        try {
            const res = await client.execute({
                sql :`SELECT id, nameProyect,gitRepository, previewLink, preview, description  FROM proyects
                      WHERE idUser = (SELECT id FROM users WHERE username = ?)
                      order by createAt DESC;`,
                args : [username]
            })

            return Response.json(res.rows)
            
        } catch (error) {
            console.log(error)
            return Response.json({ error: "Ha habido un error" }, {status: 500})
        }
    }

    if (email && email.length > 0) {
        try {
            const res = await client.execute({
                sql :`SELECT id, nameProyect,gitRepository, previewLink, preview, description  FROM proyects
                      WHERE idUser = (SELECT id FROM users WHERE email = ?)
                      order by createAt DESC;`,
                args : [email]
            })

            return Response.json(res.rows)
            
        } catch (error) {
            console.log(error)
            return Response.json({ error: "Ha habido un error" }, {status: 500})
        }
    }
}

export async function POST(req : Request) {
    const body = await req.formData();
    const nameProyect = body.get("nameProyect") as string;
    const email = body.get("email") as string;
    const description = body.get("description") as string;
    const gitRepository = body.get("gitRepository") as string;
    const previewLink = body.get("previewLink") as string;
    const preview = body.get("preview") as Blob;

    const imgUrl = await uploadImg(preview);

    if(imgUrl.length > 0) {
        try {
            const res = await client.execute(
                {
                    sql : `INSERT INTO proyects (idUser, nameProyect, gitRepository, previewLink, preview, description, createAt)
                           VALUES((SELECT id FROM users WHERE email = ?), ?, ?, ?, ?, ?, CURRENT_TIME);`,
                    args : [email, nameProyect, gitRepository, previewLink, imgUrl, description]    
                }
            )
            if(res.rowsAffected <= 0) {
                return Response.json({ success: false, error: "Error al subir la imagen"}, {status: 400})
            }
            return Response.json({ success: true}, {status: 200})
        } catch (error) {
            console.log(error)
            return Response.json({ success: false, error: "Error al subir la imagen"}, {status: 400})
        }
    }


}

export async function DELETE(req:Request) {
    const url = new URL(req.url).searchParams
    const idProyect = url.get("idProyect")

    try {   
        const res = await client.execute(
            {
                sql : `DELETE FROM proyects WHERE id = ?;`,
                args : [idProyect]
            }
        )

        if(res.rowsAffected <= 0) {
            return Response.json({ success: false, error: "Error al eliminar el proyecto"}, {status: 400})
        }

        return Response.json({success : true}, {status : 200})
        
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, error: "Error al eliminar el proyecto"}, {status: 400})
    }
}

async function uploadImg(file : Blob): Promise<string> {
    const fileBuffer = await file.arrayBuffer();
    const bufferImg = Buffer.from(fileBuffer);
    const readableStream = Readable.from(bufferImg);

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

    return result?.secure_url as string;
}
