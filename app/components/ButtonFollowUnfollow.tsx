"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useOptimistic } from "react";
import { checkIfFollower, followUser, unFollowUser } from "../libs/user";

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
  const [isFollower, setIsFollower] = useState(false);
  const [initialState, setInitialState] = useState<boolean>(false);

  // Hook para estado optimista de los seguidores

  useEffect(() => {
    checkIfFollower({ username: session?.user?.username, followedUser })
      .then((data) => {
        setIsFollower(data.follower);
        setInitialState(data.follower);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [session, followedUser]);

  const [optimisticIsFollower, setOptimisticIsFollower] = useOptimistic(
    initialState,
    (prevIsFollower: boolean, newState: boolean) => newState 
  );

  const handleFollow = async () => {
    setOptimisticIsFollower(true); 
    setNumberFollowers((prev) => prev + 1);

    try {
      await followUser({ username: session?.user?.username, followedUser });
    } catch (error) {
      // Si hay error, revertir la acción optimista
      setOptimisticIsFollower(false);
      setNumberFollowers((prev) => prev - 1);
      console.error(error);
    }
  };

  const handleUnFollow = async () => {
    setOptimisticIsFollower(false); // Actualiza optimistamente a "no siguiendo"
    setNumberFollowers((prev) => prev - 1);

    try {
      await unFollowUser({ username: session?.user?.username, followedUser });
    } catch (error) {
      // Si hay error, revertir la acción optimista
      setOptimisticIsFollower(true);
      setNumberFollowers((prev) => prev + 1);
      console.error(error);
    }
  };

  return (
    <button
      onClick={optimisticIsFollower ? handleUnFollow : handleFollow}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {optimisticIsFollower ? "Dejar de seguir" : "Seguir"}
    </button>
  );
}
