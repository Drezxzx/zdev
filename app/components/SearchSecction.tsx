"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function SearchSecction() {
    const [isFocus, setIsFocus] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setIsFocus(!isFocus)
    }

    const testDataUser = [
        {
            username: "andres",
            name: "Andres Rodriguex",
            profile_pic: "https://avatars.githubusercontent.com/u/104234092?v=4",
            isVerificed: true
        },
        {
            username: "andres",
            name: "Andres Rodriguex",
            profile_pic: "https://avatars.githubusercontent.com/u/104234092?v=4",
            isVerificed: false
        },
        {
            username: "andres",
            name: "Andres Rodriguex",
            profile_pic: "https://avatars.githubusercontent.com/u/104234092?v=4",
            isVerificed: true
        },
        {
            username: "andres",
            name: "Andres Rodriguex",
            profile_pic: "https://avatars.githubusercontent.com/u/104234092?v=4",
            isVerificed: true
        },
        {
            username: "andres",
            name: "Andres Rodriguex",
            profile_pic: "https://avatars.githubusercontent.com/u/104234092?v=4",
            isVerificed: false
        }
    ]

    return (
        <section className="w-[40%] flex gap-2 p-2 items-center justify-start">
            <img  src="/logo.jpeg" alt="Logo de la aplicación" className="size-16 border border-slate-500/70 rounded-full" />
            <form className="w-auto flex justify-center items-center">
                <label className={`w-full ${isFocus ? "border-2" : ""} border-blue-800/90 flex justify-center items-center gap-2 p-2 min-h-[40px]  bg-[#28343E] text-white  rounded-2xl `} htmlFor="search">
                    <span className=""><IconSearch size={22} color="#C7D6E6" /></span>
                    <input
                    
                        type="text"
                        className="focus:outline-none bg-transparent"
                        name="search"
                        id="search" />
                </label>

            </form>
        </section>
    )
}