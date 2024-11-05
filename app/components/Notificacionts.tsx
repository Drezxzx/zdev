// components/NotificationListener.tsx
import { useEffect, useState } from "react";

export default function NotificationListener() {
   const [messages, setMessages] = useState<string[]>([]);

   useEffect(() => {
       const eventSource = new EventSource("/api/notifications");

       eventSource.onmessage = (event) => {
           setMessages((prev) => [...prev, event.data]);
       };

       eventSource.onerror = () => {
           console.error("Error en la conexión SSE");
           eventSource.close();
       };

       return () => {
           eventSource.close();
       };
   }, []);

   return (
       <div className="text-black">
           <h2>Notificaciones en Tiempo Real:</h2>
           <ul>
               {messages.map((message, index) => (
                   <li key={index}>{message}</li>
               ))}
           </ul>
       </div>
   );
}
