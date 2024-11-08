"use client"
import * as React from "react";
import type { SVGProps } from "react";

import { signIn } from "next-auth/react";
import { Github, Google } from "../libs/Icons";

export default function Login() {

  const Button = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {
    return (
      <button
        className="backdrop-blur-2xl hover:scale-105 transition-all hover:bg-slate-500/70 flex gap-2 px-4 py-2 justify-center items-center bg-slate-500/50 text-white font-semibold p-2 rounded-lg"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  

  return (
    <main className="flex items-center lg:flex-row flex-col-reverse lg:gap-0 w-svw justify-center gap-6 h-svh">
      <section className="lg:w-[50rem] w-full animate-fade-in-up  lg:animate-fade-in-right lg:h-svh h-auto lg:flex justify-center items-center">
        <img src="/destockpTransparent.png" alt="zdev app" />
      </section>
      <section className="flex lg:animate-fade-in-left animate-fade-in-down flex-col lg:w-[50rem] w-full lg:h-svh h-auto justify-center items-center">
        <div className="flex lg:border-l-2 lg:border-0  lg:w-full w-[80%] md:w-[50%]  lg:rounded-none justify-center gap-4 h-fit p-2  border-slate-400/20 flex-col items-center ">
          <img src="/logo.jpeg" className="size-16" alt="zdev app" />
          <h1 className="text-2xl font-bold">Bienvenido a zdev</h1>
          <p className="text-sm block lg:w-[68%] w-full md:w-[81%] font-semibold text-slate-500/80">ZDEV es la red social diseñada especialmente para programadores, donde el conocimiento y la creatividad tecnológica se encuentran.</p>

          
            <Button onClick={() => signIn("github", { callbackUrl: "/handleSession" })}>Iniciar sesión con github <Github /></Button>
          
          
            <Button onClick={() => signIn("google", { callbackUrl: "/handleSession" })}>Iniciar sesión con google <Google /></Button>
          

        </div>

      </section>
    </main>
  );
}