"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ idPost, actualLikes }: { idPost: number, actualLikes: number }) {
    const [likes, setLikes] = useState(actualLikes);
    const [liked, setLiked] = useState(false);

    const classname = !liked ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" : "bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded";
    
    const handleClick = async () => {
        if (liked) {
            setLiked(false);
            setLikes(actualLikes);
        } else {
            setLiked(true);
            setLikes(actualLikes + 1);
        }
        setTimeout(() => {

        }, 2000)

        
    }
    return (
        <button className={classname} onClick={handleClick}>
            {likes}
        </button>
    )
}

