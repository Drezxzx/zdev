"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/changeProfile";
import Beadge from "./Beadge";
import { IconCode, IconBrandGithub, IconLink, IconX } from "@tabler/icons-react";
import FullScreenProyects from "./FullScreenProyects";
import { type Proyects } from "../types/type";
import CreateProyect from "./CreateProyect";
import { ProyectsClass } from "../libs/proyects";



export default function Proyects() {
    const [isHidden, setIsHidden] = useState(true)
    const [isHiddenCreate, setIsHiddenCreate] = useState(true)
    const [proyects, setProyects] = useState<Proyects[]>([])
    const { usernameContex, email } = useUser();

    useEffect(() => {
        if (email.length === 0) return
        ProyectsClass.getProyects(email)
        .then(res => setProyects(res))
    }, [email]);

    return (
        <section className="w-72 overflow-y-auto relative hidden lg:flex space-y-2 rounded-lg flex-col py-2 items-center bg-containers-rounded px-4 z-10 pb-28">
    <FullScreenProyects setProjects={setProyects} isHidden={isHidden} setIsHidden={setIsHidden} username={usernameContex} proyects={proyects} />
    <CreateProyect email={email} isHidden={isHiddenCreate} setIsHidden={setIsHiddenCreate} setProjects={setProyects} />
    
    <h1 className="text-2xl flex justify-center items-center gap-2 font-bold">Proyectos <span><IconCode /></span></h1>
    
    <div className="flex gap-4">
        {proyects.length > 0 && <button onClick={() => { setIsHidden(false) }} className="text-sm hover:scale-105 text-black font-semibold py-1 px-4 bg-[#FFF] rounded-full">Ver todos</button>}
        {proyects.length < 8 && <button onClick={() => { setIsHiddenCreate(false) }} className="text-sm hover:scale-105 text-black font-semibold py-1 px-4 bg-[#FFF] rounded-full">Crear proyecto</button>}
    </div>

    <div className="flex flex-col space-y-1 justify-center items-center">
        {proyects.map((projects, index) => (
            <div id={projects.id.toString()} key={index} className="flex flex-col border border-slate-700/55 w-[256px] rounded-lg max-w-[256px] p-2 gap-3 items-start">
                <h2 className="text-xl font-bold">{projects.nameProyect}</h2>
                
                <p className="text-sm text-slate-400/90 break-words max-h-24 overflow-y-auto text-ellipsis whitespace-normal leading-tight">
                    {projects.description}
                </p>

                <div className="flex gap-2 w-[256px] justify-start items-center">
                    {projects.gitRepository.length > 0 && <Beadge href={projects.gitRepository}> GitHub <IconBrandGithub size={20} /></Beadge>}
                    {projects.previewLink.length > 0 && <Beadge href={projects.previewLink}> Preview <IconLink size={20} /></Beadge>}
                </div>
                
                <img src={projects.preview} alt="Preview" className="rounded-lg size-60 object-contain" />
            </div>
        ))}
    </div>
</section>

    )



}