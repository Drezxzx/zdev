"use client"

import { languajes } from "@/app/libs/languajes";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface Props {
    image: boolean | undefined;
    code: boolean| undefined;
    text: boolean| undefined;
}

export default function CreatePost() {
    const { data: session } = useSession()
    const [content, setContent] = useState("")
    const [hastags, setHastags] = useState<string[]>([])
    const [author, setAuthor] = useState("")
    const [code, setCode] = useState("")
    const [id_language, setIdLanguage] = useState<string>("")
    const [image , setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState("")
    const [postMode, setpostMode] = useState<Props>({image: false, code: false, text: false})
    
    useEffect(() => {
        if (session?.user) {
            setAuthor(session.user.email as string)
        }
    }, [session])
    
    const handleClickLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const $selct = document.getElementById("id_language") as HTMLSelectElement
        e.preventDefault();
        setpostMode({...postMode, code : !postMode.code})
        if (!postMode.code) {
            setIdLanguage("")
            setCode("")
        }
        if ($selct) {
            $selct.click()
        }
    }

    const handleClickImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const $image = document.getElementById("imageLabel") as HTMLInputElement

        if ($image) {
            $image.click()
        }else{
            setImagePreview("")
        }

        e.preventDefault();

        setpostMode({...postMode, image: !postMode.image})
    }

    const ButtonUpload = () => {
        if (content.length > 0|| code.length > 0 || imagePreview.length > 0) {
            return (
                <button onClick={handleSubmit} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Upload</button>
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
        }else if (id === "code") {
            setCode(e.target.value)
        }
        e.target.style.height = 'auto'  
        e.target.style.height = `${e.target.scrollHeight}px`  
    }

    const SelectLanguajes  = () => {
        return (
            <select 
            onChange={handleLanguage}
            id="id_language"
            value={languajes.find(lang => lang.id.toString() === id_language)?.id}
            className="w-1/4 p-2 min-h-[40px] max-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden">
                {
                    languajes.map(languaje =>(
                        <option key={languaje.id} value={languaje.id}>{languaje.name}</option>
                    ))
                }
            </select>
        )
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", content);
        if(postMode.code){formData.append("code", code);}
        if(postMode.image){formData.append("file", image as File);}
        formData.append("author_email", author);
        formData.append("id_language", id_language);

        const res = await fetch("/api/posts", {
            method: "POST",
            body: formData
        })

        if (res.status !== 200) {
            console.error("Error al crear el post");
            return;
        }

        res.json().then((data) => {
            if (data.success) {
            location.reload()
            }
        })
    }

    return (
        <section className="flex w-full items-center h-auto gap-10 bg-[#1B2730] rounded-lg p-4 max-w-screen-md">
            
            {session?.user?.image && (
                <img
                    className="rounded-full w-14 h-14"
                    src={session.user.image as string}
                    alt="Imagen de usuario"
                />
            )}
            
            <div className="flex w-full h-full flex-col gap-5">
                {/* Formulario para crear el post */}
                <form className="flex h-full flex-col gap-2">
                    {/* Textarea para escribir el post, crece dinámicamente */}
                    <textarea
                        className="w-full p-2 min-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden"
                        value={content}
                        onChange={handleInput}
                        id="post"
                        rows={1}
                        maxLength={500}
                        placeholder="What's on your mind?"
                    />
                        {postMode.code && 
                        <div className="flex gap-2 justify-evenly">
                            <textarea
                                className="w-full p-2 min-h-[40px] focus:outline-none bg-[#28343E] text-white placeholder-gray-400 rounded-lg resize-none overflow-hidden"
                                value={code}
                                id="code"
                                onChange={handleInput}
                                rows={1}
                                maxLength={1000}
                                placeholder="writte your code"
                            />
                            <SelectLanguajes/>
                        </div>
                        }

                        <div className={`flex rounded-lg text-gray-300/80 bg-[#28343E] w-full h-auto p-2 flex-col justify-center items-center gap-2 cursor-pointer ${imagePreview.length === 0 ? "hidden" : ""}`}>
                            <label htmlFor="image" id="imageLabel" className={`flex  w-full h-auto max-h-[50%] flex-col justify-center items-center gap-2 cursor-pointer`}>
                                {imagePreview.length > 0 && <img className="w-full h-[40rem] object-contain" src={imagePreview} alt="Imagen de un post" />}
                                <input type="file" className="hidden" id="image" accept="image/*" onChange={handleImage} />
                            </label>
                            
                            
                        </div>
                    
                    
                    {/* Botones de acción */}
                    <div className="flex gap-2 justify-evenly">
                        <button onClick={handleClickImage} className={`bg-blue-500 ${postMode.image ? "shadow-lg shadow-blue-500" : ""} text-white px-4 py-2 rounded-lg`}>Image</button>
                        <button onClick={handleClickLanguage} 
                        className={`bg-green-500 ${postMode.code ? "shadow-lg shadow-green-500" : ""} 
                          text-white px-4 py-2 rounded-lg`}>
                            Code
                            </button>

                        <ButtonUpload />
                       
                    </div>
                </form>
            </div>
        </section>
    )
}
