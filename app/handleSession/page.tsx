"use client"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LanguajeSelector from "../components/LanguajeSelector"

export default function HandleSession() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isInserted, setIsInserted] = useState(false)
  

  useEffect(() => {
    if (!session?.user || isInserted) {
      return; 
    }

    const username = session.user.username || "";
    const email = session.user.email || "";
    const profilePic = session.user.image || "";
    const name = session.user.name || "";

    fetch("/api/users", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        username,
        email,
        profile_pic: profilePic
      })
    })
    
    .then((res) => {
      if (res.status === 250) {
        console.log("Usuario ya existente o error en la creación.");
        router.push("/home");
        setIsInserted(false); 
        return;
      }

      return res.json(); 
    })
    .then((data) => {
      if (data) {
        console.log("Usuario creado:", data);
        setIsInserted(true); 
      }
    })
    .catch((error) => console.error('Error:', error))

  }, [session, isInserted]); 

  return (
    
    isInserted &&
    <LanguajeSelector isEdit={false} name={session?.user?.name as string} text="Selecciona tus lenguage favorito" clasName="h-[98rem] w-screen max-h-screen flex-col gap-6 flex justify-center items-center" email={session?.user?.email as string}/>
    
  ); 
}
