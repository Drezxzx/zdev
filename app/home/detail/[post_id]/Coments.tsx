"use client"
import LikeButton from "@/app/components/LikeButton"
import Coments from "@/app/libs/coments"
import { Comment } from "@/app/types/type"
import { IconHeart } from "@tabler/icons-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { mirage } from "ldrs"
mirage.register("my-mirage")

export default function SectionComents({ comments, post_id, post_likes, setComments }: { comments: Comment[], post_id: number, post_likes: number, setComments: React.Dispatch<React.SetStateAction<Comment[]>> }) {
    const [comment, setComment] = useState("")
    const [comentsPost, setComentsPost] = useState<Comment[]>(comments)
    const [isLoading, setIsLoading] = useState(false)

    let mostLikedComent = comentsPost.sort((a, b) => b.likes - a.likes)[0] 

    const { data: session } = useSession()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
    }
    const creaeteNewComent = async (): Promise<boolean> => {
        setIsLoading(true)
        const profilePic = session?.user?.image as string
        const username = session?.user?.username as string
        const likes = 0
        const newComent = {
            created_at: new Date(),
            profile_pic: profilePic,
            id: post_id,
            comment: comment,
            likes: likes,
            username: username
        } as Comment


        try {
            const res = await Coments.createComent(post_id.toString(), comment, username)
            if (!res) {
                toast.error("Error al crear el comentario")
                setIsLoading(false)
                return false
            }
            toast.success("Comentario creado")
            setIsLoading(false)
            setComentsPost([newComent, ...comentsPost])
            return true
        } catch (error) {
            setIsLoading(false)
            console.error(error);
            return false
        }

    }
    const hanldeSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (comment.length === 0) {
            toast.error("Escribe un comentario")
            return
        }
        const prevComents = comment

        const res = await creaeteNewComent()
        if (!res) {
            setComment(prevComents)
            return
        }
        setComment("")

    }
    return (
        <section className="w-full flex flex-col justify-center items-center gap-3 p-1">
            <form className="w-full flex gap-2 justify-center">
                <textarea
                    onChange={handleChange}
                    name="comment"
                    value={comment}
                    id="comment"
                    placeholder="comentario..."
                    rows={1}
                    maxLength={150}
                    className="w-full p-2 border-2 rounded-lg border-gray-400 focus:outline-none bg-[#28343E] text-white placeholder-gray-400  resize-none overflow-hidden"
                ></textarea>
                <button
                    onClick={hanldeSubmit}
                    className={`${isLoading ? "bg-gray-500 text-white px-4 py-2 rounded-lg" : "bg-blue-500 text-white px-4 py-2 rounded-lg"}`}
                >
                    {isLoading ? <my-mirage color="white"></my-mirage> : "Comentar"}

                </button>
            </form>

            <section className="w-full flex flex-col justify-center items-center gap-3 p-1">
                {comentsPost.length > 0 ? (
                    comentsPost.map((comment, index) => (
                        <article className="w-full flex flex-col gap-1">
                            {
                                mostLikedComent.likes > 0 && comment.id === mostLikedComent.id &&
                                <span className={"text-[12px] text-white/70"}>Comentario más popular 🏆</span>
                            }
                            <article key={index} className={`${mostLikedComent.likes > 0 && comment.id === mostLikedComent.id ? " bg-[#ffd90036] border-[#ffd900a5] border" : "bg-[#162028]"} w-full rounded-lg px-3 py-5  flex gap-2 justify-center`}>

                                <img className="size-14 object-contain rounded-full" src={comment.profile_pic} alt="Imagen de un usuario" />

                                <div className="flex justify-between w-full gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-white font-semibold text-base">{comment.username}</h2>
                                        <p className="text-white text-sm">{comment.comment}</p>
                                    </div>
                                    <div>
                                        <div className="justify-center items-center flex flex-col">
                                            <IconHeart />
                                            <span className="text-slate-400/80 text-sm">{comment.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </article>

                    ))
                ) : (
                    <center>
                        <p className="text-slate-500/80  m-3 text-xl font-bold">No hay comentarios</p>
                    </center>

                )}
            </section>


        </section>
    )
}