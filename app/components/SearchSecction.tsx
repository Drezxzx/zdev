"use client";

import { IconRosetteDiscountCheckFilled, IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { type ResultSearch } from "../types/type";
import searchUser from "../libs/search";

export default function SearchSection() {
    const [results, setResults] = useState<ResultSearch[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        if (searchValue.length > 0) {
            setIsLoading(true)
            const results = await searchUser(searchValue);
            setResults(results);
            setIsLoading(false)
        } else {
            setResults([])
                ;
        }
    };

    const NameResalted = ({ name }: { name: string }) => {
        console.log(name)
        let indexOfLettersResalted = []
        const letterName = name.split("")

        for (let i = 0; i < search.length; i++) {
            if (name.toLocaleLowerCase().includes(search[i].toLocaleLowerCase())) {
                indexOfLettersResalted.push(name.toLocaleLowerCase().indexOf(search[i].toLocaleLowerCase()))
            }
        }
        console.log(indexOfLettersResalted)
        return (
            <div className="flex" key={crypto.randomUUID()}>
                {
                    letterName.map((letter, i) => {
                        if (indexOfLettersResalted.some(index => index === i)) {
                            return <span key={letter} className="text-red-500">{letter}</span>
                        }
                        return <span key={letter}>{letter}</span>
                    })}
            </div>

        )
    }

    const toggleSearch = (visible: boolean) => {
        setIsVisible(visible);
        document.body.style.overflow = visible ? 'hidden' : 'auto';
    };

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible]);

    return (
        <>
            {!isVisible && (
                <li className="cursor-pointer transition-all hover:bg-[#1B2730] p-2 rounded-xl"><IconSearch onClick={() => toggleSearch(true)} size={22} color="#C7D6E6" /></li>

            )}

            {/* Icono de búsqueda para abrir el formulario */}


            {/* Formulario y resultados de búsqueda cuando el buscador está visible */}
            {isVisible && (
                <section className="w-[40%] flex gap-2 items-center flex-col justify-center">
                    <section
                        className="w-screen h-screen fixed top-0 left-0 z-[100] flex items-center justify-center bg-[#1B27309c] animate-blurred-fade-in animate-duration-faster backdrop-blur-md"
                        style={{ transform: "translateX(-50%)", left: "50%" }}
                    >
                        <div className="w-full lg:max-w-[50%] p-3 lg:p-0 flex flex-col items-center gap-2">
                            <form onSubmit={(e) => e.preventDefault()} className="w-full flex gap-2 items-center">
                                <input
                                    ref={inputRef}
                                    value={search}
                                    onChange={handleSearch}
                                    type="text"
                                    className="focus:outline-none rounded-md p-2 w-full bg-[#4b5c6a] text-white font-semibold text-base"
                                    placeholder="buscar usuarios..."
                                />
                                <IconX className="cursor-pointer" onClick={() => toggleSearch(false)} size={22} color="#C7D6E6" />
                            </form>
                            <div className="flex flex-col lg:w-full lg:items-center gap-2 h-[25rem] overflow-y-auto">
                                {results.map(user => (
                                    <Link
                                        href={`/profile/${user.username}`}
                                        key={user.username}
                                        className="flex lg:w-[25rem] gap-1 items-center bg-[#26313a] rounded-md hover:bg-[#2f3b44] p-2 transition-all"
                                    >
                                        <img src={user.profile_pic} alt="Imagen de usuario" className="size-14 object-cover rounded-full" />
                                        <div>
                                            <span className="text-base flex gap-2 items-center">
                                                <NameResalted key={"asdasd"} name={user.username} />
                                                {Boolean(user.isVerificed) && <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                                {!isLoading && results.length === 0 && search.length > 0 &&
                                    <div className="text-base text-center font-bold text-slate-300/70">No se encontraron resultados</div>
                                }
                            </div>
                        </div>
                    </section>
                </section>

            )}

        </>

    );
}
