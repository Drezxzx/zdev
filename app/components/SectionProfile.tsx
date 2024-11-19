"use client";
import { DataLanguage, DataUser } from "../types/type";
import { languajes as arrlanguages } from "../libs/languajes";
import ButtonFollowUnfollow from "./ButtonFollowUnfollow";
import { useChangeProfile } from "@/app/context/changeProfile"
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";
import ProyectsUser from "./ProyectsUser";
import FullScreenFollowersFollowed from "./FullScreenFollowersFollowed";

export const SectionProfile = ({
  user,
  languajes,
  isMe,
  followers,
  setFollowers
}: {
  user: DataUser;
  languajes: DataLanguage[];
  isMe: boolean;
  followers: number;
  setFollowers: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isHiddenFollowers, setIsHiddenFollowers] = useState(true)
  const { setChange } = useChangeProfile()
  const [isInFollowers, setIsInFollowers] = useState(true); // true = Followers, false = Followed

  useEffect(() => {
    setChange(false)
  }, [])


  const ImgLanguaje = ({ lang }: { lang: DataLanguage }) => {
    if (!arrlanguages.find((la) => la.id === lang.id)?.img) {
      return;
    }

    return (
      <img
        className="size-7  object-contain "
        src={arrlanguages.find((la) => la.id === lang.id)?.img}
        alt=""
      />
    );
  };



  const DivProfile = ({ children, className, id }: { children: React.ReactNode, className: string | undefined, id: string }) => {

    const handlerClick = () => {
      if (id === "followers") setIsInFollowers(true)
      else if (id === "followed") setIsInFollowers(false)

      setIsHiddenFollowers(false)
    }

    className = className !== undefined ? className : "flex  text-sm flex-col  hover:text-white/40 cursor-pointer justify-center items-center"
    return (
      <div id={id} onClick={handlerClick} className={className}>
        {children}
      </div>
    )
  }


  const ButtonProfile = () => {

    if (isMe === undefined) return

    if (isMe) {
      return (
        <EditProfile user={user} />
      );
    }

    return (

      <ButtonFollowUnfollow
        followedUser={user.username}
        followers={user.followers}
        setNumberFollowers={setFollowers}
      />




    );
  };

  return (
    <section className="flex  lg:mb-5 p-2 lg:p-0  mt-24 w-full flex-col md:flex-row lg:flex-row h-auto gap-3 lg:gap-x-5 rounded-lg  max-w-[657px]">
      <FullScreenFollowersFollowed isInFollowers={isInFollowers} setIsInFollowers={setIsInFollowers} isHidden={isHiddenFollowers} setIsHidden={setIsHiddenFollowers} username={user.username} />
      <article className="flex gap-3 md:w-[60%] p-5 rounded-lg bg-[#1B2730]  items-start">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          
          <img
            className="h-full w-full object-cover"
            src={user.profile_pic as string}
            alt={`imagen de perfil de ${user.username}`}
          />
        </div>

        <article className="flex-col ">
          <div className="flex justify-start m-1 items-center gap-2">
            <h1 className="text-2xl font-bold gap-2 flex justify-center items-center ">{user.name}</h1>
            <span className="text-sm text-slate-400/85">
              @{user.username}
            </span>
            {Boolean(user.is_verified) && <IconRosetteDiscountCheckFilled size={30} color="#1DA1F3" />}
          </div>
          <section className="flex gap-3 flex-col ">
            <div className="flex gap-3 flex-col">
              <p className="text-base text-slate-400">{user.description}</p>
              <div className="flex gap-3 ">
                <DivProfile id="followers" className={undefined} >
                  <h2>Followers</h2>
                  <h2 id="followers">{followers}</h2>
                </DivProfile>
                <DivProfile className="flex px-1  hover:text-white/40 hover:cursor-pointer border-white/10 border-x-2 text-sm flex-col justify-center items-center" id="followed">
                  <h2>Followed</h2>
                  <h2>{user.followed}</h2>
                </DivProfile>
                <DivProfile id="posts" className={undefined}>
                  <h2>Posts</h2>
                  <h2>{user.posts}</h2>
                </DivProfile>
              </div>
              <div className="flex gap-3 w-full items-start">
                <ButtonProfile />
                <ProyectsUser isMe={isMe} username={user.username} />
              </div>
            </div>
          </section>
        </article>
      </article>
      <article className="bg-[#1B2730] p-1 lg:p-0  rounded-lg md:w-[40%]">
        <h1 className="text-center my-1 font-bold">Favorite languages</h1>
        <div className=" grid grid-cols-2 p-2 gap-2 w-full h-auto ">
          {languajes.map((lang) => {
            return (
              <div
                title="Lenguajes Favoritos"
                className="text-white cursor-default font-semibold lg:gap-x-2 gap-x-1 flex-row rounded-full py-2 px-2 bg-white/5 hover:scale-110 transition hover:bg-white/10 border border-white/10 flex justify-between items-center mg:gap-x-4 min-h-[46px] mg:py-3 mg:px-4 text-xs mg:text-base max-w-[200px] overflow-hidden"
                key={lang.id}
              >
                <h2 className="text-wrap truncate max-w-[100px]">
                  {lang.name}
                </h2>
                <ImgLanguaje lang={lang} />
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};
