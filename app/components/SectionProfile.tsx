"use client";
import { DataLanguage, DataUser } from "../types/type";
import { languajes as arrlanguages } from "../libs/languajes";
import ButtonFollowUnfollow from "./ButtonFollowUnfollow";
import { useState } from "react";

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
  
  console.log(isMe);
  
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

  const ButtonProfile = () => {
    if (isMe) {
      return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Edit profile
        </button>
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
    <section className="flex mb-5 w-full h-auto gap-x-5 rounded-lg  max-w-screen-md">
      <article className="flex gap-3 w-[60%] p-5 rounded-lg bg-[#1B2730]  items-start">
        <img
          className="size-24 ml-2 rounded-full"
          src={user.profile_pic as string}
          alt={`imagen de perfil de ${user.username}`}
        />
        <article className="flex-col ">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <span className="text-base text-slate-400/85">
              @{user.username}
            </span>
          </div>
          <section className="flex gap-3 flex-col ">
            <div className="flex gap-3 flex-col">
              <div className="flex gap-3 ">
                <div className="flex gap-3 flex-col items-start">
                  <h2>Seguidores</h2>
                  <h2 id="followers">{followers}</h2>
                </div>
                <div className="flex gap-3 flex-col items-start">
                  <h2>Seguidos</h2>
                  <h2>{user.followed}</h2>
                </div>
              </div>
              <ButtonProfile />
            </div>
          </section>
        </article>
      </article>
      <article className="bg-[#1B2730]  rounded-lg w-[40%]">
      <h1 className="text-center my-1 font-bold">Lenguajes Favoritos</h1>
        <div className=" grid grid-cols-2 p-2 gap-2 w-full h-auto ">
          {languajes.map((lang) => {
            return (
              <div
                title="Lenguajes Favoritos"
                className="text-white cursor-default font-semibold lg:gap-x-2 gap-x-1 flex-row rounded-full py-2 px-2 bg-white/5 hover:scale-110 transition hover:bg-white/10 border border-white/10 flex justify-between items-center mg:gap-x-4 mg:py-3 mg:px-4 text-xs mg:text-base max-w-[200px] overflow-hidden"
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
