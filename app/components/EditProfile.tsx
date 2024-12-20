"use client";
import { use, useEffect, useState } from "react";
import { DataUser } from "../types/type";
import { IconPencil, IconX } from "@tabler/icons-react";
import { updateUser } from "../libs/user";
import { toast } from "sonner";
import { useChangeProfile, useUser } from '@/app/context/changeProfile'
import { useRouter } from "next/navigation";
import LanguajeSelector from "./LanguajeSelector";

export default function EditProfile({ user }: { user: DataUser }) {
    const router = useRouter()
    const { setChange, isChange } = useChangeProfile()
    const [isHidden, setIsHidden] = useState(true);
    const [image, setImage] = useState<File | string>(user.profile_pic);
    const {setUsernameContex} = useUser();
    const [imagePreview, setImagePreview] = useState(user.profile_pic);
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [description, setDescription] = useState(user.description);


    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const id = e.target.id;
        if(e.target.value.length > 55){
            toast.info("The description cannot have more than 30 characters", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            })
            e.target.value = e.target.value.substring(0, 20)
            return
        }
        if (id === "Descrption") {
            setDescription(e.target.value);
        }
    };

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
            if (e.target.value.length > 15) {
                toast.info("The username cannot have more than 15 characters", {
                    style : {
                        backgroundColor : "#1B2730",
                        color : "#C7D6E6"
                    }
                })
                e.target.value = e.target.value.substring(0, 15)
                return
            }
            if (e.target.value.includes(" ")) {
                toast.info("The username cannot contain spaces", {
                    style : {
                        backgroundColor : "#1B2730",
                        color : "#C7D6E6"
                    }
                })
                e.target.value = e.target.value.replaceAll(" ", "")
                return
            }
            setUsername(e.target.value);
        } else if (id === "name") {
            if (e.target.value.length > 15) {
                toast.info("The name cannot have more than 15 characters", {
                    style : {
                        backgroundColor : "#1B2730",
                        color : "#C7D6E6"
                    }
                })
                e.target.value = e.target.value.substring(0, 15)
                return
            }
            setName(e.target.value);
        } else if (id === "email") {
            setEmail(e.target.value);
        }
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    
        if (username.length === 0 || name.length === 0 || email.length === 0) {
            toast.error("Please, fill in all the fields", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            });
            return;
        }
    
        toast.promise(
            new Promise(async (resolve, reject) => {
                const res = await updateUser({ newUsername: username, newName: name, image: image, email: email, description });
                
                if (res?.error) {
                    reject(res.error);
                } else if (res?.success) {
                    resolve("Profile updated");
                    setUsernameContex(username);
                    setChange(true);
                    router.push(`/home/profile/${username}`);
                    setIsHidden(true);
                }
            }),
            {
                style : {
                    background: "#1B2730",
                    color: "#C7D6E6",
                },
                loading: 'Updating profile...',
                success: () => `Profile updated 🎉`,
                error: (error) => error || 'Username already in use'
            }
        );
    };
    

    return (
        <>
            <button className="text-sm hover:scale-105 flex gap-1 justify-center items-center text-black font-semibold py-2 px-4 bg-[#FFF] rounded-full " onClick={() => setIsHidden(false)}>
                Edit 
                <span><IconPencil  size={20} color="black"/></span>
            </button>

            {!isHidden &&
                <section className={`${isHidden ? "hidden" : "flex"} bg-transparent lg:justify-center items-center fixed inset-0 z-[70] flex-col p-2 lg:p-0 lg:flex-row overflow-y-auto overflow-x-hidden lg:overflow-hidden backdrop-blur-lg w-svw h-svh flex animate-blurred-fade-in animate-duration-faster gap-3 `}>
                    <form className="flex lg:h-[716px] lg:w-[596px] lg:m-w-[596px] md:w-[64%] relative h-fit w-full gap-2 lg:gap-4 justify-center flex-col p-2 lg:p-0 bg-slate-800 border border-slate-50/40 items-center  rounded-md" >
                        <div className="w-full flex absolute top-2 left-[6.5rem] justify-center lg:ml-40 ml-[5rem] items-center">
                            <IconX className="cursor-pointer hover:scale-105 transition-all" onClick={() => setIsHidden(true)} size={25} color="white" />
                        </div>
                        <h1 className="text-white text-2xl font-bold">Edit profile</h1>
                        <label className="relative" htmlFor="image">
                            <input onChange={handleChange}  type="file" className="hidden" id="image" accept="image/*" />
                            <img src={imagePreview} alt="Imagen de perfil" className="size-24 object-cover rounded-full" />
                            <IconPencil className="absolute inset-0 bg-white rounded-full p-1" size={25} color="black" />
                        </label>
                        <label className="flex justify-center flex-col w-[70%] items-center">
                            <span>Name</span>
                            <input id="name" onChange={handleChange} type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.name} />
                        </label>
                        <label className="flex  justify-center w-[70%] flex-col items-center">
                            <span>Username</span>
                            <input id="username" onChange={handleChange} type="text" className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.username} />
                        </label>

                        <label className="flex  justify-center w-[70%] flex-col items-center">
                            <span>Descrption</span>
                            <textarea id="Descrption" onChange={handleChangeDescription}  className="w-full rounded-md p-2 bg-[#1B2730] border border-white/10 text-white font-semibold text-base" defaultValue={user.description} />
                        </label>
                        <button onClick={handleClick} className="py-2 px-3 bg-emerald-600 mt-2 text-white font-semibold rounded-md">Confirm</button>
                    </form>
                    <LanguajeSelector isEdit={true} name={user.name} text="Edita tus tenguajes" email={user.username as string} clasName="lg:w-[596px] p-2 lg:p-0  lg:m-w-[596px]  lg:h-[716px] flex flex-col gap-2 bg-slate-800 border border-slate-50/40 justify-center items-center bg-[#1B2730] rounded-lg " />
                </section>}
        </>
    )
}