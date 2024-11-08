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
    <main className="flex items-center w-svw justify-center h-svh">
      <section className="w-[50rem] hidden animate-fade-in-right h-svh lg:flex justify-center items-center">
        <img src="/destockpTransparent.png" alt="zdev app" />
      </section>
      <section className="flex animate-fade-in-left flex-col w-[50rem] h-svh justify-center items-center">
        <div className="flex lg:border-l-2 lg:border-0 border-2  lg:w-full w-[80%] md:w-[50%] rounded-lg lg:rounded-none justify-center gap-4 h-1/2 p-2  border-slate-400/20 flex-col items-center ">
          <img src="/logo.jpeg" className="size-16" alt="zdev app" />
          <h1 className="text-2xl font-bold">Bienvenido a zdev</h1>
          <p className="text-sm font-semibold text-slate-500/80">La red social de los desarrolladores</p>

          
            <Button onClick={() => signIn("github", { callbackUrl: "/handleSession" })}>Iniciar sesión con github <Github /></Button>
          
          
            <Button onClick={() => signIn("google", { callbackUrl: "/handleSession" })}>Iniciar sesión con google <Google /></Button>
          

        </div>

      </section>
    </main>
  );
}