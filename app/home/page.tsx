"use client"
import { useEffect } from "react";
import { type PostsType } from "../types/type";
import Posts from "../components/Posts";
import { useState } from "react";
import UserPresentation from "../components/UserPresentation";
import React from "react";
import {useChangeProfile} from '@/app/context/changeProfile'
import { PostsClass } from "../libs/Posts";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const {isChange, isChangePost} = useChangeProfile()

  useEffect(() => {
    if (posts.length >= 0) {
      const page = 0
      const elementsPerPage = 5
      const res = PostsClass.getPosts(elementsPerPage.toString(), page.toString())
      setIsLoading(true)
     setPosts([])
      res.then((data) => {
        console.log({data})
          setPosts(data);
          setIsLoading(false)
        })
        .catch(err =>{
          console.error(err);
        });
       
    }
  }, [isChange, isChangePost]);

  return (
    <>
      <main className="w-screen  h-auto p-2 lg:p-0  flex flex-col items-center justify-center">
        <UserPresentation />
        <div className="mt-24 "></div>
        <Posts edit={false} username={undefined} setPosts={setPosts} isProfile={false} posts={posts} isLoading={isLoading} />
      </main>
    </>

  );
}
