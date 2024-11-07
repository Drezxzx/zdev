"use client"
import { IconBrandGithub, IconLink, IconTrash, IconX } from "@tabler/icons-react";
import { Proyects } from '@/app/types/type';
import Beadge from "./Beadge";
import Portal from "./Portal";
import { useEffect } from "react";
import { toast } from "sonner";
import { ProyectsClass } from "../libs/proyects";
import { useProyects } from "../context/proyects";


export default function FullScreenProyects({ username, proyects, setProjects }: { username: string, proyects: Proyects[], setProjects : React.Dispatch<React.SetStateAction<Proyects[]>>  }) {
    
    const { isHiddenFullScreenProyects, setIsHiddenFullScreenProyects, setisHiddenCreateProyect } = useProyects();
    
    const handleClick = () => {
        setIsHiddenFullScreenProyects(!isHiddenFullScreenProyects);
    };

    const handleDelete = (e : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const elemnt = e.currentTarget
        const nameProyect = proyects.filter(pro => pro.id.toString() === elemnt.id)[0].nameProyect
        toast.warning(`¿Esta seguro que quiere eliminar el proyecto ${nameProyect}?`, {
            action: {
              label: 'SI',
              onClick: () => {
                setProjects(proyects.filter(pro => pro.id.toString() !== elemnt.id))
                toast.success(`${nameProyect} fue eliminado correctamente`)
                ProyectsClass.deleteProyect(elemnt.id.toString())
              }
            },
          })
    }

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = isHiddenFullScreenProyects ? 'auto' : 'hidden';
    }, [isHiddenFullScreenProyects]);

    if (isHiddenFullScreenProyects) return null;

    return (
        <Portal>
            <section className="w-svw  flex-col px-5 h-svh fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                <h1 className="md:text-2xl text-base p-2 items-center flex justify-between w-svw md:w-full font-bold">
                    <span className="cursor-pointer hover:scale-105 " onClick={handleClick}><IconX /></span>
                    Proyectos de {username}
                    <button onClick={() => { setisHiddenCreateProyect(false) }} className="text-sm hover:scale-105 text-black font-semibold py-1 px-4 bg-[#FFF] rounded-full">Crear proyecto</button>
                </h1>
                <div className="z-[1000] w-full md:w-fit min-h-[90%] grid lg:grid-cols-2 p-2 overflow-auto gap-4">
                    { proyects.length > 0 ? 
                        proyects.map(proyect =>
                            <div key={proyect.id}  className="flex relative bg-containers-rounded flex-col border border-slate-700/55 rounded-lg p-4 gap-3 items-start">
                                <div id={proyect.id} onClick={handleDelete} className="p-1 cursor-pointer rounded-lg hover:saturate-50 hover:scale-105 bg-red-600 absolute top-2 right-2"><IconTrash  size={20}/></div>
                                <h2 className="text-xl font-bold">{proyect.nameProyect}</h2>
                                <p className="text-sm text-slate-400/90 hyphens-auto break-words  max-h-24 overflow-y-auto whitespace-normal leading-tight">
                                    {proyect.description}
                                </p>
                                <div className="flex gap-2 justify-center items-center">
                                    <Beadge href={proyect.gitRepository}> GitHub <IconBrandGithub size={20} /></Beadge>
                                    <Beadge href={proyect.previewLink}> Preview <IconLink size={20} /></Beadge>
                                </div>
                                <div className="md:w-[541px] w-[323px] h-[323px] md:h-[344.047px]">
                                    <img className="w-full h-full object-cover" src={proyect.preview} alt="Preview" />
                                </div>

                            </div>
                        ):
                        <span className="text-center text-sm text-slate-400/90 mt-10 font-semibold">No hay proyectos</span>
                    }
                </div>
            </section>
        </Portal>
    );
}
