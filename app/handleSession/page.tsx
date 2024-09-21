"use client"
import { useSession } from "next-auth/react"
import { languajes } from "../libs/languajes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HandleSession() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [isInserted, setIsInserted] = useState(false) // Estado local para controlar la inserción
  
  const initiallanguages = languajes.filter((lang, i) => i <= 15)
  console.log(initiallanguages);

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
        // router.push("/");
        setIsInserted(true); // Marcar como insertado
        return;
      }

      return res.json(); // Procesar respuesta si es un nuevo usuario
    })
    .then((data) => {
      if (data) {
        console.log("Usuario creado:", data);
        setIsInserted(true); // Marcar como insertado para prevenir futuras inserciones
      }
    })
    .catch((error) => console.error('Error:', error))

  }, [session, isInserted]); // Añadido isInserted como dependencia

  return (
    <main className=" h-screen w-screen flex-col gap-8 flex justify-center items-center">
      <h1 className="text-3xl">Bienvenido {session?.user?.name} 👋</h1>
      <h2 className="text-xl">Selecciona tu idioma favorito</h2>
        <section className="w-[80%] h-auto flex flex-col gap-4 border border-slate-50/40 bg-[#1B2730] rounded-lg p-4">
          <input type="text" name="search" placeholder="Buscar..." className="w-full p-2 border-2 rounded-lg border-gray-400 focus:outline-none bg-[#28343E] text-white placeholder-gray-400  resize-none overflow-hidden"/>

          <div className="w-full h-auto ">
            <ul className="grid  grid-cols-4 gap-4">
              {initiallanguages.map(lang => (
                <li className="cursor-pointer p-1 hover:bg-[#28343E] transition-all hover:scale-105 gap-2 flex justify-center items-center text-center font-semibold text-base" key={lang.id}>
                  <img className="size-14 object-contain rounded-mg" src={lang.img} alt={`imagen de ${lang.name}`} />
                  {lang.name}
                  </li>
              ))}
            </ul>
          </div>
        </section>
    </main>
  ); 
}
