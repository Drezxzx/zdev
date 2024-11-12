"use client"

import { languajes } from "@/app/libs/languajes";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getUserByEmail } from "../libs/user";
import { IconCode, IconPhotoFilled, IconUpload } from "@tabler/icons-react";
import { useChangeProfile } from '@/app/context/changeProfile'
import { toast } from "sonner";
import { PostsClass } from "../libs/Posts";

interface Props {
    image: boolean | undefined;
    code: boolean | undefined;
    text: boolean | undefined;
}

export default function CreatePost() {
    const { data: session } = useSession()
    const { setChangePost, isChangePost } = useChangeProfile()
    const [profile_pic, setProfilePic] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [code, setCode] = useState("")
    const [id_language, setIdLanguage] = useState<string>("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState("")
    const [postMode, setpostMode] = useState<Props>({ image: false, code: false, text: false })

    useEffect(() => {
        if(!session)return
        getUserByEmail(session?.user.email as string).then(res => {
            setProfilePic(res.profile_pic)
        })
    }, [session])

    useEffect(() => {
        if (session?.user) {
            setAuthor(session.user.email as string)
        }
    }, [session])

    const handleClickLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const $selct = document.getElementById("id_language") as HTMLSelectElement
        setpostMode({ ...postMode, code: !postMode.code })
        if (!postMode.code) {
            setIdLanguage("")
            setCode("")
        }
        if ($selct) {
            $selct.click()
        }
    }

    const handleClickImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const $image = document.getElementById("imageLabel") as HTMLInputElement
        if(postMode.image){
           setpostMode({ ...postMode, image: false })
           setImagePreview("")
           setImage(null)
            return
        }

        if ($image) {
            $image.click()
        } else {
            setImagePreview("")
        }


        setpostMode({ ...postMode, image: !postMode.image })
    }

    const ButtonUpload = () => {
        if (content.length > 0 || code.length > 0 || imagePreview.length > 0) {
            return (
                <button onClick={handleSubmit} className={`hover:bg-slate-200/50  transition-all border border-slate-200/45 rounded-full text-white px-4 py-2 flex gap-2 `}>
                    <IconUpload className="text-purple-500" filter=" drop-shadow(0px 0px 5px #a855f7)" />
                    <span>Subir</span>
                </button>
            )
        }
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
        }
    }
    const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdLanguage(e.target.value)
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const id = e.target.id
        if (id === "post") {
            setContent(e.target.value)
        } else if (id === "code") {
            setCode(e.target.value)
        }
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    const SelectLanguajes = () => {
        return (
            <select
                onChange={handleLanguage}
                id="id_language"
                value={languajes.find(lang => lang.id.toString() === id_language)?.id}
                className="w-1/4 p-2 min-h-[40px] max-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden">
                {
                    languajes.map(languaje => (
                        <option key={languaje.id} value={languaje.id}>{languaje.name}</option>
                    ))
                }
            </select>
        )
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        const formData = new FormData();
        if(postMode.code && code.length === 0){
            toast.error("El código no puede estar vacío", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            })
            return
        }

        if(postMode.image && image === null){
            toast.error("Debes agregar una imagen", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            })
            return
        }

        if(postMode.text && content.length === 0){
            toast.error("El contenido no puede estar vacío", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            })
            return
        }

        if(code.length === 0)setpostMode({ ...postMode, code: false })
        if(image === null)setpostMode({ ...postMode, image: false })
        if(content.length === 0)setpostMode({ ...postMode, text: false })

        formData.append("title", content);
        if (postMode.code) { formData.append("code", code); formData.append("id_language", id_language); }
        if (postMode.image) { formData.append("file", image as File); }
        formData.append("author_email", author);
        
        
        toast.promise(
            PostsClass.createPost(formData).then((data) => {
                // Verificar si `data` indica éxito o error
                if (!data.success) {  // Suponiendo que `data.success` indica si fue exitoso
                    throw new Error("Error al crear el post");
                }
                // Si es exitoso, realiza las acciones necesarias
                setChangePost(!isChangePost);
                setCode("");
                setContent("");
                setIdLanguage("");
                setImagePreview("");
                setImage(null);
                setpostMode({ code: false, image: false, text: false });
                return "El post ha sido creado exitosamente";
            }),
            {
                loading: 'Creando el post...',
                style : {
                    background: "#1B2730",
                    color: "#C7D6E6",
                },
                success: (message) => message,  
                error: (err) => {
                    console.error(err);
                    return `Error al crear el post`;
                },
            }
        );
        

    }

    return (
        <section className="flex w-full items-start h-auto gap-10 bg-[#1B2730] rounded-lg p-4 max-w-screen-md">

            {profile_pic.length > 0 && (
                <img
                    className="md:block object-cover  hidden rounded-full w-14 h-14"
                    src={profile_pic}
                    alt="Imagen de usuario"
                />
            )}

            <div className="flex w-full h-full flex-col gap-5">
                <form className="flex h-full flex-col gap-6">
                    <textarea
                        className="w-full p-2 min-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden"
                        value={content}
                        onChange={handleInput}
                        id="post"
                        rows={1}
                        maxLength={500}
                        placeholder={`¿En que estás pensando?`}
                    />
                    {postMode.code &&
                        <div className="flex gap-2 justify-evenly">
                            <textarea
                                className="w-full p-2 min-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden"
                                value={code}
                                id="code"
                                onChange={handleInput}
                                rows={1}
                                maxLength={2000}
                                placeholder="writte your code"
                            />
                            <SelectLanguajes />
                        </div>
                    }

                    <div className={`flex rounded-lg text-gray-300/80 bg-[#28343E] w-full h-auto p-2 flex-col justify-center items-center gap-2 cursor-pointer ${imagePreview.length === 0 ? "hidden" : ""}`}>
                        <label htmlFor="image" id="imageLabel" className={`flex  w-full h-auto max-h-[50%] flex-col justify-center items-center gap-2 cursor-pointer`}>
                            {imagePreview.length > 0 && <img className="w-full h-[40rem] object-contain" src={imagePreview} alt="Imagen de un post" />}
                            <input type="file" className="hidden" id="image" accept="image/*" onChange={handleImage} />
                        </label>


                    </div>


                  
                    <div className="flex gap-1 justify-center items-center md:gap-2 md:justify-evenly">
                        <button onClick={handleClickImage} className={`hover:bg-slate-200/50 ${postMode.image ? "bg-slate-200/50" : ""}  transition-all border border-slate-200/45 rounded-full text-white px-4 py-2 flex gap-2 `}>
                            <IconPhotoFilled className="text-emerald-400" filter=" drop-shadow(0px 0px 5px #34d399)" />
                            <span>Image</span>
                        </button>
                        <button onClick={handleClickLanguage}
                            className={` hover:bg-slate-200/50 ${postMode.code ? "bg-slate-200/50" : ""}  transition-all
                          text-white px-4 py-2 border border-slate-200/45 rounded-full flex gap-2 `}>                    <IconCode className="text-blue-500" filter=" drop-shadow(0px 0px 5px #3b82f6)" />
                            <span>Code</span>
                        </button>

                        <ButtonUpload />

                    </div>
                </form>
            </div>
        </section>
    )
}
