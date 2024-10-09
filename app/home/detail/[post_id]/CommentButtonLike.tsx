"use client"

import Coments from "@/app/libs/coments";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function CommentButtonLike({ comentId, initialLikes, liked }: { comentId: number, initialLikes: number, liked: boolean }) {

    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(liked)
    const [numberLikes, setNumberLikes] = useState(initialLikes)

    const handleClick = async () => {
        if (isLiked) {
            setNumberLikes(numberLikes - 1);
            setIsLiked(false);
            await Coments.unlikeComent(comentId.toString(), session?.user.username as string);
        } else {
            setNumberLikes(numberLikes + 1);
            setIsLiked(true);
            await Coments.likeComent(comentId.toString(), session?.user.username as string);
        }
    };

    return (
        <div className="justify-center items-center flex flex-col">
            <button onClick={handleClick}>
                {isLiked ? <IconHeartFilled /> : <IconHeart />}
            </button>
            <span className="text-slate-400/80 text-sm">{numberLikes}</span>
        </div>
    )
}