"use client"

import { useEffect, useState } from "react"
import { languajes } from "../libs/languajes"
import { toast } from "sonner"
import { useChangeProfile } from '@/app/context/changeProfile'
import { Language, LanguajeType, resInsertLanguage } from "../types/type"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LanguajeSelector({ clasName, email, name, text, isEdit }: { clasName: string, email: string, name: string, text: string, isEdit: boolean }) {
    const { setChange } = useChangeProfile()
    const [isChanged, setIsChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const maxLanguajes = 6
    const [selectedNumber, setSelectedNumber] = useState<number>(0)
    const { data: session } = useSession()
    const router = useRouter()
    const initialLanguages = languajes.filter((lang, i) => i <= 15 && lang.id !== 2000)
    const [filteredLanguages, setFilteredLanguages] = useState(initialLanguages)
    const [selectedLanguajes, setSelectedLanguajes] = useState<Language[]>([])

    useEffect(() => {
        fetch("/api/languajes?username=" + email)
            .then(res => res.json() as Promise<LanguajeType>)
            .then(data => {
                console.log(data)
                const selected = languajes.filter(lang => data.data.some(langData => langData.id === lang.id))
                console.log(selected);
                
                setSelectedLanguajes(selected)
                setSelectedNumber(selected.length)
            })
            .finally(() => setIsLoading(false))
    }, [email, filteredLanguages]);

    const isSelected = (lang: Language) => {
        return selectedLanguajes.some(selected => selected.id === lang.id)
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isChanged) {
            toast.warning("No has realizado ningun cambio")
            return
        }
        e.preventDefault();
        if (selectedLanguajes.length === 0) {
            toast.error("Selecciona al menos un lenguaje")
            return
        }
        const res = await fetch("/api/languajes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: session?.user.email as string,
                language_id: selectedLanguajes.map(lang => lang.id)
            })
        })

        const resjson = await res.json() as resInsertLanguage
        if (res.status !== 200) {
            toast.error("Error al actualizar los lenguajes")
            return
        }

        if (resjson.data && !isEdit) {
            router.push("/")
        } else {
            toast.success("Lenguajes actualizados")
            setChange(true)
        }
    }

    const handleLanguage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setIsChanged(true)
        e.preventDefault()

        const element = e.currentTarget as HTMLLIElement
        const selectedLanguajeInput = languajes.find(lang => lang.id.toString() === element.id) as Language
        
        if (isSelected(selectedLanguajeInput)) {
            setSelectedLanguajes(prevSelected => {
                const newSelected = prevSelected.filter(lang => lang.id !== selectedLanguajeInput.id)
                setSelectedNumber(newSelected.length) 
                return newSelected
            })
        } else {
            if (selectedLanguajes.length < maxLanguajes) {
                setSelectedLanguajes(prevSelected => {
                    const newSelected = [...prevSelected, selectedLanguajeInput]
                    setSelectedNumber(newSelected.length) 
                    return newSelected
                })
            } else {
                toast.warning("No puedes seleccionar más de 6 lenguajes")
            }
        }
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value
        const filtered = languajes.filter(lang => lang.name.toLowerCase().includes(search.toLowerCase()))
        const resultLimit = filtered.slice(0, 15)
        if (search.length > 0) {
            setFilteredLanguages(resultLimit)
            return
        }
        setFilteredLanguages(initialLanguages)
    }

    if (isLoading) return null; // Cambié para no renderizar nada mientras se carga

    return (
        <main className={clasName}>
            <h1 className="text-3xl">Bienvenido {name} 👋</h1>
            <h2 className="text-xl">{text}</h2>
            <span className="text-sm text-slate-400/80">{selectedNumber}/{maxLanguajes} Lenguajes seleccionados</span>
            <button onClick={handleClick} className="bg-blue-500 hover:saturate-50 transition-all hover:scale-105 text-white px-4 py-2 rounded-lg">Confirmar</button>
            <section className="w-[80%] h-auto flex flex-col gap-4 border border-slate-50/40 bg-[#1B2730] rounded-lg p-4">
                <input onChange={handelChange} type="text" name="search" placeholder="Buscar..." className="w-full p-2 border-2 rounded-lg border-gray-400 focus:outline-none bg-[#28343E] text-white placeholder-gray-400 resize-none overflow-hidden" />

                <div className="w-full h-auto">
                    <ul className="grid grid-cols-4 gap-4">
                        {filteredLanguages.map(lang => (
                            <li
                                onClick={handleLanguage}
                                className={`${isSelected(lang) ? "bg-[#1b6f4f] border border-slate-100/60" : ""} cursor-pointer z-[9999] relative flex-col rounded-lg p-3 hover:bg-[#1b6f4f] transition-all hover:scale-105 gap-2 flex justify-center items-center text-center font-semibold text-base`}
                                key={lang.id}
                                id={lang.id.toString()}
                            >
                                {lang.img && <img className="size-10 z-[10000] object-contain rounded-mg" src={lang.img} alt={`imagen de ${lang.name}`} />}
                                <span className="z-[10000]">
                                    {lang.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}
