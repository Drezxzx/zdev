/* eslint-disable @next/next/no-img-element */
"use client";

import { type PostsType } from "../types/type";
import LikeButton from "./LikeButton";
import CodeExample from "./CodeExampler";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ComentsSection from "./ComentsSection";
import Link from "next/link";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import PostsSkeleton from "./skeletons/PostSkeletons";


export default function Posts({ posts, isLoading, isProfile, setIsLoading }: { posts: PostsType[], isLoading: boolean, isProfile: boolean, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) {

    if (isLoading) {
        return <PostsSkeleton />;
    }
    return (
        <div className="flex flex-col gap-7 max-w-screen-md w-full items-center justify-center">
            {!isProfile && <CreatePost />}

            <article className="flex flex-col w-full items-center justify-center">
                {posts.map((post, i) => (
                    <div className="flex w-full py-4 rounded-lg bg-[#1B2730] gap-6 flex-row mb-5" key={i}>
                        <Link href={`/profile/${post.username}`}><img className="size-14 ml-2 rounded-full" src={post.profile_pic} alt={`imagen de perfil de ${post.profile_pic} `} /></Link>
                        <div className="flex gap-3 flex-col w-[80%] justify-center ">
                            <Link className="flex flex-col  justify-start items-start w-fit hover:underline" href={`/profile/${post.username}`}>
                                <h1 className="text-white flex items-center justify-center gap-2 font-semibold text-lg">{post.name} {Boolean(post.is_verified) && <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />} </h1>
                                <h2 className="text-slate-400/80 text-sm">@{post.username}</h2>
                            </Link>
                            <h2>{post.title}</h2>
                            {post.code && post.code.length > 0 && <CodeExample language={post.language} codeString={post.code} />}
                            <div className=" w-full flex justify-center items-center">
                                {post.image && <img className="w-[30rem] rounded-md h-[30rem] object-contain" src={post.image} alt="Imagen de un post" />}
                            </div>

                            <div className="flex w-full justify-around gap-4">
                                <LikeButton col={true} idPost={post.id} actualLikes={post.likes} />
                                <ComentsSection setIsLoading={setIsLoading} idPost={post.id} post={post}  />
                            </div>
                        </div>
                    </div>
                ))}
            </article>
        </div>
    )
}