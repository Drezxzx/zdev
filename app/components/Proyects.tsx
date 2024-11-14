"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/changeProfile";
import Beadge from "./Beadge";
import { IconCode, IconBrandGithub, IconLink, IconX } from "@tabler/icons-react";
import FullScreenProyects from "./FullScreenProyects";
import { type Proyects } from "../types/type";
import CreateProyect from "./CreateProyect";
import { ProyectsClass } from "../libs/proyects";
import { useProyects } from "../context/proyects";
import FullScreenProyectsSkeleton from "./skeletons/FullScreenProyectsSkeleton";



export default function Proyects() {
    const [proyects, setProyects] = useState<Proyects[]>([])
    const [isloading, setIsloading] = useState(true)
    const { usernameContex, email } = useUser();
    const { setIsHiddenFullScreenProyects,setisHiddenCreateProyect } = useProyects();

    useEffect(() => {
        if (email.length === 0) return
        
        ProyectsClass.getProyects(email)
            .then(res => {
                setProyects(res)
                setIsloading(false)
            })
    }, [email]);

    if (isloading) {
        return <FullScreenProyectsSkeleton />
    }

    return (
        
        <section className="w-72 overflow-y-auto relative hidden lg:flex space-y-2 rounded-lg flex-col py-2 items-center bg-containers-rounded px-4 z-10 pb-[3.5rem]">
            <FullScreenProyects setProjects={setProyects} username={usernameContex} proyects={proyects} />
            <CreateProyect email={email}  setProjects={setProyects} />

            <h1 className="text-2xl flex justify-center items-center gap-2 font-bold">projects <span><IconCode /></span></h1>

            <div className="flex gap-4">
                {proyects.length > 0 && <button onClick={() => { setIsHiddenFullScreenProyects(false) }} className="text-sm hover:scale-105 text-black font-semibold py-1 px-4 bg-[#FFF] rounded-full">See all</button>}
                {proyects.length < 8 && <button onClick={() => { setisHiddenCreateProyect(false) }} className="text-sm hover:scale-105 text-black font-semibold py-1 px-4 bg-[#FFF] rounded-full">Create </button>}
            </div>

            <div className="flex flex-col space-y-1 justify-center items-center">
                {proyects.length > 0 ? proyects.map((projects, index) => (
                    <div id={projects.id.toString()} key={index} className="flex flex-col border border-slate-700/55 w-[256px] rounded-lg max-w-[256px] p-2 gap-3 items-start">
                        <h2 className="text-xl font-bold">{projects.nameProyect}</h2>

                        <p className="text-sm text-slate-400/90 hyphens-auto break-words max-h-24 overflow-y-auto text-ellipsis whitespace-normal leading-tight">
                            {projects.description}
                        </p>

                        <div className="flex gap-2 w-[256px] justify-start items-center">
                            {projects.gitRepository.length > 0 && <Beadge href={projects.gitRepository}> GitHub <IconBrandGithub size={20} /></Beadge>}
                            {projects.previewLink.length > 0 && <Beadge href={projects.previewLink}> Preview <IconLink size={20} /></Beadge>}
                        </div>

                        <img src={projects.preview} alt="Preview" className="rounded-lg size-60 object-contain" />
                    </div>
                )) : 
                <span className="text-center text-sm text-slate-400/90 mt-10 font-semibold">There are no projects</span>
                }
            </div>
        </section>

    )



}