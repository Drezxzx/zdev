import { useEffect, useState } from "react";
import { languajes } from "../libs/languajes";
import { Language } from "../types/type";
import { useUser } from "../context/changeProfile";
import Portal from "./Portal";
import { IconX } from "@tabler/icons-react";
import { createPresentation, userPresentation } from "../libs/user";
import { toast } from "sonner";
import { PostsClass } from "../libs/Posts";

export default function UserPresentation() {
    const { email, usernameContex } = useUser();
    const [isHidden, setIsHidden] = useState(true);
    const [description, setDescription] = useState("");
    const [needPresentation, setNeedPresentation] = useState(false);

    useEffect(() => {
        if (email.length === 0) return

        userPresentation(usernameContex).then(res => {
            setNeedPresentation(res)
            console.log(res)
            setIsHidden(false)
        })


    }, [email])

    const handLerSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        
        if(description.length === 0){
            toast.error("The description cannot be empty", {
                style : {
                    backgroundColor : "#1B2730",
                    color : "#C7D6E6"
                }
            })
            return
        }

        const formData = new FormData();
        formData.append("username", usernameContex);
        formData.append("description", description);
        toast.promise(createPresentation({data : formData}), {
            loading : 'Creating the presentation...',
            style : {
                background: "#1B2730",
                color: "#C7D6E6",
            },
            success: () => "Presentation created 🎉",
            error: (error) => error 
        })
        
    }
    return (
        <Portal>
            {needPresentation  && !isHidden &&
                <section className="w-screen overflow-x-hidden flex-col lg:px-5 px-2 py-2 h-screen fixed top-0 left-0 z-[1000]  flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                    <div className="lg:w-1/2 md:w-[70%] w-full relative border border-slate-400/65 h-[60%] rounded-lg  flex bg-containers-rounded flex-col justify-center gap-10 items-center">
                        <IconX className="cursor-pointer absolute top-2 right-2 hover:scale-105 transition-all" onClick={() => setIsHidden(true)} size={25} color="white" />
                    <div className="flex  justify-center gap-4 items-center w-[70%] h-full flex-col">
                    <h1 className="md:text-2xl text-xl  font-bold">Welcome <span className="text-emerald-600">{usernameContex}</span> 👋🏻</h1>
                        <p className="text-sm text-slate-400/90">Add a description of yourself and introduce yourself to the community.</p>
                        <form className="flex w-full h-[50%] items-center justify-start flex-col gap-2" >
                            <textarea className="w-full h-[50%] p-2 bg-[#1B2730] border resize-none focus:outline-none border-white/10 text-white font-semibold text-base" name="description" onChange={(e)=>setDescription(e.target.value)} maxLength={55} rows={50}  placeholder="Write your description" />
                            <button className="py-2 px-3 hover:scale-105 hover:saturate-50 transition-all bg-emerald-600 mt-2 text-white font-semibold rounded-md" onClick={handLerSubmit}>Confirm</button>
                        </form>
                    </div>
                        
                    </div>
                </section>}

        </Portal>

    )
}