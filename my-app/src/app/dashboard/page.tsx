'use client';
import React, { use, useEffect, useState } from 'react';
import { AddResume } from '@/components_/AddResume';
import API from '@/lib/api';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ResumeOverview } from '@/lib/types';
import { ResumeCard } from '@/components_/ResumeCard';
import { LoaderPinwheel } from 'lucide-react';
function Page() {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();
  const [allResume, setAllResume] = useState<ResumeOverview[]>([]);
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/auth/signin');
    }
    if (user) {
      API.GetMyResume(user.emailAddresses[0].emailAddress)
        .then((res: any) => {
          setAllResume(res.data.data);
          setloading(false);
          console.log(res.data.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [isLoaded, isSignedIn]);

  const client = 0;
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating AI resume to your next job role</p>
      {loading ? (
          <div className='flex flex-col items-center justify-center mt-5 w-full gap-2'>
            <LoaderPinwheel className='h-10 w-10 animate-spin' />
            <h2 className='text-center'>All your resumes are comming...</h2>
          </div>
        ) : null}
      <div className='w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
        {allResume.map((item: ResumeOverview) => {
          return (
            <div key={item.resumeId}>
              <ResumeCard cardInfo={item} />
            </div>
          );
        })}
        <AddResume/>
      </div>
    </div>
  );
}

export default Page;
