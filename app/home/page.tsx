"use client"
import { useEffect } from "react";
import { type PostsType } from "../types/type";
import Posts from "../components/Posts";
import { useState } from "react";
import React from "react";
import {useChangeProfile} from '@/app/context/changeProfile'
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const {isChange} = useChangeProfile()

  useEffect(() => {
    if (posts.length >= 0) {
      setIsLoading(true);
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setIsLoading(false)
        })
        .catch(err =>{
          console.error(err);
        });
    }
  }, [isChange]);

  return (
    <>
      <main className="w-screen  h-auto p-2 lg:p-0  flex flex-col items-center justify-center">
        <div className="mt-24 "></div>
        <Posts isProfile={false} posts={posts} isLoading={isLoading} />
      </main>
    </>

  );
}
