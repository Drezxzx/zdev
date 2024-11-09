"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useOptimistic } from "react";
import { checkIfFollower, followUser, getUserByEmail, unFollowUser } from "../libs/user";

export default function ButtonFollowUnfollow({
  followedUser,
  followers,
  setNumberFollowers
}: {
  followedUser: string;
  followers: number;
  setNumberFollowers: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data: session } = useSession();
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByEmail(session?.user.email as string);
        setUsername(user.username);

        if (user.username) {  
          const followerData = await checkIfFollower({ username: user.username, followedUser });
          setIsFollower(followerData.follower);
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    if (session?.user.email) fetchUserData();
  }, [session, followedUser]);

  const [optimisticIsFollower, setOptimisticIsFollower] = useOptimistic(
    isFollower,
    (prevIsFollower: boolean, newState: boolean) => newState
  );

  const handleFollow = async () => {
    setOptimisticIsFollower(true);
    setNumberFollowers((prev) => prev + 1);

    try {
      await followUser({ username, followedUser });
    } catch (error) {
      setOptimisticIsFollower(false);
      setNumberFollowers((prev) => prev - 1);
      console.error("Error al seguir al usuario:", error);
    }
  };

  const handleUnFollow = async () => {
    setOptimisticIsFollower(false);
    setNumberFollowers((prev) => prev - 1);

    try {
      await unFollowUser({ username, followedUser });
    } catch (error) {
      setOptimisticIsFollower(true);
      setNumberFollowers((prev) => prev + 1);
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };

  return (
    <>
      <button
        onClick={optimisticIsFollower ? handleUnFollow : handleFollow}
        disabled={!isLoaded}
        className="text-sm hover:scale-105 flex gap-1 justify-center items-center text-black font-semibold py-2 px-4 bg-[#FFF] rounded-full"
      >
        {optimisticIsFollower ? "Unfollow" : "Follow"}
      </button>
    </>
  );
}
