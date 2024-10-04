"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Like from "../libs/like";

export default function LikeButton({ idPost, actualLikes }: { idPost: number, actualLikes: number }) {
    const [likes, setLikes] = useState(actualLikes);
    const [isLiked, setIsLiked] = useState(false);
    const { data: session } = useSession();

    // Este efecto se ejecuta cuando la sesión cambia
    useEffect(() => {
        if (session?.user) {
            Like.isLiked(idPost.toString(), session?.user.email as string)
                .then((res) => {
                    setIsLiked(res);
                });
        }
    }, [session, idPost]);

    // Componente del botón basado en el estado isLiked
    const Button = () => {
        return isLiked ? <IconHeartFilled /> : <IconHeart />;
    };

    // Manejo del clic del botón
    const handleClick = async () => {
        // Cambiar estado de likes optimistamente
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
            // Aquí puedes realizar la llamada a la API para "desmarcar" el like
            await Like.unlikePost(idPost.toString(), session?.user.email as string);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
            // Aquí puedes realizar la llamada a la API para "marcar" el like
            await Like.likePost(idPost.toString(), session?.user.email as string);
        }
    };

    return (
        <div className="flex gap-3 flex-col justify-center items-center">
            <h2 className="text-slate-400/80">{likes} likes</h2>
            <button onClick={handleClick}>
                <Button />
            </button>
        </div>
    );
}
