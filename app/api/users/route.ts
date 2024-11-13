import client from "@/app/conn/conn";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    let { name, email, profile_pic, username } = body;
    console.log({ name, email, profile_pic, username });
    const query = "INSERT INTO users (name, email, profile_pic, created_at, updated_at, username) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?);";


    try {
        const check = await getUser(email);

        if (check) {
            return Response.json({ error: "User already exists" }, { status: 250 });
        }

        const checkUser = await client.execute({ sql: "SELECT COUNT(*) as count FROM users WHERE username = ? AND email <> ?;", args: [username, email] });
        
        if (checkUser.rows[0].count as number > 0) {
            const emailRandomized = email.split("@")[0] + "@" + email.split("@")[1];
            username  = username  + "_" + emailRandomized;
            username = username.slice(0, 10);
        }
        

        const inser = await client.execute({ sql: query, args: [name, email, profile_pic, username] });
        console.log(inser);
        return Response.json({ success: inser.rowsAffected > 0 ? true : false });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }

}


async function getUser(email: string) {
    const users = await client.execute({ sql: "SELECT users.name, users.email, users.created_at, users.updated_at, users.profile_pic as profile_pic, users.is_verified FROM users WHERE users.email = ?;", args: [email] });
    return users.rows[0] ? true : false;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") as string;
    const followedUser = url.searchParams.get("followedUser") as string;
    console.log(username, followedUser)

    if (followedUser && username) {
        try {
            const user = await checkIfFollower({username, followedUser})
            return Response.json({follower : user});
        } catch (error) {
            console.error(error);
            return Response.json({ error: "Server error" }, { status: 500 });
        }
    }
    
     if (username) {
        try {
            const user = await gestUser(username)
            return Response.json( user);
        } catch (error) {
            console.error(error);
            return Response.json({ error: "Server error" }, { status: 500 });
        }
    }

}

function checkIfFollower({username, followedUser}: {username: string, followedUser: string}): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const isFollower = await client.execute({sql : "SELECT * FROM follow_users WHERE user_id = (SELECT id FROM users WHERE username = ?) AND followed_user_id = (SELECT id FROM users WHERE username = ?);", args: [username, followedUser]});
            console.log(isFollower.rows);
            resolve(isFollower.rows[0] ? true : false)

        } catch (error) {
            console.error(error);
            reject({ error: "Server error" })
        }
    })
}

function gestUser(username: string) {
    return new Promise(async (resolve, reject) => {
        console.log(username + " username")
        try {
            const users = await client.execute({
                sql: `
                SELECT 
                    users.name, 
                    users.email, 
                    users.username,
                    users.created_at, 
                    users.updated_at, 
                    users.is_verified,
                    users.profile_pic AS profile_pic,
                    (SELECT COUNT(user_id) FROM follow_users WHERE user_id = (SELECT id FROM users WHERE username = ?)) AS followed,
                    (SELECT COUNT(followed_user_id) FROM follow_users WHERE followed_user_id = (SELECT id FROM users WHERE username = ?)) AS followers,
                    (SELECT count(*) from posts WHERE author_id = (SELECT id FROM users WHERE username = ?)) AS posts
                FROM 
                    users 
                WHERE 
                    users.username = ?
            `,
                args: [username, username, username, username]
            });

            console.log(users.rows);
            resolve({ data: users.rows[0] })
        } catch (error) {
            console.error(error);
            reject({ error: "Server error" })
        }
    })

}