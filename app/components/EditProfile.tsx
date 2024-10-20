"use client";
import { useState } from "react";
import { DataUser } from "../types/type";
import { IconPencil, IconX } from "@tabler/icons-react";

export default function EditProfile({ user }: { user: DataUser }) {

    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsHidden(false)}>
                Editar perfil
            </button>

            {!isHidden &&
             <section className={`${isHidden ? "hidden" : "flex"} bg-[#31404c94] justify-center items-center fixed inset-0 z-[70] backdrop-blur-lg w-svw h-svh flex-col animate-blurred-fade-in animate-duration-faster gap-3 `}>
                
                
                <form className="flex relative gap-2 justify-center flex-col bg-slate-800  items-center p-9 rounded-md" >
                <div className="w-full flex absolute top-2 left-[-2.5rem] justify-center ml-40 items-center">
                    <IconX className="cursor-pointer hover:scale-105 transition-all" onClick={() => setIsHidden(true)} size={25} color="white" />
                </div>
                <h1 className="text-white text-2xl font-bold">Editar perfil</h1>
                    <label className="relative" htmlFor="image">
                        <input type="file" className="hidden" id="image" accept="image/*" />
                        <img src={user.profile_pic} alt="Imagen de perfil" className="size-24 rounded-full" />
                        <IconPencil className="absolute inset-0 bg-white rounded-full p-1" size={25} color="black" />
                    </label>
                    <label className="flex  justify-center flex-col items-center">
                        <span>Nombre</span>
                        <input type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.name} />
                    </label>
                    <label className="flex  justify-center flex-col items-center">
                        <span>Username</span>
                        <input type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.username} />
                    </label>
                    <button className="py-2 px-3 bg-emerald-600 mt-2 text-white font-semibold rounded-md">Confirmar cambios</button>
                </form>
            </section>}
        </>
    )
}