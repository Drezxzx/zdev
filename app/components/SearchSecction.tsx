"use client";

import { IconRosetteDiscountCheckFilled, IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { type ResultSearch } from "../types/type";
import searchUser from "../libs/search";

export default function SearchSection() {
    const [results, setResults] = useState<ResultSearch[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.length > 0) {
            const results = await searchUser(searchValue);
            setResults(results);
        } else {
            setResults([]);
        }
    };

    const toggleSearch = (visible: boolean) => {
        setIsVisible(visible);
        document.body.style.overflow = visible ? 'hidden' : 'auto';
    };

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus(); // Mantener el foco en el input cuando el buscador es visible
        }
    }, [isVisible]);

    return (
        <>
            {!isVisible && (
                <IconSearch onClick={() => toggleSearch(true)} size={22} color="#C7D6E6" />
            )}
            <section className="w-[40%] flex gap-2 items-center flex-col justify-center">
                {/* Icono de búsqueda para abrir el formulario */}


                {/* Formulario y resultados de búsqueda cuando el buscador está visible */}
                {isVisible && (
                    <section className="w-screen fixed inset-0 z-[100] flex flex-col items-center gap-2 bg-[#1b27309c] justify-center animate-blurred-fade-in animate-duration-faster backdrop-blur-md h-screen">
                        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-[50%] flex gap-2 justify-center items-center">
                            <input
                                ref={inputRef}
                                value={search}
                                onChange={handleSearch}
                                type="text"
                                className="focus:outline-none rounded-md p-2 w-full bg-[#4b5c6a] text-white font-semibold text-base"
                                placeholder="Search..."
                            />
                            <IconX onClick={() => toggleSearch(false)} size={22} color="#C7D6E6" />
                        </form>
                        <div className="z-[150] flex flex-col gap-2 h-[25rem] overflow-y-scroll">
                            {results.map(user => (
                                <Link
                                    href={`/profile/${user.username}`}
                                    key={user.username}
                                    className="flex gap-1 justify-start w-[300px] items-center bg-[#26313a] rounded-md hover:bg-[#2f3b44] p-2 transition-all"
                                >
                                    <img src={user.profile_pic} alt="Imagen de usuario" className="size-14 rounded-full" />
                                    <div>
                                        <span className="text-base flex gap-2 justify-center items-start">
                                            {user.username}
                                            {Boolean(user.isVerificed) && <IconRosetteDiscountCheckFilled size={20} color="#1DA1F3" />}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </>

    );
}
