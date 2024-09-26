import client from "@/app/conn/conn";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const { username, followedUser } = body;
    console.log({ username, followedUser });
    try { 
        const res = await client.execute({sql : "INSERT into follow_users (user_id, followed_user_id, created_at) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM users WHERE username = ?), CURRENT_TIMESTAMP);", args: [username, followedUser]});
        console.log(res);
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
        const res = await client.execute({sql : "DELETE FROM follow_users WHERE user_id = (SELECT id FROM users WHERE username = ?) AND followed_user_id = (SELECT id FROM users WHERE username = ?);", args: [username, followedUser]});
        console.log(res);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
    
}