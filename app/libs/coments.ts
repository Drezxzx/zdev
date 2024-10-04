export default class Coments {
    static async getNumberComents(post_id: string):Promise<number> {
        const res = await fetch(`/api/coments?postId=${post_id}&numberComents=true`);
        const data = await res.json();
        return data.comentarios;
    }
}