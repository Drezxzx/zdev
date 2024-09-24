/* eslint-disable @next/next/no-img-element */
"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
 import { useEffect, useState } from "react";
export default function HeaderDesktop() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: session } = useSession()
  
  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);
    
    const UserInformation = () =>{
        if (!isLoggedIn) {
        return (
            <div>
                <li><a href="/login">Login</a></li>
            </div>
        )
    } else {
        return(
            <div className="flex bg-slate-400/50 p-1 items-center gap-x-4">
              
                  <Link  className="flex justify-center items-center gap-x-2" href="/profile/[username]" as={`/profile/${session?.user?.username}`}>
                    <img className="size-16 rounded-full" src={session?.user?.image as string} alt="Imagen de usario" />
                    <span>{session?.user?.username}</span>
                  </Link>
                
               
               <li className="cursor-pointer" onClick={() => {signOut({callbackUrl: "/"})}}>Logout</li>
            </div>
        )
    }
    }
    return (
      <header className="w-screen h-24 ">
        <nav className="flex justify-between w-full items-center p-4">
            <ul className="flex w-full justify-between items-center gap-x-4">
                <li><a href="/">Home</a></li>
                <li><a href="/about">Notifications</a></li>
                <li><a href="/contact">Messegaes</a></li>
                <UserInformation />
            </ul>
        </nav>
      </header>
    )
 
  
}