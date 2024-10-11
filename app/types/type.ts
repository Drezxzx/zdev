export interface PostsType {
    code: string;
    image: string;
    title: string;
    name: string;
    language: string;
    likes: number;
    username: string;
    id: number;
    profile_pic: string;
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

export interface Comment {
    created_at: Date;
    profile_pic: string;
    id: number;
    comment: string;
    likes: number;
    username: string;
    liked: boolean;
}

