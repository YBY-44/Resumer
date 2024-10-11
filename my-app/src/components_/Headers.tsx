'use client';
import Image from 'next/image';
import { Button } from '../components/ui/button';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
export const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div id='np2' className='py-2 px-5 flex justify-between w-full items-center shadow-md bg-white min-w-[600px]'>
      <Link href='/'>
        <Image
          src='/ppt.png'
          alt='logo'
          className='w-[200px] h-[30px] object-cover scale-150 mt-1'
          width={500}
          height={500}
        />
      </Link>

      {isSignedIn ? (
        <div className='flex items-center gap-3'>
          <Link href='/dashboard' className=''>
            <Button className='font-bold text-sm bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'>
              DashBoard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href='/auth/signin' className=''>
          <Button className='font-bold text-sm'>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
