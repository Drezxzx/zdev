import { sendNotification } from "@/app/clients";
import client from "@/app/conn/conn";
import { createNotification } from "@/app/api/notifications/controler";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const { username, followedUser } = body;
    console.log({ username, followedUser });
    try { 
        const res = await client.execute({sql :"INSERT into follow_users (user_id, followed_user_id, created_at) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM users WHERE username = ?), CURRENT_TIMESTAMP);", args: [username, followedUser]});

        if (res.rowsAffected > 0) {
            const followedUserNotification = await client.execute({
                sql: `SELECT * from users WHERE username = ?`,
                args: [followedUser]
            });
            
            const followUserNotification = await client.execute({
                sql: `SELECT * from users WHERE username = ?`, 
                args: [username]
            });

            // createNotification(followedUserNotification.rows[0].email as string , 
            //     JSON.stringify({message : `el usuario ${followUserNotification.rows[0].username} te ha seguido`,
            //         id_follower : followUserNotification.rows[0].username,
            //         type : "follow"
            //     }));
            const res = await createNotification({checkIfIsTheSame : true, userEmail: followedUserNotification.rows[0].email as string, idPost : "", message : `${followUserNotification.rows[0].username} te ha seguido`, idType : "2", idProfile : followUserNotification.rows[0].username as string });

            console.log(res);
            
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }

    
}

export async function DELETE(req: Request) {
    const body = await req.json();
    console.log(body);
    const { username, followedUser } = body;
    console.log({ username, followedUser });
    try { 
        const res = await client.execute({sql :"DELETE FROM follow_users WHERE user_id = (SELECT id FROM users WHERE username = ?) AND followed_user_id = (SELECT id FROM users WHERE username = ?);", args: [username, followedUser]});
        console.log(res);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
    
}