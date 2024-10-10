"use client";
import { getPostByUsername, getUser } from "@/app/libs/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Posts from "@/app/components/Posts";
import { DataLanguage, DataUser, type PostsType } from "@/app/types/type";
import HeaderDesktop from "@/app/components/Header";
import { SectionProfile } from "@/app/components/SectionProfile";
import React from "react";

export default function Profile({ params }: { params: { username: string } }) {
  const [isMe, setIsMe] = useState(false);
  const [dataUser, setDataUser] = useState<DataUser>();
  const [followers, setFollowers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState<DataLanguage[]>([]);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    getPostByUsername(params.username).then((data) => {
      setIsLoading(false);
      setPosts(data);
    });

    getUser(params.username).then((data) => {
      if (data.data.username === params.username) {
        setIsMe(true);
      }
      setDataUser(data.data);
      setFollowers(data.data.followers);
      setLanguages(data.languages);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <HeaderDesktop />
      <main className="w-screen h-auto  flex flex-col items-center justify-center">
        {dataUser && (
          <SectionProfile
            setFollowers={setFollowers}
            languajes={languages}
            user={dataUser}
            isMe={isMe}
            followers={followers}
          />
        )}
        <Posts isProfile={true} posts={posts} isLoading={isLoading} />
      </main>
    </>
  );
}