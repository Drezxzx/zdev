// pages/chat.tsx
"use client"
import Chat from "@/app/components/Chat";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ChatPage() {
    const { data: session } = useSession()
    const [userId, setUserId] = useState("")

    useEffect(() => {
        if (session) {
            if (!session.user) {
                return
            }
            const userId = session.user.email as string
            setUserId(userId)
        }
    }, [session])

    const recipientId = "Drexzxzx"; 

    return (
        <main className="w-screen h-auto flex flex-col items-center justify-center">
            <h1>Chat uno a uno</h1>
           {userId && <Chat emial={userId} recipientEmail={recipientId} />}
        </main>
    );
}
