export interface PostsType {
    code: string;
    image: string;
    is_verified : boolean;
    title: string;
    name: string;
    language: string;
    likes: number;
    username: string;
    id: number;
    profile_pic: string;
}

export interface UpdateUserRes {
    success: boolean;
    error: string;
}

export interface FolloWer {
    follower: boolean;
}

export interface Language {
    id: number;
    img: string;
    name: string;
}

export interface resInsertLanguage {
    data: boolean;
}

export interface UserTypes {
    data: DataUser;
}
export interface User {
    data: DataUser;
    languages: DataLanguage[];
}
export interface DataUser {
    name: string;
    email: string;
    created_at: Date;
    is_verified : boolean;
    updated_at: Date;
    profile_pic: string;
    followed: number;
    followers: number;
    username: string;
}
export interface LanguajeType {
    data: DataLanguage[];
}

export interface DataLanguage {
    id: number;
    name: string;
}

export interface FollowRes {
    success: boolean;
}

export interface PostDetail {
    post: PostsType;
    comments: Comment[];
}

export interface ResultSearch {
    username: string;
    name: string;
    profile_pic: string;
    isVerificed: boolean;
}

export interface Comment {
    created_at: Date;
    profile_pic: string;
    is_verified : boolean;
    id: number;
    comment: string;
    likes: number;
    username: string;
    liked: boolean;
}

