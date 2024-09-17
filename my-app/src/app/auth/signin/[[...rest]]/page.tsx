'use client';
import React from 'react'
import {SignIn} from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
function page() {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    if(isSignedIn){
        router.push('/')
    }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='h-[100px]'></div>
      <SignIn/>
    </div>

  )
}


export default page