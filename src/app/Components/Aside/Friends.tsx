"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/utils/LoadingSpinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "@/app/utils/skeleton";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useUserInHeaderStore } from '@/store/userInHeader'
import { useUser } from '@clerk/nextjs';


type Friend = {
  friendName: string;
  conversationId: string;
};
interface FriendType {
  friendName: string;
  conversationId: string;
}

export default function Friends() {
  const { isSignedIn, user } = useUser();

  const changeUserInHeader = useUserInHeaderStore((state) => state.setUsername)

  const path = usePathname();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
          
  useEffect(() => {
    if (!isSignedIn) return;
    const username = user?.username!;

    setUserName(username);

    const handleGetFriends = async () => {
      try {
        const response = await axios.get(
          `https://pfac-back-end-production.up.railway.app/users/${userName}/friends`
        );        
        setFriends(response.data.friends);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleGetFriends();
  });
  
  const handleDellFriend = async (friendName: string, userName: string) => {
    try {
      await axios.post(`https://pfac-back-end-production.up.railway.app/users/Dellfriend`, {
        friendName,
        userName,
      });
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.friendName !== friendName)
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex pl-5 flex-col h-2/4 overflow-y-scroll">
      <span className="mb-4 text-gray-400 text-xl font-medium">Amigos</span>
      {friends?.length === 0 && !loading && (
        <div className="flex items-center">
          <span className="text-gray-400 text-base font-medium">
            Você não tem amigos
            </span>
            </div>
            )
            }
      {loading ? (
        <div className="flex items-center">
          <Skeleton rows={10} width="40" />
        </div>
      ) : (
        friends?.map((friend: FriendType, index) => (
            <Link
              href={
                path === "/chat"
                  ? `/chat/${friend.conversationId}`
                  : `/chat/${friend.conversationId}`
              }
              onClick={() => changeUserInHeader(friend.friendName)}
              className="flex pb-2 gap-20 items-center hover:p-1 hover:border hover:border-gray-500"
              key={index}
            >
            <div className="w-20">
              <div>
                {friend.friendName}
              </div>
            </div>

            <div
              className="cursor-pointer hover:text-2xl hover:animate-pulse text-red-800"
              onClick={() => handleDellFriend(friend.friendName, userName)}
            >
              <IoPersonRemoveSharp />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
