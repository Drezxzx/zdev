"use client"

import { useUser } from "@/app/context/changeProfile";
import Coments from "@/app/libs/coments";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useState } from "react"

export default function CommentButtonLike({ comentId, initialLikes, liked }: {  comentId: number, initialLikes: number, liked: boolean }) {
    const [isLiked, setIsLiked] = useState(liked)
    const {usernameContex} = useUser()
    const [numberLikes, setNumberLikes] = useState(initialLikes)

    const handleClick = async () => {
        console.log(comentId)
        if (isLiked) {
            setNumberLikes(numberLikes - 1);
            setIsLiked(false);
            await Coments.unlikeComent(comentId.toString(), usernameContex);
        } else {
            setNumberLikes(numberLikes + 1);
            setIsLiked(true);
            await Coments.likeComent(comentId.toString(), usernameContex);
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