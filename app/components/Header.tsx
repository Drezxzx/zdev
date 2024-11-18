"use client"
/* eslint-disable @next/next/no-img-element */
;
import { IconBellFilled, IconCode, IconExclamationCircleFilled, IconHomeFilled, IconLogout, IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchSecction from "./SearchSecction";
import { getUserByEmail } from "../libs/user";
import { useUser } from "../context/changeProfile";
import { useProyects } from "../context/proyects";
import HeaderSkeleton from "./skeletons/HeaderSkeleton";
import NotificationComponentToast from "./Notificacionts";
import { useNotifications } from "../context/notifications";

export default function HeaderDesktop() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const {setIsHiddenFullScreenNotifications, setThereAreNewNotifications, thereAreNewNotifications} = useNotifications()
  const { setImageContext, setNameContext, setEmailContex, setUsernameContex, setIs_verified, usernameContex, is_verified, image} = useUser();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsHiddenFullScreenProyects, isHiddenFullScreenProyects } = useProyects();

  useEffect(() => {
    
    const body = document.querySelector('body');
    if (body) {
      body.style.overflowWrap = 'hidden';
    }
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserByEmail(session?.user.email as string).then((res) => {
        setIs_verified(res.is_verified);
        setUsernameContex(res.username);
        setImageContext(res.profile_pic);
        setEmailContex(res.email);
        setNameContext(res.name);
        setIsloading(false);
        
        
      });
    }
  }, [isLoggedIn]);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NotificationExclamation = () : JSX.Element  => {
    if(!thereAreNewNotifications) return <span className="hidden"></span>
    return (
      <span className="absolute bottom-0 right-0 animate-pulse" ><IconExclamationCircleFilled  size={18} color="red"/></span>
    )
  }

  console.log(is_verified)
  const UserInformation = () => {
    if (isloading) {
      return (
        <div className="border-l-2 flex justify-end pl-2 items-center border-slate-500/80 h-[80%]">
          <HeaderSkeleton />
      </div>
      );
    } else {
      return (
        <div className="flex lg:bg-[#1B2730] bg-transparent py-1 px-2 w-fit  justify-center rounded-xl items-center gap-x-4">
          <Link className="flex justify-center items-center gap-x-2 hover:underline" href="/home/profile/[username]" as={`/home/profile/${usernameContex}`}>
            <img className="hidden lg:block size-8 lg:size-8 rounded-full object-cover" src={image} alt="Imagen de usario" />
            <span id="username" className="text-base text-balance">{usernameContex}</span>
            {is_verified !== undefined && Boolean(is_verified) && <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />}
          </Link>

          <div className="border-l-2 flex justify-end pl-2 items-center border-slate-500/80 h-[80%]">
            <li title="Cerrar sesión" className="cursor-pointer hover:scale-105 transition-all" onClick={() => { signOut({ callbackUrl: "/" }) }}><IconLogout size={25} color="#C7D6E6" /></li>
          </div>
        </div>
      );
    }
  };


  return (
    <header className={`w-screen p-2 lg:p-0 z-[51] fixed h-24 lg:h-20 transition-all duration-300 ${isScrolled ? "backdrop-blur-lg bg-gray-800/70 lg:backdrop-blur-none lg:bg-transparent" : "bg-transparent"}`}>
     {session?.user && <NotificationComponentToast userId={session.user.email as string} />}
      <nav className="flex justify-between w-full items-center p-4 lg:p-0">
        <ul className="flex w-full justify-center items-center gap-x-4">
          <div
            className={`transition-colors duration-500 ${isScrolled ? "lg:backdrop-blur-lg lg:bg-gray-800/80 rounded-b-md" : "bg-transparent"} lg:border-b transition-[border-color] lg:h-[78px] ${isScrolled ? "lg:border-gray-400/50" : "border-transparent"} flex w-full max-w-[657px] justify-center items-center gap-x-2 md:gap-x-4`}
          >
            <li className="transition-all hover:scale-105 font-semibold flex gap-1 justify-center items-center bg-white p-2 rounded-full">
              <Link className="flex justify-center items-center gap-2" href={"/home"}>
                <IconHomeFilled color="#1DA1F3" size={25} />
                <span className="text-black text-xs">Home</span>
              </Link>
            </li>
            <li className="cursor-pointer relative transition-all hover:bg-[#1B2730] p-2 rounded-xl" onClick={()=>{setIsHiddenFullScreenNotifications(false); setThereAreNewNotifications(false)}}>
             <NotificationExclamation/>
              <IconBellFilled color="#C7D6E6" size={25} />
              </li>
            <SearchSecction />
            <li onClick={()=>{setIsHiddenFullScreenProyects(false)}} className="cursor-pointer transition-all hover:bg-[#1B2730] p-2 rounded-xl"><span><IconCode color="#C7D6E6" size={25} /></span></li>
            <UserInformation />
          </div>
        </ul>
      </nav>
    </header>

  );
}
