"use client";

import React, { useState } from "react";
import { Proyects } from "../types/type";
import Portal from "./Portal";
import { IconX } from "@tabler/icons-react";
import { ProyectsClass } from "../libs/proyects";
import { toast } from "sonner";


export default function CreateProyect({
    isHidden,
    setIsHidden,
    email,
    setProjects,
}: {
    isHidden: boolean;
    setIsHidden: Function;
    email : string ;
    setProjects: React.Dispatch<React.SetStateAction<Proyects[]>>;
}) {
    const [imgPreview, setImgPreview] = useState<string>("");
    const [fileImg, setFileImg] = useState<Blob>()
    const [projectData, setProjectData] = useState({
        nameProyect: "",
        description: "",
        gitRepository: "",
        previewLink: "",
    });

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileImg(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgPreview(reader.result as string);
        };
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProject: Proyects = {
            ...projectData, preview: imgPreview,
            id: crypto.randomUUID()
        };
        const fomrData = new FormData();
        fomrData.append("nameProyect", newProject.nameProyect);
        fomrData.append("description", newProject.description);
        fomrData.append("gitRepository", newProject.gitRepository);
        fomrData.append("previewLink", newProject.previewLink);
        fomrData.append("preview", fileImg as Blob);
        fomrData.append("email", email);
        setProjects((prevProjects) => [newProject, ...prevProjects]);
        toast.success(`EL proyecto ${newProject.nameProyect} ha sido creado con éxito`)
        setIsHidden(true);
        setProjectData({ nameProyect: "", description: "", gitRepository: "", previewLink: "" });
        setImgPreview("");

        ProyectsClass.createProyect(fomrData)
    };

    return (
        <Portal>
            {!isHidden && (
                <section className="w-screen flex-col gap-5 px-5 h-screen fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                    <h1 className="text-2xl flex justify-center items-center gap-2 font-bold">Crear un proyecto</h1>
                    <form onSubmit={handleSubmit} className="flex relative flex-col gap-4 items-center justify-center bg-containers-rounded p-6 rounded-lg shadow-md"> 
                        <div className="absolute right-2 top-2" ><IconX onClick={()=> setIsHidden(true)} className="text-2xl cursor-pointer hover:scale-105" /></div>
                        <label htmlFor="nameProyect" className="w-full">
                            Nombre del proyecto
                            <input
                                className="w-full p-2 focus:outline-none mt-1 bg-transparent border-slate-400/60 text-white border rounded"
                                type="text"
                                maxLength={20}
                                name="nameProyect"
                                placeholder="Nombre del proyecto"
                                required
                                value={projectData.nameProyect}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label htmlFor="description" className="w-full">
                            Descripción del proyecto
                            <textarea
                                className="w-full p-2 mt-1 bg-transparent focus:outline-none border-slate-400/60 text-white border rounded"
                                name="description"
                                maxLength={150}
                                placeholder="Descripción del proyecto"
                                value={projectData.description}
                                onChange={handleInputChange}
                                ></textarea>
                        </label>
                        <div className="w-full flex gap-4">
                            <label htmlFor="gitRepository" className="w-full">
                                GitHub
                                <input
                                className="w-full focus:outline-none p-2 mt-1 bg-transparent border-slate-400/60 text-white border rounded"
                                required
                                type="url"
                                name="gitRepository"
                                placeholder="URL del repositorio"
                                value={projectData.gitRepository}
                                onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="previewLink" className="w-full">
                                Preview
                                <input
                                    className="w-full p-2 mt-1 focus:outline-none bg-transparent border-slate-400/60 text-white border rounded"
                                    type="url"
                                    name="previewLink"
                                    placeholder="URL de la demo"
                                    value={projectData.previewLink}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <label htmlFor="preview" className="w-full flex bg-transparent h-80 border-slate-400/60 border-dashed border-2 flex-col items-center justify-center mt-2">
                            {imgPreview ? (
                                <img className="size-80 max-h-80 object-contain " src={imgPreview} alt="Preview" />
                            ) : (
                                <span className="text-gray-500">Sube una imagen</span>
                            )}
                            <input
                                className="hidden"
                                type="file"
                                id="preview"
                                onChange={handleChangeImg}
                                name="preview"
                                accept="image/*"
                                required
                            />
                        </label>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Crear
                        </button>
                    </form>
                </section>
            )}
        </Portal>
    );
}
