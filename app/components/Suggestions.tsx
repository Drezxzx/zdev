"use client"

import { use, useEffect, useState } from "react"
import { type SuggestionTyoe, Suggestions } from "@/app/libs/suggestions"
import { useSession } from "next-auth/react"
import { getUserByEmail } from "../libs/user"
import Link from "next/link"
import SuggestionsSectionSkeleton from "./skeletons/SuggestionsSectionSkeleton"

export default function SuggestionsSection() {
    const [suggestions, setSuggestions] = useState<SuggestionTyoe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState<string>("")
    const { data: session } = useSession()

    
    
    useEffect(() => {
        getUserByEmail(session?.user.email as string).then(res => {
            if (!res) return
            setEmail(res.email)
        })
    }
        , [session])

    useEffect(() => {
        if (email.length === 0) return

        Suggestions.getSuggestions({ email: email }).then(res => {
            setSuggestions(res)
            setIsLoading(false)
        })
    }, [email])

    if (isLoading) {
        return <SuggestionsSectionSkeleton/>
    }

    return (
        <>
            {
                suggestions.length > 0 &&
                <section className="flex mt-56 h-fit w-72 py-4 flex-col gap-4 fixed bg-containers-rounded rounded-lg  p-2 items-center justify-start">
                    <h1 className="text-2xl font-bold">Sugerencias</h1>
                    {suggestions.map(sug => (
                        <div key={sug.username} className="flex w-full   items-center justify-around">
                            <img className="size-14 rounded-full object-contain" src={sug.profile_pic} alt={`imagen de ${sug.name}`} />
                            <div className="flex items-center flex-col gap-2"> 
                                <h3 className="text-base font-medium text-[#7B8A9E]">{sug.username}</h3></div>

                            <Link href={`/profile/${sug.username}`} className="rounded-full text-sm text-black font-semibold py-1 px-4 bg-[#FFF]">Ver perfil</Link>
                        </div>
                    ))}


                </section>

            }
        </>


    )
}