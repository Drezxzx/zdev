"use client";

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { getFollowersFollowed } from "../libs/user";
import { FollowData } from "../types/type";
import Link from "next/link";
import { IconRosetteDiscountCheckFilled, IconX } from "@tabler/icons-react";

export default function FullScreenFollowersFollowed({ username, isHidden, setIsHidden, isInFollowers, setIsInFollowers }: { username: string, isHidden : boolean, setIsHidden: React.Dispatch<React.SetStateAction<boolean>>, isInFollowers: boolean, setIsInFollowers: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreFollowers, setHasMoreFollowers] = useState(false);
    const [hasMoreFollowed, setHasMoreFollowed] = useState(false);
    const [followers, setFollowers] = useState<FollowData["followers"]>([]);
    const [followed, setFollowed] = useState<FollowData["followed"]>([]);
    const elementsPerPage = 1;

    useEffect(() => {
       if(isHidden) return
       const body = document.querySelector("body");
        if (!body) return;
        body.style.overflow = "hidden";

        return () => {
            body.style.overflow = "auto";
        };
    }, [isHidden])

    const fetchFollowersFollowed = async () => {
        setIsLoading(true);

        try {
            const res = await getFollowersFollowed({ username, page });
            if (res) {
                console.log(res, page)
                    setFollowers((prev) => [...prev, ...res.followers]);
                    if (res.followers.length === elementsPerPage) setHasMoreFollowers(true);
                    setFollowed((prev) => [...prev, ...res.followed]);
                    if (res.followed.length === elementsPerPage) setHasMoreFollowed(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
            fetchFollowersFollowed(); 
    }, [page]);

    const handleLoadMore = () => {
        if (hasMoreFollowers || hasMoreFollowed && !isLoading) {setPage((prevPage) => prevPage + 1)}
    };

    const RenderFollowersFollowed = () => {
        const dataToRender = isInFollowers ? followers : followed;
        const hasMore = isInFollowers ? hasMoreFollowers : hasMoreFollowed;
        console.log(hasMore);
        
        return (
            <>
                {dataToRender.length > 0 ? (
                    dataToRender.map((item) => (
                        <Link
                            href={`/home/profile/${item.username}`}
                            key={item.username}
                            className="flex p-1 cursor-pointer hover:underline gap-2 items-center"
                        >
                            <img
                                src={item.profile_pic}
                                alt="Imagen de usuario"
                                className="size-10 object-contain rounded-full"
                            />
                            <h2 className="text-slate-400/80 hover:text-slate-200">
                                {item.username}
                            </h2>
                            {Boolean(item.is_verified) && (
                                <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />
                            )}
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-slate-400">No {!hasMore && !isLoading ? "Followers" : "Followed"} available</p>
                )}
                
                {hasMore && (
                    <button
                        className="w-full text-base text-slate-200/80 disabled:saturate-50"
                        disabled={isLoading}
                        onClick={handleLoadMore}
                    >
                        {isLoading ? "Loading..." : "View more"}
                    </button>
                )}
            </>
        );
    };

    const handleTabChange = (isFollowers: boolean) => {
        setIsInFollowers(isFollowers);
    };

    if (isHidden) return null;

    return (
        <Portal>
            <section className="w-screen overflow-x-hidden flex-col lg:px-5 px-2 gap-4 py-2 h-screen fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                <span className="absolute top-2 cursor-pointer right-4 hover:scale-105 transition-all" onClick={() => setIsHidden(true)}>
                    <IconX size={25} />
                </span>
                <article className="flex flex-col gap-4 overflow-y-auto max-h-[28rem] md:w-[40%] h-[28rem] bg-containers-rounded border border-slate-400/60 lg:w-1/4 w-[70%] rounded-md">
                    <div className="flex w-full justify-center items-center">
                        <h1
                            className={`text-2xl ${
                                isInFollowers ? "bg-slate-400/80" : ""
                            } hover:bg-slate-400/80 duration-300 text-white/90 transition-all py-2 cursor-pointer font-bold border flex justify-center w-1/2 items-center border-slate-400/60`}
                            onClick={() => handleTabChange(true)}
                        >
                            Followers
                        </h1>
                        <h1
                            className={`text-2xl ${
                                !isInFollowers ? "bg-slate-400/80" : ""
                            } hover:bg-slate-400/80 duration-300 text-white/90 transition-all py-2 cursor-pointer font-bold border flex justify-center w-1/2 items-center border-slate-400/60`}
                            onClick={() => handleTabChange(false)}
                        >
                            Followed
                        </h1>
                    </div>
                    <section>
                        <RenderFollowersFollowed />
                    </section>
                </article>
            </section>
        </Portal>
    );
}
