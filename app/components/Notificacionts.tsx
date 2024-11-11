// components/NotificationComponent.tsx

"use client";

import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';
import { toast } from "sonner";

interface Notification {
  message: string;
}

interface NotificationComponentProps {
  userId: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ userId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!userId) return; // Si no hay userId, no hacer nada

    const eventSource = new EventSource(`/api/notifications?userId=${userId}`);

    // Escuchar por mensajes enviados desde el servidor
    eventSource.onmessage = (event) => {
      const data: Notification = JSON.parse(event.data);
      const notificacion = JSON.parse(data.message);
      console.log(notificacion);
      if(notificacion.type == "like"){
        toast.message(notificacion.message, {
          action : <button className="text-xs py-2 px-4 rounded-full bg-white text-black font-semibold"  onClick={() => {router.push(`/home/detail/${notificacion.id_post}`)}}>Ver</button>,
          icon: "📣",
          style: {
            background: "#1B2730",
            color: "#C7D6E6",
          },
        }) 
      }else if(notificacion.type == "follow"){
        toast.message("Nuevo seguidor", {
          description: notificacion.message,
          action : <button className="text-sm py-2 px-4 rounded-full bg-white text-black font-semibold"  onClick={() => {router.push(`/profile/${notificacion.id_follower}`)}}>Ver</button>,
          icon: "📣",
          style: {
            background: "#1B2730",
            color: "#C7D6E6",
          },
        })

      }
      setMessage(data.message);
      
    };

    // Manejar el cierre de la conexión
    eventSource.onerror = () => {
      console.error("Error en la conexión SSE");
      eventSource.close();
    };

    // Limpiar el evento al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, [userId]);

  return (
    null
  );
};

export default NotificationComponent;
