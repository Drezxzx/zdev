import cloudinary from "@/app/conn/cloudinary";
import client from "@/app/conn/conn";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

export async function POST(req: Request) {
    const body = await req.formData();
    const img = body.get("image") as File | string;
    const name = body.get("newName") as string;
    const email = body.get("email") as string;
    const username = body.get("newUsername") as string;
   
    const newImg = img instanceof File ? await uploadImg(img as Blob) : img;

    console.log(newImg)

    try {
        const updateSql = `UPDATE users SET name = ?, username = ?, profile_pic = ? WHERE email = ?`;
        const args = [name, username, newImg, email];
        const update = await client.execute({
            sql: updateSql,
            args: args,
        });
        return update.rowsAffected > 0 ?
        Response.json({ success: true }) 
        : Response.json({ error: "Error al actualizar el usuario" });
        
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return new Response(JSON.stringify({ error: "Error al actualizar el usuario" }), { status: 500 });
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