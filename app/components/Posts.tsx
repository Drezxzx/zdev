/* eslint-disable @next/next/no-img-element */
"use client";

import { type PostsType } from "../types/type";
import LikeButton from "./LikeButton";
import CodeExample from "./CodeExampler";
import CreatePost from "./CreatePost";
import ComentsSection from "./ComentsSection";
import Link from "next/link";
import { IconRosetteDiscountCheckFilled, IconTrash } from "@tabler/icons-react";
import PostsSkeleton from "./skeletons/PostSkeletons";
import { languajes } from "../libs/languajes";
import { useEffect, useState } from "react";
import { PostsClass } from "../libs/Posts";
import { toast } from "sonner";
import { useChangeProfile } from "../context/changeProfile";
import FullScreenImage from "./FullScreenImage";




export default function Posts({ username, posts, setPosts, edit, isLoading, isProfile }
    : { username: string | undefined, posts: PostsType[], edit: boolean, isLoading: boolean, isProfile: boolean, setPosts: React.Dispatch<React.SetStateAction<PostsType[]>> }) {
    
    const {setChange} = useChangeProfile()
    const [page, setCurrentPage] = useState(0);
    const [isHiddenImg, setIsHiddenImg] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const elementsPerPage = 5;



    const getImageLanguaje = (languajeId: string) => {
        const languaje = languajes.find(lang => lang.name.toLowerCase() === languajeId.toLowerCase());
        return languaje?.img;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !isLoadingMore && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoadingMore, hasMore]);

    useEffect(() => {

        const fetchPosts = async () => {
            let res: PostsType[] = [];

            setIsLoadingMore(true);

            if (username !== undefined) {
                res = await PostsClass.getPostByUsername(username, elementsPerPage.toString(), page.toString());
            } else {
                res = await PostsClass.getPosts(elementsPerPage.toString(), page.toString());
            }

            if (res.length < elementsPerPage) {
                setHasMore(false);
            }

            setPosts((prevPosts) => [...prevPosts, ...res]);
            setIsLoadingMore(false);
        };

        if (hasMore && page >= 1) {
            fetchPosts();
        }
    }, [page, hasMore]);

    const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const post_id = e.currentTarget.id

        toast('Are you sure you want to delete this post?', {
            style : {
                backgroundColor : "#1B2730",
                color : "#C7D6E6"
            },
            action: {
                label: 'YES',
                onClick: () => {
                    toast.promise(PostsClass.deletePost(post_id), {
                        loading: 'Deleting post...',
                        style : {
                            background: "#1B2730",
                            color: "#C7D6E6",
                        },
                        success: (data) => {
                            setPosts(posts.filter(post => post.id.toString() !== post_id))
                            setChange(true)
                            return `The post has been deleted successfully`;
                        },
                        error: 'There was an error deleting the post',
                    });
                }
            },
        })

    }

    if (isLoading) {
        return <PostsSkeleton isEdit={edit} />;
    }

    return (
        <div className="flex flex-col gap-7 p-2 pb-4 lg:p-0 max-w-[657px] w-full items-center justify-center">
            {!isProfile && <CreatePost />}
            <article className="flex flex-col w-full items-center justify-center">
                {posts.map((post, i) => (
                    <div className="post flex w-full relative py-4 p-1 lg:p-1 rounded-lg bg-[#1B2730] gap-2 lg:gap-6 flex-row mb-5" id={post.id.toString()} key={i}>
                        {edit && <div id={post.id.toString()} onClick={handleDelete} className="p-1 cursor-pointer rounded-lg hover:saturate-50 hover:scale-105 bg-red-600 absolute right-[-0.3rem] top-[-0.2rem] md:top-2 md:right-2 "><IconTrash size={20} /></div>}
                        <Link href={`/home/profile/${post.username}`}>
                            <img className="lg:size-14 size-12 object-cover lg:ml-2 rounded-full" src={post.profile_pic} alt={`imagen de perfil de ${post.profile_pic} `} /></Link>
                        <div className="flex gap-2 lg:gap-3 flex-col w-[80%] justify-center ">
                            <div className="w-full flex justify-between" >
                                <Link className="flex flex-col  justify-start items-start w-fit hover:underline" href={`/home/profile/${post.username}`}>
                                    <h1 className="text-white flex items-center justify-center gap-2 font-semibold text-lg">{post.name} {Boolean(post.is_verified) && <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />} </h1>
                                    <h2 className="text-slate-400/80 text-sm">@{post.username}</h2>
                                </Link>
                                {post.language !== "NONE" && <img className="size-8 object-cover" src={getImageLanguaje(post.language)} alt={`imagen del lenguaje ${post.language} `} />}
                            </div>

                            <h2 className="w-full break-words  ">{post.title}</h2>
                            {post.code && post.code.length > 0 && <CodeExample language={post.language} codeString={post.code} />}
                            <div className=" w-full flex justify-center items-center">
                                {post.image &&<FullScreenImage image={post.image}  />}
                            </div>

                            <div className="flex w-full justify-around gap-4">
                                <LikeButton col={true} idPost={post.id} actualLikes={post.likes} />
                                <ComentsSection idPost={post.id} post={post} />
                            </div>
                        </div>

                    </div>

                ))}
                
                {!hasMore && <p className="font-semibold">There are no more posts to upload.</p>}
            </article>
        </div>
    )
}