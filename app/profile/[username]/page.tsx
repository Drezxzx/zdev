"use client";
import { getPostByUsername, getUser } from "@/app/libs/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Posts from "@/app/components/Posts";
import { DataLanguage, DataUser, type PostsType } from "@/app/types/type";
import HeaderDesktop from "@/app/components/Header";
import { SectionProfile } from "@/app/components/SectionProfile";

export default function Profile({ params }: { params: { username: string } }) {
    const [isMe, setIsMe] = useState(false);
    const [dataUser, setDataUser ] = useState<DataUser>();
    const [isLoading, setIsLoading] = useState(true);
    const [languages, setLanguages] = useState<DataLanguage[]>([]);
    const [posts, setPosts] = useState<PostsType[]>([]);
    const { data: session } = useSession();
    console.log(session);

    useEffect(()=>{
        setIsLoading(true);
        getPostByUsername(params.username)
            .then((data) => {
                setIsLoading(false);
                setPosts(data);
            })

        getUser(params.username)
            .then((data) => {
                setDataUser(data.data);
                setLanguages(data.languages);
            })

        if (session && session.user.username === params.username) {
            setIsMe(true);
            return;
        }
    }, [session])
    console.log(dataUser)

    
    return (
        <>
            <HeaderDesktop/>
            <main className="w-screen h-auto  flex flex-col items-center justify-center">
               {dataUser && <SectionProfile languajes={languages} user={dataUser} isMe={isMe} />}
                <Posts isProfile={true} posts={posts} isLoading={isLoading} />
            </main>
        </>
        
    )
}