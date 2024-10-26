import client from "@/app/conn/conn";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const search = url.searchParams.get('search')?.trim();
    console.log(search);
    try {
        const res = await client.execute({
            sql: `SELECT username, name, profile_pic, is_verified as isVerificed  
                FROM users
                WHERE username LIKE ?
                LIMIT 5`,
            args: [`%${search}%`]
        })
    return Response.json(res.rows);

    } catch (error) {
        console.log(error);
        return Response.json({
            error: "Error en la búsqueda"
        }, { status: 400 });
    }
}

