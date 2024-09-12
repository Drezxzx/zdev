"use client"

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => signIn("github")}>Sign in with Github</button>
    </div>
  );
}