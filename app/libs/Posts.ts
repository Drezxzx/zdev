export class PostsClass  {

    static  async getPosts(elementsPerPage: string, page: string):Promise<any>{
        const res = await fetch(`/api/posts?elementsPerPage=${elementsPerPage}&page=${page}`)
        return res.json()
    }

    static async createPost(data: FormData):Promise<any>{
        const res = await fetch("/api/posts", {
            method: "POST",
            body: data
        })
        return res.json()
    }

    static async deletePost(idPost: string):Promise<Response>{
        const res = await fetch(`/api/posts?post_id=${idPost}`, {
            method: "DELETE"
        })
        return res
    }
}