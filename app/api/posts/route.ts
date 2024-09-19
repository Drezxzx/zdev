import client from "@/app/conn/conn";


export async function GET(req : Request) {
    const posts = await client.execute("SELECT users.profile_pic as profile_pic, posts.id, posts.code, posts.image, (SELECT COUNT(*) FROM users_likes WHERE users_likes.post_id = posts.id) as likes, posts.title, posts.image, language.name, users.name as username FROM posts INNER JOIN users ON posts.author_id = users.id INNER JOIN language ON posts.id_language = language.id  LIMIT 100;");
    console.log(posts.rows);
    return Response.json(posts.rows);
}

export async function POST(req : Request) {
    const {query} = await req.json();
    const res = await client.execute(query);
    console.log(res);
    return Response.json(query);
}

