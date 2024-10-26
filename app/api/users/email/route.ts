import client from "@/app/conn/conn";

export async function GET(req:Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") as string;

    try {
        const res = await client.execute({
            sql: `SELECT users.name, users.email, users.created_at, users.updated_at, users.username, users.profile_pic as profile_pic FROM users WHERE users.email = ?;`,
            args: [email]
        })  
        return Response.json(res.rows);
    } catch (error) {
        console.log(error);
        return Response.json({
            error: "Error en la búsqueda"
        }, { status: 400 });
    }
}