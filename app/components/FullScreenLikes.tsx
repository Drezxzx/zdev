import { IconX } from "@tabler/icons-react";
import Portal from "./Portal";
import { useUser } from "../context/changeProfile";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { userComents } from "../types/type";
import Like from "../libs/like";

export default function FullScreenLikes({ isHidden, setIsHidden, usersLiked, setUsersLiked, page , setPage, id_post, email}: { isHidden: boolean, setIsHidden: React.Dispatch<React.SetStateAction<boolean>>, usersLiked : userComents[], setUsersLiked: React.Dispatch<React.SetStateAction<userComents[]>>, page : number, setPage : Dispatch<SetStateAction<number>>, id_post : number, email : string }) {
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const elementsPerPage = 10
    
    useEffect(()=>{
        if(isHidden)return
        const body = document.querySelector("body")

        if(!body) return
        body.style.overflow = "hidden"


        return () => {
        body.style.overflow = "auto"
        }


    },[isHidden])

    useEffect(()=>{
        if(isHidden)return
        if(elementsPerPage <=usersLiked.length)setHasMore(false)
    }, [])

    const loadMoreUsersLikes = async () => {
        if (hasMore && !isLoadingMore) {
            setIsLoadingMore(true);
            const data = await Like.getLikesPerUser(id_post.toString(), email, page );
            setPage((prevPage) => prevPage + 1);
            setIsLoadingMore(false);

            if (data.length < elementsPerPage) {
                setHasMore(false);
            }
            setUsersLiked((prevUserLiked) => [...prevUserLiked, ...data]);

        }
    }

    if (isHidden) return null;

    
    return (
        <Portal>
            <section className="w-svw overflow-x-hidden flex-col  lg:px-5 px-2 gap-4 py-2 h-svh fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                <span className="absolute top-2 cursor-pointer right-2 hover:scale-105 transition-all" onClick={() => { setIsHidden(true)}}><IconX size={25} /></span>
                <h1 className="text-2xl font-bold">Likes</h1>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[28rem] h-[28rem] py-2 px-2 bg-containers-rounded border border-slate-400/60 w-1/4 rounded-md">
                    {
                        usersLiked.map(user => (
                            <Link href={`/home/profile/${user.username}`} key={user.username} className="flex cursor-pointer  hover:underline gap-2 items-center">
                                <img src={user.profile_pic} alt="Imagen de usuario" className="size-10 object-contain rounded-full" />
                                <h2 className="text-slate-400/80 hover:text-slate-200">{user.username}</h2>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </Portal>
    )
}