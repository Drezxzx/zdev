"use client";
import { useEffect, useState } from "react";
import { DataUser } from "../types/type";
import { IconPencil, IconX } from "@tabler/icons-react";
import { updateUser } from "../libs/user";
import { toast } from "sonner";
import {useChangeProfile} from '@/app/context/changeProfile'
import { useRouter } from "next/navigation";
import LanguajeSelector from "./LanguajeSelector";

export default function EditProfile({ user }: { user: DataUser }) {
    const router = useRouter()
    const {setChange, isChange} = useChangeProfile()
    console.log("isChange", isChange)
    const [isHidden, setIsHidden] = useState(true);
    const [image, setImage] = useState<File | string>(user.profile_pic);
    const [imagePreview, setImagePreview] = useState(user.profile_pic);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        if (id === "image") {
            setImage(e.target.files?.[0] as File);
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files?.[0] as File)
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
        } else if (id === "username") {
            if(e.target.value.length > 15){
                toast.info("El nombre de usuario no puede tener mas de 15 caracteres")
                e.target.value = e.target.value.substring(0, 15)
                return
            }
            if(e.target.value.includes(" ")){
                toast.info("El nombre de usuario no puede contener espacios")
                e.target.value = e.target.value.replaceAll(" ", "")
                return
            }
            setUsername(e.target.value);
        } else if (id === "name") {
            if(e.target.value.length > 30){
                toast.info("El nombre no puede tener mas de 15 caracteres")
                e.target.value = e.target.value.substring(0, 30)
                return
            }
            setName(e.target.value);
        } else if (id === "email") {
            setEmail(e.target.value);
        }
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(username.length === 0 || name.length === 0 || email.length === 0){
            toast.error("Por favor, rellene todos los campos");
            return;
        }

        const res = await updateUser({ newUsername : username, newName : name, image : image, email : email });

        if (res.success) {
            toast.success("Perfil actualizado");
        }
        setTimeout(() => {
            
        }, 500);
        
                router.push(`/profile/${username}`)
                setIsHidden(true);
        

    };

    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsHidden(false)}>
                Editar perfil
            </button>

            {!isHidden &&
             <section className={`${isHidden ? "hidden" : "flex"} bg-[#31404c94] justify-center items-center fixed inset-0 z-[70] backdrop-blur-lg w-svw h-svh flex animate-blurred-fade-in animate-duration-faster gap-3 `}>
                <form className="flex h-[716px] w-[596px] m-w-[596px] relative gap-4 justify-center flex-col bg-slate-800 border border-slate-50/40 items-center  rounded-md" >
                <div className="w-full flex absolute top-2 left-[6.5rem] justify-center ml-40 items-center">
                    <IconX className="cursor-pointer hover:scale-105 transition-all" onClick={() => setIsHidden(true)} size={25} color="white" />
                </div>
                <h1 className="text-white text-2xl font-bold">Editar perfil</h1>
                    <label className="relative" htmlFor="image">
                        <input onChange={handleChange} capture="user" type="file" className="hidden" id="image" accept="image/*" />
                        <img src={imagePreview} alt="Imagen de perfil" className="size-24 object-cover rounded-full" />
                        <IconPencil className="absolute inset-0 bg-white rounded-full p-1" size={25} color="black" />
                    </label>
                    <label className="flex justify-center flex-col w-[70%] items-center">
                        <span>Nombre</span>
                        <input id="name" onChange={handleChange} type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.name} />
                    </label>
                    <label className="flex  justify-center w-[70%] flex-col items-center">
                        <span>Username</span>
                        <input id="username"  onChange={handleChange} type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.username} />
                    </label>
                    <button onClick={handleClick} className="py-2 px-3 bg-emerald-600 mt-2 text-white font-semibold rounded-md">Confirmar cambios</button>
                </form>
                <LanguajeSelector isEdit={true} name={user.name} text="Edita tus tenguajes" email={user.username as string} clasName="w-[596px]  m-w-[596px]  h-[716px] flex flex-col gap-2 bg-slate-800 border border-slate-50/40 justify-center items-center bg-[#1B2730] rounded-lg " />
            </section>}
        </>
    )
}