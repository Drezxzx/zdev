"use client";
import { IconMessageCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Coments from "../libs/coments";
import { PostsType } from "../types/type";
import Link from "next/link";


export default function ComentsSection({ idPost, post }: { idPost: number, post: PostsType }) {
    const [numberComents, setNumberComents] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Coments.getNumberComents(idPost.toString()).then(data => {
            setNumberComents(data);
            setIsLoading(false);
        })
    }, [])

    return (
        <div className="flex gap-3 flex-col justify-center items-center">
            {!isLoading && <span className="text-slate-400/80">{numberComents} coments</span>}
            <Link href={`/home/detail/${idPost}`}><IconMessageCircle /></Link>
        </div>
    )
}