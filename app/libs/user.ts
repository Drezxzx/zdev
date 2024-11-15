"use client";
import {  FolloWer, FollowRes, LanguajeType, resInsertLanguage, UpdateUserRes, User, type PostsType } from "../types/type";


export async function getUser(username: string) {
    const response = await fetch(`/api/users?username=${username}`);
    const reqfavoriteLanguages = await fetch(`/api/languajes?username=${username}`);
    const resFavoritesLanguages = await reqfavoriteLanguages.json() as LanguajeType;
    let data = await response.json() as User;
    data.languages = resFavoritesLanguages.data;
    return data;
}
export async function getUserByEmail(email:string) {
    const res = await fetch(`/api/users/email?email=${email}`.trim())
    const resJson = await res.json() as any
    return resJson[0]
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

export async function updateUser ({newUsername, newName, image, email, description}: {description : string | null ,newUsername: string, newName: string, image: string | File, email: string}) {
    const formData = new FormData();
    formData.append("newUsername", newUsername);
    formData.append("newName", newName);
    formData.append("image", image as File);
    formData.append("email", email);
    formData.append("description", description as string);

    try{
        const res = await fetch(`/api/users/update`, {
            method: "POST",
            body: formData
        });
        if(res.status === 200){
            return await res.json() as UpdateUserRes;
        }
        if(res.status === 400){
            return { success: false, error: "Nombre de usuario ya esta en uso" }
        }
        

    }catch(error){
        console.error(error)
        return { success: false, error: "Error al actualizar el usuario" }
    }
    

}

export async function insertLanguaje(email: string, languages_id: number[]) {
    const res = await fetch(`/api/languajes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            language_id: languages_id
        })
    });
    return await res.json() as resInsertLanguage
}