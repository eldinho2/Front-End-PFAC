'use client'

import React, { useEffect, useState } from "react";
import Skeleton from "@/app/utils/skeleton";
import { useUser } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import axios from "axios";


export default function UserName() {
  const { user } = useUser();
  console.log(user?.username);
  console.log(user?.emailAddresses[0].emailAddress);

  const username = user?.username;
  const email = user?.emailAddresses[0].emailAddress;

  const putUser = async () => {
    try {
    await axios.post(`https://pfac-back-end-production.up.railway.app/auth/signup`, {
      userName: username,
      email: email,
      password: '12345678'
    })
    } catch (error) {
      console.error(error);
      console.log(error);
      
    }
  }

  useEffect(() => {
    putUser();
  });


  return (
    <div className="flex justify-center items-center text-white">
    
      {user?.username ? (
            <div className="flex justify-center items-center gap-5">
              <UserButton afterSignOutUrl="/"/>
              {user?.username}
            </div>
      ) : (
        <Skeleton rows={1} width="20" />
      )}
    </div>
  );
}
