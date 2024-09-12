/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { type Posts } from "../types/type";
import LikeButton from "./LikeButton";


export default function Posts() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <h2>{post.username}</h2>
                        <h2>{post.title}</h2>
                        <p>{post.code}</p>
                        <img src={post.image} alt="Imagen de un post" />
                        <LikeButton idPost={post.id} actualLikes={post.likes} />
                    </li>
                ))}
            </ul>
        </div>
    )
}