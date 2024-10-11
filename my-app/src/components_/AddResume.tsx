'use client';
import { PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ResumeOverview } from '@/lib/types';
import API from '@/lib/api';
export const AddResume = () => {
  const { toast } = useToast()
  const [creating,setCreating] = useState(false);
  const { user,isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [dialogOpened, isOpened] = useState(false);
  const [resumeTitle, setTitle] = useState('');
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/auth/signin');
    }
  }, [isSignedIn]);

  const createResume = () => {
    setCreating(true);
    const uuid = uuidv4();
    const data = {
      resumeId: uuid,
      title: resumeTitle,
      email: user?.emailAddresses[0].emailAddress || '',
      name: user?.fullName || '',
    };
    if (data.email && data.name) {
      API.CreateNewResume(data)
        .then((res: any) => {
          console.log(res?.data?.data);
          setCreating(false);
          isOpened(false);
          toast({
            title: "Resume created",
            description: "At the " + (new Date()).toString(),
          })
          router.push('dashboard/resume/'+res.data.data.documentId+'/edit');
        })
        .catch((error: any) => {
          toast({
            title: "We meet some Error.",
            description: error?.error,
            variant: "destructive",
          })
          console.log(error);
          setCreating(false);
        });
    } else {
      router.push('/auth/signin');
      setCreating(false);
    }
    console.log(data);
  };
  return (
    <div>
      <div
        className='cursor-pointer p-14 py-24 border border-blue-400 items-center flex justify-center bg-slate-50 rounded-lg h-[280px] hover:scale-105 duration-300'
        onClick={() => isOpened(true)}
      >
        <PlusSquare className='cursor-pointer h-6 w-6' />
      </div>
      <Dialog open={dialogOpened}>
        <DialogContent className='bg-white rounded-md'>
          <DialogHeader>
            <DialogTitle>Resume Creation</DialogTitle>
            <DialogDescription>
              <label>Add an title for your new resume.</label>
              <Input
                value={resumeTitle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Ex.Full Stack Developer'
              />
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex justify-end gap-5'>
            <Button
              variant='outline'
              className='font-bold'
              onClick={() => isOpened(false)}
            >
              Cancel
            </Button>
            <Button
              className='font-bold w-20'
              onClick={() => {
                createResume()
              }}
              disabled={!resumeTitle || creating}
            >
              {creating?<LoaderCircle className='h-5 w-5 animate-spin'/>:'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
