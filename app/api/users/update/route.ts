import cloudinary from "@/app/conn/cloudinary";
import client from "@/app/conn/conn";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

export async function POST(req: Request) {
    const body = await req.formData();
    const img = body.get("image") as File | string;
    const name = body.get("newName") as string;
    const email = body.get("email") as string;
    const description = body.get("description") as string | null;
    const username = body.get("newUsername") as string;   
    const newImg = img instanceof File ? await uploadImg(img as Blob) : img;
    
    if(username.length > 0){
        try {
            const isExistinUserName = await client.execute({
                sql: "SELECT COUNT(*) as count FROM users WHERE username = ? AND email <> ?;",
                args: [username, email]
            })
            
            console.log(isExistinUserName.rows[0].count as number > 0)
            
            if (isExistinUserName.rows[0].count as number > 0) {
                return Response.json({ error: `El nombre de usuario ${username} ya esta en uso`, success : false}, { status: 400 });
            }
        } catch (error) {
            console.error(error)
            return Response.json({ error: "Error al comprobar si el usuario existe", success : false}, { status: 500 });
        }
        
    }
    
    console.log({img, name, email, description, username})
    console.log(`UPDATE users SET name = ${name}, username = ${username}, profile_pic = ${newImg}, description = ${description} WHERE email = ${email}`)
    try {
        const updateSql = `UPDATE users SET name = ?, username = ?, profile_pic = ?, description = ? WHERE email = ?`;
        const args = [name, username, newImg, description, email];
        const update = await client.execute({
            sql: updateSql,
            args: args,
        });
        return update.rowsAffected > 0 ?
        Response.json({ success: true }) 
        : Response.json({ error: "Error al actualizar el usuario" }, { status: 500 });
        
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