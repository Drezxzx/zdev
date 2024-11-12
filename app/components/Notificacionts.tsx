// components/NotificationComponent.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Notifications } from "../libs/notifications";
import FullScreenNotifications from "./FullScreenNotifications";
import { NotificationsType } from "../types/type";
import { useNotifications } from "../context/notifications";

interface Notification {
  message: string;
}

interface NotificationComponentProps {
  userId: string;
}

const NotificationComponentToast: React.FC<NotificationComponentProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const {isHiddenFullScreenNotifications, setIsHiddenFullScreenNotifications, setThereAreNewNotifications} = useNotifications()
  
  useEffect(() => {
    if (!userId) return; // Si no hay userId, no hacer nada

    async function getNotifications() {
      try {
        const allNotifications = await Notifications.getAllNotifications({ userEmail: userId, pageNumber: 0 });
        const data = await Notifications.getNotifications({ userEmail: userId, pageNumber: 0 });
        setNotifications(allNotifications);
        if(data.length > 0) {
          setThereAreNewNotifications(true)
          toast.message("Tienes una nueva notificación", {
            description: data[0].message,
            action : <button className="text-sm py-2 px-4 rounded-full bg-white text-black font-semibold"  onClick={() => {setIsHiddenFullScreenNotifications(false); setThereAreNewNotifications(false)} }>Ver</button>,
            icon: "📣",
            style: {
              background: "#1B2730",
              color: "#C7D6E6",
            },
          })
        }
        //setMessage(data.message);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    }
    getNotifications();
    
  }, [userId]);

  return (
    notifications &&
    <FullScreenNotifications userEmail={userId} setNotifications={setNotifications} notifications={notifications} />
  );
};

export default NotificationComponentToast;
