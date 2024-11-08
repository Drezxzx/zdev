"use client"
import { useEffect, useState } from "react";
import { getTopLanguajes, type TopLanguajesResponse } from "../actions/getTopLanguajes";
import { languajes } from "../libs/languajes";
import TopLanguagesSkeleton from "./skeletons/TopLanguagesSkeleton";

export default  function TopLanguajes() {
    const [topLanguajes, setTopLanguajes] = useState<TopLanguajesResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        getTopLanguajes().then(data => {
            console.log({data})
            setTopLanguajes(data as TopLanguajesResponse[])
            setIsLoading(false)
        })
    }, [])

    const getImageLanguaje = (languajeName: string):string | undefined => {
        const languaje = languajes.find(lang => lang.name === languajeName);
        return languaje?.img;
    }

    if(isLoading){
        return <TopLanguagesSkeleton/>
    }

    const trophies = ["1.", "2.", "3."]
    return (
        !isLoading && 
        <section className="flex h-fit w-72 py-4 flex-col gap-4 fixed bg-containers-rounded rounded-lg  p-2 items-center justify-start">
            <h1 className="text-2xl font-bold">Top de lenguajes 🏅</h1>
            {
                topLanguajes.map((lang, i) =>
                    <div className="flex gap-2 flex-row w-full  items-center justify-between" key={lang.name}>
                        <h2 className="text-base flex gap-1 justify-center items-center text-slate-400/90 font-medium">{trophies[i]} {lang.name}
                        <img className="size-6 object-contain" src={getImageLanguaje(lang.name)} alt={`imagen del lenguaje ${lang.name}`} />
                        </h2>
                        <h2 className="text-base text-slate-400/90 font-medium">{lang.numberLenguajes} devs</h2>
                    </div>
                )
            }
        </section>
    )

}