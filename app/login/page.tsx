"use client"

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Hello</h1>
      <button onClick={() => signIn("github", {callbackUrl : "/handleSession"})}>Sign in github</button>
      <button onClick={() => signIn("google", {callbackUrl : "/handleSession"})}>Sign in google</button>
    </div>
  );
}