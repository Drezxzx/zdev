"use client";

import CodeExample from "@/app/components/CodeExampler";
import ComentsSection from "@/app/components/ComentsSection";
import LikeButton from "@/app/components/LikeButton";
import Coments from "@/app/libs/coments";
import { PostsType, Comment } from "@/app/types/type";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SectionComents from "./Coments";
import { useSession } from "next-auth/react";

export default function DetailPost({ params }: { params: { post_id: string } }) {
    const [post, setPost] = useState<PostsType>()
    const [comments, setComments] = useState<Comment[]>([])
    const {data : session} = useSession()

    useEffect(() => {
        
        if(session?.user?.username && session.user.username.length > 0){
        Coments.getDetailComents(params.post_id, session.user.username)
            .then(data => {
                setPost(data.post)
                setComments(data.comments)
                console.log(data.comments)
            }).catch(e =>{
                console.error(e)
            })
        }
    }, [session])

    const router = useRouter()
    const handleBack = () => {
        router.push("/home")
    }

    const post_id = params.post_id
    return (
        <main className="w-screen h-auto  flex flex-col items-center justify-center">
            <div className="w-full flex items-start">
                <button onClick={handleBack}>
                    <IconArrowBack />
                </button>
            </div>
            {post?.id &&
                <div className="flex flex-col gap-7 max-w-screen-md w-full items-center justify-center">
                    <article className="flex flex-col w-full items-center justify-center">
                        <div className="flex w-full  py-4 rounded-lg bg-[#1B2730] gap-6 flex-row mb-12">
                            <img className="size-14 ml-2 object-contain rounded-full" src={post?.profile_pic} alt={`imagen de perfil de ${post?.profile_pic} `} />
                            <div className="flex gap-3 flex-col w-[80%] justify-center ">
                                <div className=" gap-3 flex justify-between items-center">
                                    <div className="flex gap-3 flex-col">
                                        <h2>{post?.username}</h2>
                                        <h2>{post?.title}</h2>
                                    </div>

                                    <LikeButton col={false} idPost={post?.id} actualLikes={post?.likes} />
                                </div>

                                {post?.code && post?.code.length > 0 && <CodeExample language={post?.name} codeString={post?.code} />}
                                <div className=" w-full flex justify-center items-center">
                                    {post?.image && <img className="w-[30rem] rounded-md h-[30rem] object-contain" src={post?.image} alt="Imagen de un post" />}
                                </div>
                                <div className="flex w-full justify-around gap-4">
                                </div>

                                <SectionComents setComments={setComments} post_id={post?.id} post_likes={post?.likes} comments={comments} />
                            </div>
                        </div>
                    </article>
                </div>}
        </main>
    )
}