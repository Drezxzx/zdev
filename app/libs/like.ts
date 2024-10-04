
export default class Like {
    static async isLiked(post_id: string, email: string):Promise<boolean> {
        const res = await fetch(`/api/likes?post_id=${post_id}&email=${email}`);
        const data = await res.json();
        return data.isLiked;
    }

    static async likePost(post_id: string, email: string):Promise<boolean> {
        const res = await fetch("/api/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id,
                email,
            }),
        })
        const data = await res.json();
        return data.data;
    }

    static async unlikePost(post_id: string, email: string):Promise<boolean> {
        console.log(JSON.stringify({
            post_id,
            email,
        }))
        const res = await fetch("/api/likes", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id,
                email,
            }),
        })
        const data = await res.json();
        return data.data;
    }
}
