
import {  LanguajeType, User, type PostsType } from "../types/type";

export async function getPostByUsername(username: string) {
    const response = await fetch(`/api/posts?username=${username}`);
    const data = await response.json();
    return data as PostsType[];
}

export async function getUser(username: string) {
    const response = await fetch(`/api/users?username=${username}`);
    const reqfavoriteLanguages = await fetch(`/api/languajes?username=${username}`);
    const resFavoritesLanguages = await reqfavoriteLanguages.json() as LanguajeType;
    let data = await response.json() as User;
    data.languages = resFavoritesLanguages.data;
    return data;
}