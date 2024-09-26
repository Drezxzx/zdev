
import {  FolloWer, FollowRes, LanguajeType, User, type PostsType } from "../types/type";

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

export async function checkIfFollower({username, followedUser}: {username: string | undefined, followedUser: string}) {
    const res = await fetch(`/api/users?username=${username}&followedUser=${followedUser}`);  
    return await res.json() as FolloWer;
}

export async function followUser({username, followedUser}: {username: string | undefined, followedUser: string}) {
    const res = await fetch(`/api/users/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            followedUser
        })
    });
    return await res.json() as FollowRes;  
}

export async function unFollowUser({username, followedUser}: {username: string | undefined, followedUser: string}) {
    const res = await fetch(`/api/users/follow`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            followedUser
        })
    });
    return await res.json() as FollowRes;  
}