"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
 
export default function Dashboard() {
  const { data: session } = useSession()
 
  if (!session?.user) {
    redirect("/")
  }

  if (session) {
    return <p>You are authorized to view this page!</p>
  }
 
}