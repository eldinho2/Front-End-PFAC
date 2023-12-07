'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


function Page() {

  useRouter().push('/chat');
  
  return (
    <div className='h-screen w-screen bg-gray-bg'></div>
  )
}

export default Page