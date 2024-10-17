"use client"
import { useEffect } from "react";
import { type PostsType } from "../types/type";
import HeaderDesktop from "../components/Header";
import Posts from "../components/Posts";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostsType[]>([]);

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
  }, []);

  return (
    <>
      <main className="w-screen h-auto  flex flex-col items-center justify-center">
        <Posts setIsLoading={setIsLoading} isProfile={false} posts={posts} isLoading={isLoading} />
      </main>
    </>

  );
}
