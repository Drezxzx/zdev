import client from "@/app/conn/conn";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("kjsdkjansdkjasbdadbamsndbasd asdbamnsdbamsndas")
    try {
        const res = await client.execute(`
            SELECT l.name, COUNT(ul.language_id) as numberLenguajes
            FROM users_languages AS ul
            INNER JOIN language as l ON ul.language_id = l.id
            GROUP BY ul.language_id
            ORDER BY numberLenguajes DESC
            LIMIT 3;
        `);

        console.log(res);

        return Response.json({ languajes: res.rows }, { status: 200 });

        
    } catch (error) {
        console.error("Database query failed:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
