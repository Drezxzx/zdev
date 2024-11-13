"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Like from "../libs/like";
import { userComents } from "../types/type";
import FullScreenCode from "./FullScreenCode";
import FullScreenLikes from "./FullScreenLikes";
import { useUser } from "../context/changeProfile";

export default function LikeButton({ idPost, actualLikes, col }: { idPost: number, actualLikes: number, col: undefined | boolean }) {
    const [likes, setLikes] = useState(actualLikes);
    const [page, setPage] = useState<number>(0)
    const [isHidden, setIsHidden] = useState(true);
    const {image, usernameContex, email, is_verified} = useUser();
    const [usersLiked, setUsersLiked] = useState<userComents[]>([]);
    const [isLiked, setIsLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            Like.isLiked(idPost.toString(), session?.user.email as string)
                .then((res) => {
                    setIsLiked(res);
                });

            Like.getLikesPerUser(idPost.toString(), session?.user.email as string, page)
                .then((res) => {
                    setUsersLiked(res);
                });
        }
    }, [session, idPost]);



    const Button = () => {
        return isLiked ? <IconHeartFilled /> : <IconHeart />;
    };

    const handleClick = async () => {
        const newUserLike = {username : usernameContex, profile_pic : image, is_verified}
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
            setUsersLiked(usersLiked.filter(user => user.username !== usernameContex));
            await Like.unlikePost(idPost.toString(), session?.user.email as string);
        } else {
            setLikes(likes + 1);
            setUsersLiked([ newUserLike, ...usersLiked]);
            setIsLiked(true);
            await Like.likePost(idPost.toString(), session?.user.email as string);
        }
    };

    if (col) {
        return (
            <div className="flex gap-3 flex-col justify-center items-center">
                <FullScreenLikes isHidden={isHidden} page={page} id_post={idPost} email={email} setPage={setPage} setIsHidden={setIsHidden} usersLiked={usersLiked} setUsersLiked={setUsersLiked} />
                <div onClick={()=>setIsHidden(false)} className="flex gap-1 hover:underline cursor-pointer">
                    <h2 className="text-slate-400/80">{likes} likes</h2>
                    {usersLiked.length > 0 && <div className="flex gap-[0]">{
                        usersLiked.map((user, i) => {
                            if (i >= 3) return null
                            return (
                                <img key={i} src={user.profile_pic} alt="Imagen de usuario" className="size-5 object-contain rounded-full" />
                            )
                        })
                    }</div>}
                </div>

                <button onClick={handleClick}>
                    <Button />
                </button>

            </div>
        );
    }

    return (
        <div className="flex gap-3 justify-center items-center">
            <FullScreenLikes isHidden={isHidden} page={page} id_post={idPost} email={email} setPage={setPage} setIsHidden={setIsHidden} usersLiked={usersLiked} setUsersLiked={setUsersLiked} />
            <div onClick={()=>setIsHidden(false)} className="flex gap-1 hover:underline cursor-pointer">
                    <h2 className="text-slate-400/80">{likes} likes</h2>
                    {usersLiked.length > 0 && <div className="flex gap-[0]">{
                        usersLiked.map((user, i) => {
                            if (i >= 3) return null
                            return (
                                <img key={i} src={user.profile_pic} alt="Imagen de usuario" className="size-5 object-contain rounded-full" />
                            )
                        })
                    }</div>}
                </div>
            <button onClick={handleClick}>
                <Button />
            </button>
        </div>
    );
}
