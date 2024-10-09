import { PostDetail } from "../types/type";

export default class Coments {
    static async getNumberComents(post_id: string):Promise<number> {
        const res = await fetch(`/api/coments?postId=${post_id}&numberComents=true`);
        const data = await res.json();
        return data.comentarios;
    }

    static async getDetailComents(post_id: string, username : string):Promise<PostDetail> {
        const res = await fetch(`/api/posts?post_id=${post_id}&username=${username}`);
        const data = await res.json() as PostDetail;
        return data;
    }

    static async createComent(post_id: string, comment: string, username: string):Promise<boolean> {
        const res = await fetch(`/api/coments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id,
                comment,
                username
            })
        })
        
        if (res.status === 200) {
            return true;
        }
        return false;
    }

    static async likeComent(post_id: string, username: string) {
        const res = await fetch(`/api/coments?insertLike=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id,
                username
            })
        });
        if (res.status === 200) {
            return true;
        }
        return false;
       
    }

    static async unlikeComent(post_id: string, username: string) {
        const res = await fetch(`/api/coments`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id,
                username
            })
        });
        if (res.status === 200) {
            return true;
        }
        return false;
    }
}