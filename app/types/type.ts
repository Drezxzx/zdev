export interface PostsType {
    code: string;
    image: string;
    is_verified: boolean;
    title: string;
    name: string;
    language: string;
    likes: number;
    username: string;
    id: number;
    profile_pic: string;
}

export interface userComents {
    username : string;
    profile_pic: string;
    is_verified: number;
} 

export interface NotificationsType {
    id:           number;
    user_id:      number;
    notification: string;
    created_at:   string;
    idType:       number;
    idPost:       number;
    idProfile:    string;
    viewed:       number;
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
    description: string;
    email: string;
    created_at: Date;
    is_verified: boolean;
    updated_at: Date;
    profile_pic: string;
    posts : number ;
    followed: number;
    followers: number;
    username: string;
}
export interface LanguajeType {
    data: DataLanguage[];
}

export interface Proyects {
    id: string,
    nameProyect: string,
    gitRepository: string,
    previewLink: string,
    preview: string,
    description: string
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
    mosLikedComents: Comment;
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
    is_verified: boolean;
    id: number;
    comment: string;
    likes: number;
    username: string;
    liked: boolean;
}

