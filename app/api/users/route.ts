import client from "@/app/conn/conn";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const {name, email, profile_pic, username} = body;
    console.log({name, email, profile_pic, username});
    const query = "INSERT INTO users (name, email, profile_pic, created_at, updated_at, username) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?);";

    try {
        const check = await getUser(email);

        if (check) {
            return Response.json({ error: "User already exists" }, { status: 250 });
        }

        const inser = await client.execute({sql : query, args: [name, email, profile_pic, username]});
        console.log(inser);
        return Response.json({success : inser.rowsAffected > 0 ? true : false});
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
    
}


async function getUser(email: string) {
    const users = await client.execute({sql :"SELECT users.name, users.email, users.created_at, users.updated_at, users.profile_pic as profile_pic FROM users WHERE users.email = ?;", args: [email]});
    console.log(users.rows);
    return users.rows[0] ? true : false;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") as string;
    console.log(username + " username")
    try{
        const users = await client.execute({
            sql: `
                SELECT 
                    users.name, 
                    users.email, 
                    users.username,
                    users.created_at, 
                    users.updated_at, 
                    users.profile_pic AS profile_pic,
                    (SELECT COUNT(user_id) FROM follow_users WHERE user_id = (SELECT id FROM users WHERE username = ?)) AS followed,
                    (SELECT COUNT(followed_user_id) FROM follow_users WHERE followed_user_id = (SELECT id FROM users WHERE username = ?)) AS followers 
                FROM 
                    users 
                WHERE 
                    users.username = ?
            `,
            args: [username, username, username] 
        });
    
        console.log(users.rows);
        return Response.json({data : users.rows[0] });
    } catch (error) {
        console.error(error);
        return Response.json({error : "Server error"}, {status : 500});
    }
    
}