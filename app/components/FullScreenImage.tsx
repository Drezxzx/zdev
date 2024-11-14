import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";

export default function FullScreenImage({ image }: { image: string }) {


    const [isHidden, setIsHidden] = useState(true);



    useEffect(() => {
        if (isHidden) return
        const body = document.querySelector("body")

        if (body) {
            body.style.overflow = "hidden"
        }

        return () => {
            if (body) {
                body.style.overflow = "auto"
            }
        }
    }, [isHidden])

    if (isHidden) return (
        <img onClick={() => { setIsHidden(false) }} className="w-[30rem] cursor-copy rounded-md h-[30rem] object-contain" src={image} alt="Imagen de un post" />
    );


    return (
        <Portal>
            <section
                onClick={() => setIsHidden(true)}
                className="w-screen h-screen fixed top-0 left-0 z-[1000] bg-transparent backdrop-blur-md flex items-center justify-center overflow-hidden cursor-zoom-out animate-blurred-fade-in animate-duration-faster"
            >
                <article className="flex flex-col items-center w-full h-full">
                    <div className="w-1/2 h-auto m-auto lg:pt-3">
                        <img
                            src={image}
                            alt="Imagen de perfil"
                            className="w-full lg:h-[60%] h-full object-contain"
                        />
                    </div>
                </article>
            </section>

        </Portal>
    )
}