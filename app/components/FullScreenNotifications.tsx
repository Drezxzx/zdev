"use client";
import { use, useEffect, useState } from "react";
import { NotificationsType } from "../types/type";
import { useRouter } from "next/navigation";
import Portal from "./Portal";
import { IconHeartFilled, IconTrash, IconUserPlus, IconX } from "@tabler/icons-react";
import { Notifications } from "../libs/notifications";
import { useNotifications } from "../context/notifications";
import { toast } from "sonner";

export default function FullScreenNotifications({ userEmail, notifications, setNotifications }: { userEmail: string, notifications: NotificationsType[], setNotifications: React.Dispatch<React.SetStateAction<NotificationsType[]>> }) {
    const [page, setPage] = useState(1);
    const { isHiddenFullScreenNotifications, setIsHiddenFullScreenNotifications } = useNotifications()
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const elementsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        if (isHiddenFullScreenNotifications) return;
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        if (notifications.length < elementsPerPage) setHasMore(false);
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, [isHiddenFullScreenNotifications]);

    useEffect(() => {
        if (isHiddenFullScreenNotifications) return;
        if (page > 1) return;
        Notifications.updateNotifications({ pageNumber: 0, userEmail: userEmail })
    }, [isHiddenFullScreenNotifications]);

    const loadMoreNotifications = async () => {
        if (hasMore && !isLoadingMore) {
            setIsLoadingMore(true);
            const data = await Notifications.getAllNotifications({ userEmail, pageNumber: page });
            setPage((prevPage) => prevPage + 1);
            setIsLoadingMore(false);

            if (data.length < elementsPerPage) {
                setHasMore(false);
            }
            setNotifications((prevNotifications) => [...prevNotifications, ...data]);

        }
    }

    const handleDeleteAll = async () => {
        toast('Are you sure you want to delete all notifications?', {
            action: {
                label: 'YES',
                onClick: () => {
                    toast.promise(handleDeleteAll(), {
                        loading: 'Deleting...',
                        success: (data) => {
                            setNotifications([])
                            return `All notifications have been deleted successfully`;
                        },
                        error: 'There was an error deleting notifications',
                        style: {
                            background: "#1B2730",
                            color: "#C7D6E6",
                        },
                        duration: 2000,
                    });
                }
            },
            icon: "❗️",
            style: {
                background: "#1B2730",
                color: "#C7D6E6",
            },

        })
        const res = await Notifications.deleteNotifications({ userEmail: userEmail as string });
        if (res.success) {
            setNotifications([]);

        }
    }

    if (isHiddenFullScreenNotifications) return null


    return (
        <Portal>
            <section className="w-screen overflow-x-hidden flex-col  lg:px-5 px-2 gap-4 py-2 h-screen fixed top-0 left-0 z-[1000] flex items-center justify-center bg-transparent animate-blurred-fade-in animate-duration-faster backdrop-blur-md">
                <div className="w-full h-fit flex justify-center items-center flex-col gap-5">
                    <span className="absolute top-2 cursor-pointer right-2 hover:scale-105 transition-all" onClick={() => { setIsHiddenFullScreenNotifications(true) }}><IconX size={25} /></span>

                    <h1 className="text-2xl flex gap-x-24 justify-between  items-center font-bold text-center">
                        Notifications
                        {notifications.length > 1 && <span className="px-1 py-1 cursor-pointer rounded-lg flex gap-1 items-center text-sm bg-red-600" onClick={handleDeleteAll}>
                            <IconTrash size={20} color="#C7D6E6" />
                            clear
                        </span>}
                    </h1>
                    <ul id="notifications" className="flex relative bg-containers-rounded md:w-1/2 max-h-[22rem] h-[22rem] w-full  lg:max-w-1/2 lg:w-[30%] border border-slate-400/60 rounded-lg flex-col gap-4 p-2 overflow-y-scroll  items-center">
                        {notifications.length > 0 && notifications.map((notification, i) => (
                            <CreateLiNotification setIsHiddenFullScreenNotifications={setIsHiddenFullScreenNotifications} key={i} i={i} notificationUnique={notification} router={router} />
                        ))}

                        {hasMore && <button className="w-full disabled:saturate-50" disabled={isLoadingMore} onClick={loadMoreNotifications}>{!isLoadingMore ? "View more" : "Loading..."}</button>}

                        {notifications.length === 0 && <span className="text-center text-sm text-slate-400/90 mt-10 font-semibold">There are no notifications</span>}
                    </ul>

                </div>

            </section>
        </Portal>
    );
}

function CreateLiNotification({ notificationUnique, i, router, setIsHiddenFullScreenNotifications }: { notificationUnique: NotificationsType, i: number, router: any, setIsHiddenFullScreenNotifications: (isHiddenFullScreenNotifications: boolean) => void }) {
    const Li = ({ children, route }: { children: React.ReactNode, route: string }) => {
        return (
            <li key={i} className={`flex ${Boolean(notificationUnique.viewed) ? "" : "bg-red-500/60"} p-1 rounded-lg gap-2 font-base font-semibold items-center justify-between w-full`}>
                <h1 className="text-sm font-semibold flex gap-2 items-center justify-start">{children}</h1>
                <button className="text-sm py-1 px-4 rounded-full bg-white text-black font-semibold" onClick={() => { router.push(route); setIsHiddenFullScreenNotifications(true) }}>View</button>
            </li>
        );
    };

    if (notificationUnique.idType === 2) {
        return (
            <Li route={`/home/profile/${notificationUnique.idProfile}`}>
                <IconUserPlus size={20} color="green" />
                {notificationUnique.notification}
            </Li>
        );
    } else if (notificationUnique.idType === 1) {
        return (
            <Li route={`/home/detail/${notificationUnique.idPost}`}>
                <IconHeartFilled size={20} color="red" />
                {notificationUnique.notification}
            </Li>
        );
    }

    return null;
}
