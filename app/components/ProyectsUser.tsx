"use client"
import { useProyects } from '@/app/context/proyects';
import { IconCode } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Proyects } from '../types/type';
import { ProyectsClass } from '@/app/libs/proyects';
import FullScreenOtherUserProyects from './FullScreeenProyectsOther';

export default function ProyectsUser({ isMe, username }: { isMe: boolean, username: string }) {
    const { setIsHiddenFullScreenProyects } = useProyects();
    const [isLoading, setIsLoading] = useState(false);
    const [proyects, setProyects] = useState<Proyects[]>([]);
    const [showFullScreen, setShowFullScreen] = useState(false);
   
    useEffect(() => {
        if (!isMe && username) {
            ProyectsClass.getProyectsByUsername(username)
                .then(res => {
                    setProyects(res);
                    setIsLoading(true);
                })
                .catch(error => console.error("Error al cargar proyectos:", error))
        }
    }, [isMe, username]);

    if (isMe) {
        return (
            <button
                className='text-sm hover:scale-105 flex gap-1 justify-center items-center text-black font-semibold py-2 px-4 bg-[#FFF] rounded-full'
                onClick={() => { setIsHiddenFullScreenProyects(false) }}
            >
                Projects <span><IconCode size={20} color="black" /></span>
            </button>
        );
    }
    console.log("isHiddenFullScreenProyects", showFullScreen);
    return (
        <>
            { isLoading  && showFullScreen && (
                <FullScreenOtherUserProyects
                    proyects={proyects}
                    setIsHidden={setShowFullScreen}
                    isHidden={!showFullScreen}
                    username={username}
                />
            )}

            <button
                className='text-sm hover:scale-105 flex gap-1 justify-center items-center text-black font-semibold py-2 px-4 bg-[#FFF] rounded-full'
                onClick={() => setShowFullScreen(true)}
                disabled={!isLoading}  
            >
                {!isLoading ? 'Loading...' : 'Projects'} <span><IconCode size={20} color="black" /></span>
            </button>
        </>
    );
}
