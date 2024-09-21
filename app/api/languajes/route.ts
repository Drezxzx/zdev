import client from "@/app/conn/conn";

export async function GET(request: Request) {
    try {
        const response = await client.execute("SELECT * FROM language");

        return Response.json({data :response.rows }, {status : 200});

    } catch (error) {
        console.log(error);
        return Response.json({error : "Server error"}, {status : 500});
    }
    
    
}