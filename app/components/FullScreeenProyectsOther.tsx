"use client"
import { IconBrandGithub, IconLink, IconX } from "@tabler/icons-react";
import { Proyects } from '@/app/types/type';
import Beadge from "./Beadge";
import Portal from "./Portal";
import {  useEffect } from "react";

export default function FullScreenOtherUserProyects({ username, proyects, isHidden, setIsHidden }: { username: string, proyects: Proyects[], isHidden: boolean, setIsHidden: React.Dispatch<React.SetStateAction<boolean>> }) {
    
    
    const handleClick = () => {
        setIsHidden(false);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.overflow = isHidden ? 'auto' : 'hidden'; // Hacer scroll cuando está visible
        }
    }, [isHidden]);

    if (isHidden) return null;

    return (
        <Portal>
            <section className="w-screen overflow-x-hidden flex-col lg:px-5 px-2 py-2 h-screen fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                <h1 className="md:text-2xl text-base p-2 items-center flex justify-between w-full md:w-full font-bold">
                    <span className="cursor-pointer hover:scale-105 " onClick={handleClick}><IconX /></span>
                    Projects of {username}
                </h1>
                <div className="z-[1000] overflow-x-hidden w-full max-[550px]:w-full min-h-[90%] grid lg:grid-cols-2 p-2 overflow-auto gap-4">
                    { proyects.length > 0 ? 
                        proyects.map(proyect =>
                            <div key={proyect.id} className="flex relative h-fit bg-containers-rounded flex-col border border-slate-700/55 rounded-lg p-4 gap-3 items-start">
                                <h2 className="text-xl font-bold">{proyect.nameProyect}</h2>
                                <p className="text-sm text-slate-400/90 hyphens-auto break-words max-h-24 overflow-y-auto whitespace-normal leading-tight">
                                    {proyect.description}
                                </p>
                                <div className="flex gap-2 justify-center items-center">
                                    <Beadge href={proyect.gitRepository}> GitHub <IconBrandGithub size={20} /></Beadge>
                                    <Beadge href={proyect.previewLink}> Preview <IconLink size={20} /></Beadge>
                                </div>
                                <div className="md:w-[541px] w-[323px] h-[323px] md:h-[344.047px]">
                                    <img className="w-full h-full object-contain md:object-cover" src={proyect.preview} alt="Preview" />
                                </div>
                            </div>
                        )
                    :
                        <span className="text-center text-sm text-slate-400/90 mt-10 font-semibold">There are no projects</span>
                    }
                </div>
            </section>
        </Portal>
    );
}
