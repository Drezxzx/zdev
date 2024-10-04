/* eslint-disable @next/next/no-img-element */
"use client";

import { type PostsType } from "../types/type";
import LikeButton from "./LikeButton";
import CodeExample from "./CodeExampler";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ComentsSection from "./ComentsSection";


export default function Posts({ posts, isLoading, isProfile }: { posts: PostsType[], isLoading: boolean, isProfile: boolean }) {


    if (isLoading) {
        return <div className="flex flex-col gap-5 w-screen h-screen inset-0 absolute items-center justify-center bg-gray-900">
            <img src="/logo.jpeg" alt="Logo de la aplicación" className="size-56 rounded-full" />
            <h1>Loading...</h1>
            { }
        </div>
    }

    return (
        <div className="flex flex-col gap-7 max-w-screen-md w-full items-center justify-center">
            {!isProfile && <CreatePost />}

            <article className="flex flex-col w-full items-center justify-center">
                {posts.map((post, i) => (
                    <div className="flex w-full  py-4 rounded-lg bg-[#1B2730] gap-6 flex-row mb-12" key={i}>
                        <img className="size-14 ml-2 rounded-full" src={post.profile_pic} alt={`imagen de perfil de ${post.profile_pic} `} />

                        <div className="flex gap-3 flex-col w-[80%] justify-center ">
                            <h2>{post.username}</h2>
                            <h2>{post.title}</h2>
                            {post.code && post.code.length > 0 && <CodeExample language={post.name} codeString={post.code} />}
                            <div className=" w-full flex justify-center items-center">
                            {post.image && <img className="w-[30rem] rounded-md h-[30rem] object-contain" src={post.image} alt="Imagen de un post" />}
                            </div>

                            <div className="flex w-full justify-around gap-4">
                                <LikeButton idPost={post.id} actualLikes={post.likes} />
                                <ComentsSection idPost={post.id} post={post} />
                            </div>
                        </div>
                    </div>
                ))}
            </article>
        </div>
    )
}