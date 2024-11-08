"use client";

import CodeExample from "@/app/components/CodeExampler";
import LikeButton from "@/app/components/LikeButton";
import Coments from "@/app/libs/coments";
import { PostsType, Comment } from "@/app/types/type";
import {  IconArrowLeft, IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import SectionComents from "./Coments";
import { useUser } from "@/app/context/changeProfile";
import DetailPostSkeleton from "@/app/components/skeletons/DetailPostSkeleton";

export default function DetailPost({ params }: { params: { post_id: string } }) {
    const [post, setPost] = useState<PostsType>()
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {usernameContex} = useUser()
    const elelementsPerPage = "10"
    const page = "0"

    useEffect(() => {
        if(usernameContex.length === 0) return
        console.log(usernameContex)
        if (usernameContex && usernameContex.length > 0) {
            Coments.getDetailComents(params.post_id, usernameContex, elelementsPerPage, page)
                .then(data => {
                    setPost(data.post)
                    setComments(data.comments)
                    console.log({data})
                    setIsLoading(false)
                }).catch(e => {
                    console.error(e)
                })
        }
    }, [usernameContex])

    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    if (isLoading) {
        return (
            <DetailPostSkeleton />
        )
    }

    return (
        <main className="w-screen h-auto p-2 lg:p-0  flex flex-col items-center justify-center">
            <div className="w-fit left-2 z-[1000] hover:scale-105 transition-all flex fixed top-[5.8rem] lg:top-[1.6rem] lg:left-8 items-start">
                <button  onClick={handleBack}>
                    <IconArrowLeft size={30} />
                </button>
            </div>
            {post?.id &&
                <div className="flex mt-24  flex-col gap-7 max-w-[657px] w-full items-center justify-center">
                    <article className="flex flex-col w-full items-center justify-center">
                        <div className="flex w-full py-4 p-1  rounded-lg bg-[#1B2730] gap-2 lg:gap-6 flex-row mb-5">
                            <img className="lg:size-14 size-12 object-cover lg:ml-2 rounded-full" src={post?.profile_pic} alt={`imagen de perfil de ${post?.profile_pic} `} />
                            <div className="flex gap-2 lg:gap-3 flex-col w-[80%] justify-center  ">
                                <div className=" gap-3 flex justify-between items-center">
                                    <div className="flex gap-1 justify-start items-center">
                                        <h1 className="text-white font-semibold text-base lg:text-lg flex items-center justify-center gap-1">{post.name} {Boolean(post.is_verified ) && <IconRosetteDiscountCheckFilled  size={20} color="#1DA1F3" />}</h1>
                                        <h2 className="text-slate-400/80 text-sm">@{post.username} </h2>
                                    </div>
                                    <LikeButton col={false} idPost={post?.id} actualLikes={post?.likes} />
                                </div>
                                <span>{post.title}</span>
                                {post?.code && post?.code.length > 0 && <CodeExample language={post?.language} codeString={post?.code} />}
                                <div className=" w-full flex justify-center items-center">
                                    {post?.image && <img className="w-[30rem] rounded-md h-[30rem] object-contain" src={post?.image} alt="Imagen de un post" />}
                                </div>
                                <div className="flex w-full justify-around gap-4">
                                </div>

                                <SectionComents  setComments={setComments} post_id={post?.id} post_likes={post?.likes} comments={comments} />
                            </div>
                        </div>
                    </article>
                </div>}
        </main>
    )
}