import client from "@/app/conn/conn";

export async function GET() {
    try {
        const res = await client.execute(`
            SELECT l.name, COUNT(ul.language_id) as numberLenguajes
            FROM users_languages AS ul
            INNER JOIN language as l ON ul.language_id = l.id
            GROUP BY ul.language_id ORDER BY numberLenguajes DESC LIMIT 3;
            `)

            return Response.json({ languajes: res.rows }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }

}