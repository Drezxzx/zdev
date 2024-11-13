"use client";
import { getUser, getUserByEmail } from "@/app/libs/user";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Posts from "@/app/components/Posts";
import { useChangeProfile } from "@/app/context/changeProfile"
import { DataLanguage, DataUser, type PostsType } from "@/app/types/type";
import { SectionProfile } from "@/app/components/SectionProfile";
import React from "react";
import { PostsClass } from "@/app/libs/Posts";
import UserProfileSkeleton from "@/app/components/skeletons/UserProfileSkeleton";
import PostsSkeleton from "@/app/components/skeletons/PostSkeletons";

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
  const page = 0
  const elementsPerPage = 5

  useEffect(() => {
    if (!session) return
    getUserByEmail(session.user.email as string).then(res => {
      setUsername(res.username)
    })
  }, [session]);

  useEffect(() => {
    if (username.length === 0) return
    if (params.username.length === 0) return
    PostsClass.getPostByUsername(params.username, elementsPerPage.toString(), page.toString()).then((data) => {
      setPosts(data);
    });

    getUser(params.username).then((data) => {
      if (data.data === undefined) return
      if (params.username === undefined) return

      if (data.data.username === username) {
        setIsMe(true);
      } else {
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
  }, [username, isChange]);

  if (isLoading) {
    return (
      <main className="w-screen h-auto flex flex-col items-center justify-center">
        <UserProfileSkeleton />
        <PostsSkeleton isEdit={true} />
      </main>
    )
  }

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

        {isMe !== undefined && posts.length > 0 && params.username.length > 0 && <Posts username={params.username} setPosts={setPosts} edit={isMe} isProfile={true} posts={posts} isLoading={isLoading} />}
      </main>
    </>
  );
}
