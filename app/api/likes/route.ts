import client from "@/app/conn/conn";
import { console } from "inspector/promises";



export async function GET(req : Request) {
    const url = new URL(req.url);
    const post_id = url.searchParams.get("post_id");
    console.log(url);
    try {
        const posts = await client.execute({sql : "SELECT COUNT(*) as likes FROM users_likes WHERE post_id = ?;",
            args:[post_id]
        });
        console.log(posts.rows);
        return Response.json({"likes" : posts.rows[0].likes});
    }catch(e){
        console.log(e);
        return Response.json({"error" : "Error al obtener likes"}, {status : 400});
    }
}

export async function POST(req : Request) {
    const body = await req.json();
    const {post_id, user_id} = body;
     const isLikedd = await isliked(post_id, user_id);
    // console.log(isLiked);
    if(isLikedd) return Response.json({"error" : "Ya ha dado like a este post"}, {status : 400});

    try {
        const like = await client.execute({
            sql : "INSERT INTO users_likes (user_id, post_id) VALUES (?, ?)", 
            args:[user_id,post_id]
        })
    
        console.log(Number( like.rowsAffected.toString()));
        
         return Response.json({"data" : true});
    } catch (error) {
        console.log(error);
        return Response.json({"error" : "Error al insertar like"}, {status : 400});
    }
    

}

export async function DELETE(req : Request) {
    const body = await req.json();
    const {post_id, user_id} = body;
     const isLikedd = await isliked(post_id, user_id);
    // console.log(isLiked);
    if(!isLikedd) return Response.json({"error" : "No ha dado like a este post"}, {status : 400});

    try {
        const like = await client.execute({
            sql : "DELETE FROM users_likes WHERE user_id = ? AND post_id = ?", 
            args:[user_id,post_id]
        })
    
        console.log(Number( like.rowsAffected.toString()));
        
         return Response.json({"data" : true});
    }catch(e){
        console.log(e);
        return Response.json({"error" : "Error al eliminar like"}, {status : 400});
    }

}


const isliked = async(post_id : string, user_id : string) =>{
    try {
        const res = await client.execute({
            sql : "SELECT * FROM users_likes WHERE user_id = ? AND post_id = ?", args:[user_id,post_id]})
            
            if(res.rows.length <= 0) return false;
            
            return true;
    }catch(e){ 
        console.log(e);
        return false;
    }
  
}