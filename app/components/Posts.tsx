/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { type Posts } from "../types/type";
import LikeButton from "./LikeButton";
import CodeExample from "./CodeExampler";


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
        <div className="flex flex-col   items-center justify-center">
            <article className="flex flex-col items-center justify-center">
                {posts.map((post, i) => (
                    <div className="flex px-10 py-4 rounded-lg bg-[#1B2730] gap-6 flex-row mb-12" key={i}>
                        <img className="size-14 rounded-full" src={post.profile_pic} alt={`imagen de perfil de ${post.profile_pic} `} />

                        <div className="flex gap-3 flex-col items-start">
                          <h2>{post.username}</h2>
                          <h2>{post.title}</h2>
                          <CodeExample language={post.name} codeString={post.code} />
                         {post.image  && <img className="w-[30rem] h-[30rem] object-contain" src={post.image} alt="Imagen de un post" /> } 

                          <LikeButton idPost={post.id} actualLikes={post.likes} />
                        </div> 
                    </div>
                ))}
            </article>
        </div>
    )
}