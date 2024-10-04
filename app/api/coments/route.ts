import client from "@/app/conn/conn";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const numberComents = url.searchParams.get("numberComents") as string
    const postId = url.searchParams.get("postId") as string

    try {
       if (numberComents.length > 0 && postId) {
           const numberComents = await getNumberComents(postId)
           console.log(numberComents.rows[0])
           return Response.json( numberComents.rows[0], { status: 200 });
       }
    }catch(error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error al obtener comentarios" }), { status: 500 });
    }
}



async function getNumberComents(postId: string) {
    const numberComents = await client.execute({
        sql : "SELECT COUNT(*) as comentarios FROM coments WHERE post_id = ?;",
        args : [postId]
    })

    return numberComents
}