'use client';
import React from 'react'
import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
function Page() {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    if(isSignedIn){
        router.push('/')
    }
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='h-[100px]'></div>
      <SignUp/>
    </div>

  )
}


export default Page