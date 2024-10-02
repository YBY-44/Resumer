'use client';
import React, { useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
function Page() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='h-[100px]'></div>
      <SignIn />
    </div>
  );
}

export default Page;
