import { DataLanguage, DataUser } from "../types/type"
import {languajes as arrlanguages} from "../libs/languajes"

export const SectionProfile = ({ user, languajes, isMe }: { user: DataUser, languajes: DataLanguage[], isMe: boolean }) => {
    console.log(languajes)
    if (!isMe) {
        return (
        <section className="flex mb-5 w-full h-auto gap-10 bg-[#1B2730] rounded-lg p-4 max-w-screen-md">
        <img className="size-14 ml-2 rounded-full" src={user.profile_pic as string} alt={`imagen de perfil de ${user.username}`} />
        <div className="flex gap-3 flex-col items-start">
            <div>
                <h2>lenguajes favoritos</h2>
                {languajes.map(lang => {
                    return(
                        <>
                        <h2>{lang.name}</h2>
                        <img src={arrlanguages.find(la => la.id === lang.id)?.img} alt="" />        </>
                    
                )
                    
                    })}
            </div>
            <h2>{user.username}</h2>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
        </div>
        <div className="flex gap-3 justify-center items-center">
            <div className="flex gap-3 flex-col items-start">
                <h2>Followers</h2>
                <h2>{user.followers}</h2>
            </div>
            <div className="flex gap-3 flex-col items-start">
                <h2>Following</h2>
                <h2>{user.followed}</h2>
            </div>
            <button>Follow</button>
        </div>
    </section>
        )
    }
    return (
        <section className="flex mb-5 w-full h-auto gap-10 bg-[#1B2730] rounded-lg p-4 max-w-screen-md">
            <img className="size-14 ml-2 rounded-full" src={user.profile_pic as string} alt={`imagen de perfil de ${user.username}`} />
            <div className="flex gap-3 flex-col items-start">
                <h2>{user.username}</h2>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
            </div>
            <div className="flex gap-3 justify-center items-center">
                <div className="flex gap-3 flex-col items-start">
                    <h2>Followers</h2>
                    <h2>{user.followers}</h2>
                </div>
                <div className="flex gap-3 flex-col items-start">
                    <h2>Following</h2>
                    <h2>{user.followed}</h2>
                </div>
            </div>
        </section>
    );
};

