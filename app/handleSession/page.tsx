"use client"
import { useSession } from "next-auth/react"
import { languajes } from "../libs/languajes"
import { Toaster, toast } from 'sonner'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Language, resInsertLanguage } from "../types/type"

export default function HandleSession() {
  const { data: session } = useSession()
  const initiallanguages = languajes.filter((lang, i) => i <= 15)
  const [filteredLanguages, setFilteredLanguages] = useState(initiallanguages)
  const [selectedLanguajes, setSelectedLanguajes] = useState<Language[]>([])
  const router = useRouter()
  const [isInserted, setIsInserted] = useState(false)
  
  const handelChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e.target.value)
    const search = e.target.value
    const filtered = languajes.filter(lang => lang.name.toLowerCase().includes(search.toLowerCase()))
    const resultLimit = filtered.slice(0, 15)
    
    console.log(search.length)
    if (search.length > 0) {
      setFilteredLanguages(resultLimit)
      return
    }
    setFilteredLanguages(initiallanguages)
    
  }

  const handleClick = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (selectedLanguajes.length === 0){
      toast.error("Selecciona al menos un lenguaje")
      return
    }
    
    const res = await fetch("/api/languajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: session?.user.email as string,
        language_id: selectedLanguajes.map(lang => lang.id)
      })
    })
    const resjson = await res.json() as resInsertLanguage
    if (resjson.data) {
      router.push("/")
    }
  }

  const isSelected = (lang: Language) => {
    return selectedLanguajes.some(selected => selected.id === lang.id)
  }

  const handleLanguage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLLIElement
    const selectedLanguajeInput = languajes.find(lang => lang.id.toString() === element.id) as Language

    

    if (isSelected(selectedLanguajeInput)) {
      setSelectedLanguajes(selectedLanguajes.filter(lang => lang.id !== selectedLanguajeInput.id))
      return;
    }

    setSelectedLanguajes([...selectedLanguajes, selectedLanguajeInput])
  }

  useEffect(() => {
    if (!session?.user || isInserted) {
      return; // Evitar inserción si ya se hizo o no hay sesión
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
        router.push("/");
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

  }, [session, isInserted]); // Añadido isInserted como dependencia

  return (
    
    isInserted &&
    <main className=" h-[98rem] w-screen max-h-screen flex-col gap-6 flex justify-center items-center">
      <h1 className="text-3xl">Bienvenido {session?.user?.name} 👋</h1>
      <h2 className="text-xl">Selecciona tus lenguage favorito</h2>

      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg" >Continuar</button>
        <section className="w-[80%] h-auto flex flex-col gap-4 border border-slate-50/40 bg-[#1B2730] rounded-lg p-4">
          <input onChange={handelChange} type="text" name="search" placeholder="Buscar..." className="w-full p-2 border-2 rounded-lg border-gray-400 focus:outline-none bg-[#28343E] text-white placeholder-gray-400  resize-none overflow-hidden"/>

          <div className="w-full h-auto ">
            <ul className="grid  grid-cols-4 gap-4">
              {filteredLanguages.map(lang => (
                <li 
                onClick={handleLanguage} 
                className={`${isSelected(lang) ? "bg-[#1b6f4f] border border-slate-100/60" : ""} cursor-pointer z-[9999] relative flex-col rounded-lg p-3 hover:bg-[#1b6f4f] transition-all hover:scale-105 gap-2 flex justify-center items-center text-center font-semibold text-base`} 
                key={lang.id} 
                id={lang.id.toString()}
              >
                {lang.img && <img className="size-10 z-[10000] object-contain rounded-mg" src={lang.img} alt={`imagen de ${lang.name}`} />}
                <span className="z-[10000]">
                  {lang.name}
                </span>
              </li>
              ))}
            </ul>
          </div>
        </section>
    </main>
    
  ); 
}
