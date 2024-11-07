import { PostsType } from "../types/type";

export class PostsClass  {

    static  async getPosts(elementsPerPage: string, page: string):Promise<PostsType[]>{
        const res = await fetch(`/api/posts?elementsPerPage=${elementsPerPage}&page=${page}`)
        return res.json()
    }

    static async  getPostByUsername(username: string, elementsPerPage: string, page: string):Promise<PostsType[]>{
        const response = await fetch(`/api/posts?username=${username}&elementsPerPage=${elementsPerPage}&page=${page}`);
        const data = await response.json();
        return data as PostsType[];
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