"use client";
import { getPostByUsername, getUser, getUserByEmail } from "@/app/libs/user";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Posts from "@/app/components/Posts";
import { useChangeProfile } from "@/app/context/changeProfile"
import { DataLanguage, DataUser, type PostsType } from "@/app/types/type";
import HeaderDesktop from "@/app/components/Header";
import { SectionProfile } from "@/app/components/SectionProfile";
import React from "react";

export default function Profile({ params }: { params: { username: string } }) {
  const [isMe, setIsMe] = useState<boolean | undefined>();
  const { isChange, setChange } = useChangeProfile()
  const [dataUser, setDataUser] = useState<DataUser>();
  const [followers, setFollowers] = useState<number>(0);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState<DataLanguage[]>([]);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return

    getUserByEmail(session.user.email as string).then(res => {
      setUsername(res.username)
    })
  }, [session]);

  useEffect(() => {
    setIsLoading(true);
    getPostByUsername(params.username).then((data) => {
      setIsLoading(false);
      setPosts(data);
    });

    getUser(params.username).then((data) => {
      console.log(data)
      console.log({ username1: username, username2: params.username })
      if (data.data.username === username) {
        setIsMe(true);
      }else{
        setIsMe(false);
      }
      if (isChange) {
        setChange(false)
      }
      setDataUser(data.data);
      setFollowers(data.data.followers);
      setLanguages(data.languages);
      setIsLoading(false);

    });
  }, [ username, isChange]);


  return (
    <>
      <main className="w-screen h-auto  flex flex-col items-center justify-center">
        {dataUser && isMe !== undefined && (
          <SectionProfile
            setFollowers={setFollowers}
            languajes={languages}
            user={dataUser}
            isMe={isMe as boolean}
            followers={followers}
          />
        )}
        
       {isMe && <Posts setPosts={setPosts} edit={isMe} isProfile={true} posts={posts} isLoading={isLoading} />}
      </main>
    </>
  );
}
