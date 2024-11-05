import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
 const session = await getServerSession();


if (!session) {
  redirect("/login");
}else{
  redirect("/home")
}

  return (
    <>

    </>

  );
}
