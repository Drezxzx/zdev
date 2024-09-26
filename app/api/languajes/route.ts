import client from "@/app/conn/conn";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username") as string;
    try {
        const response = await client.execute({sql : `SELECT  language.name, language.id from users
        INNER JOIN users_languages ON users.id = users_languages.user_id
        INNER JOIN language ON users_languages.language_id = language.id
        WHERE users.username = ? limit 6  ;`, args: [username]});

        

        return Response.json({data :response.rows }, {status : 200});

    } catch (error) {
        console.log(error);
        return Response.json({error : "Server error"}, {status : 500});
    }
    
    
}

export async function POST(request: Request) {
    let languajesArr : number[] = []
    let isInserted : boolean = false
    try {
        const body = await request.json();
        const {email, language_id } = body;
        languajesArr = language_id

        for (let lang of languajesArr) {
            console.log(lang)
            if (await userHasLanguage(email, lang)) {
                console.log("ya existe")
            }else{
                const response = await client.execute({sql : "INSERT INTO users_languages (user_id, language_id) VALUES ((SELECT id FROM users WHERE email = ?), ?);", args: [email, lang]});
               
                if (response.rowsAffected > 0) {
                isInserted = true
               }
            }
        }

        return Response.json({data : isInserted ? true : false}, {status : 200});
    } catch (error) {
        console.log(error);
        return Response.json({error : "Server error"}, {status : 500});
    }
}

async function userHasLanguage(email: any, language_id: any) {
    const response = await client.execute({sql : "SELECT * FROM users_languages WHERE user_id = (SELECT id FROM users WHERE email = ?) AND language_id = ?;", args: [email, language_id]});
    return response.rows[0] ? true : false;
}