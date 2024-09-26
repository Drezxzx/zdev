"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
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
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    
    checkIfFollower({ username: session?.user?.username, followedUser })
      .then((data) => {
        console.log(data);
        setIsFollower(data.follower);
        setInitialState(data.follower);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUnFollow = async () => {
    console.log(isFollower);
    setIsFollower(!isFollower);
    let initialFollowers = followers;
    setNumberFollowers(initialFollowers - 1);
    timer && clearTimeout(timer);

    let timerPetition = setTimeout(() => {
      {
        unFollowUser({ username: session?.user?.username, followedUser })
          .then((data) => {
            if (data.success) {
              console.log(data);
              setIsFollower(false)
              setInitialState(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setIsFollower(initialState);
            setNumberFollowers(initialFollowers);
          });
      }
    }, 3000);
    console.log(isFollower);
    setTimer(timerPetition);
  };

  const handleFollow = async () => {
    console.log(isFollower);
    let initialFollowers = followers;
    setNumberFollowers(initialFollowers + 1);
    setIsFollower(!isFollower);

    timer && clearTimeout(timer);

    let timerPetition = setTimeout(() => {
      
      {
        followUser({ username: session?.user?.username, followedUser })
          .then((data) => {
            if (data.success) {
              setIsFollower(true)
              setInitialState(true);
            }
          })
          .catch((error) => {
            console.error(error);
            setNumberFollowers(initialFollowers);
            setIsFollower(initialState);
          });
      }
      console.log(isFollower);
    }, 3000);
  
    setTimer(timerPetition);
  };

  

  
  return (
    <button
      onClick={isFollower ? handleUnFollow : handleFollow}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isFollower ? "Dejar de seguir" : "Seguir"}
    </button>
  );
}
