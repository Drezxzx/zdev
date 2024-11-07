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
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("")
  const [initialState, setInitialState] = useState<boolean | undefined>();

  useEffect(() => {
    getUserByEmail(session?.user.email as string).then(res => {
      setUsername(res.username)
    })
  }, [session])

  useEffect(() => {
    if (username.length === 0) return
    setIsLoading(true);
    checkIfFollower({ username: username, followedUser })
      .then((data) => {
        setIsFollower(data.follower);
        setInitialState(data.follower);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [username, followedUser]);

  const [optimisticIsFollower, setOptimisticIsFollower] = useOptimistic(
    initialState as boolean,
    (prevIsFollower: boolean, newState: boolean) => newState
  );

  const handleFollow = async () => {
    setOptimisticIsFollower(true);
    setNumberFollowers((prev) => prev + 1);

    try {
      await followUser({ username: username, followedUser });
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
      await unFollowUser({ username: username, followedUser });
    } catch (error) {
      // Si hay error, revertir la acción optimista
      setOptimisticIsFollower(true);
      setNumberFollowers((prev) => prev + 1);
      console.error(error);
    }
  };

  return (
    <>
      {
        !isLoading && initialState !== undefined && <button
          onClick={optimisticIsFollower ? handleUnFollow : handleFollow}
          className="text-sm hover:scale-105 flex gap-1 justify-center items-center text-black font-semibold py-2 px-4 bg-[#FFF] rounded-full "
        >
          {optimisticIsFollower ? "Dejar de seguir" : "Seguir"}
        </button>
      }

    </>

  );
}
