/* eslint-disable @next/next/no-img-element */
"use client"
import { IconBellFilled, IconHome, IconHomeFilled, IconLogout, IconMessageFilled } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchSecction from "./SearchSecction";
import { getUserByEmail } from "../libs/user";
export default function HeaderDesktop() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession()
  const [username, setUsername] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserByEmail(session?.user.email as string).then(res => {
        setUsername(res.username)
        setImage(res.profile_pic)
      }
      )
    }
  }, [isLoggedIn])

  const UserInformation = () => {
    if (!isLoggedIn) {
      return (
        <div>
          <li><a href="/login">Login</a></li>
        </div>
      )
    } else {
      return (
        <div className="flex bg-[#1B2730] h-[4.5rem] py-2 px-4 justify-center rounded-xl items-center gap-x-4">

          <Link className="flex justify-center items-center gap-x-2 hover:underline" href="/profile/[username]" as={`/profile/${username}`}>
            <img className="size-14 rounded-full object-cover" src={image} alt="Imagen de usario" />
            <span id="username" className="text-base text-balance">{username}</span>
          </Link>

          <div className="border-l-2 flex justify-end pl-2 items-center border-slate-500/80 h-[80%]">
            <li title="Cerrar sesión" className="cursor-pointer hover:scale-105 transition-all" onClick={() => { signOut({ callbackUrl: "/" }) }}><IconLogout size={25} color="#C7D6E6" /></li>
          </div>

        </div>
      )
    }
  }

  return (
    <header className="w-screen h-24 ">
      <nav className="flex justify-between w-full items-center p-4">


        <ul className="flex w-full justify-end  items-center gap-x-4">
          <li className="transition-all hover:scale-105 font-semibold flex gap-1 justify-center items-center bg-white  p-2 rounded-full">
            <Link className="flex justify-center items-center gap-2" href={"/"}>
              <IconHomeFilled color="#1DA1F3" size={25} />
              <span className="text-black text-xs">Home</span>
            </Link>


          </li>
          <li className="cursor-pointer transition-all hover:bg-[#1B2730] p-2 rounded-xl"><IconBellFilled color="#C7D6E6" size={25} /></li>
          <li className="cursor-pointer transition-all hover:bg-[#1B2730] p-2 rounded-xl"><SearchSecction /></li>
          <li className="cursor-pointer transition-all hover:bg-[#1B2730] p-2 rounded-xl"><a href="/inbox"><IconMessageFilled color="#C7D6E6" size={25} /></a></li>
          <UserInformation />
        </ul>
      </nav>
    </header>
  )


}