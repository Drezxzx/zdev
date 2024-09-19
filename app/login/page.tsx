"use client"

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => signIn("github", {callbackUrl : "/handleSession"})}>Sign in</button>
    </div>
  );
}