'use client';
import { Button } from '@/components/ui/button';
import {Loader} from 'lucide-react';
import { useState } from 'react';
import { ResumeOverview } from '@/lib/types';
import { NotebookPen, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import API from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
export const ResumeCard = ({ cardInfo }: { cardInfo: ResumeOverview }) => {
  const { toast } = useToast();
  const router = useRouter();
  const HandleGoseUrl = (urls: string) => {
    router.push(urls);
  };
  const [deleting, setdeleting] = useState(false);
  const HandleDelete = (id: string) => {
    setdeleting(true);
    API.DeleteResume(id)
      .then(() => {
        toast({
          title: 'Resume has been Deleted.',
          description: new Date().toString(),
        });
        setdeleting(false);
        setOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 2000 毫秒 = 2 秒
      })
      .catch((error: any) => {
        console.error(error);
        toast({
          title: 'We meet some Error, try again.',
          description: new Date().toString(),
          variant: 'destructive',
        });
        setdeleting(false);
      });
  };
  const [open, setOpen] = useState(false);
  return (
    <div className='rounded-lg hover:scale-105 duration-300 hover:shadow-md shadow-primary border border-t-[5px]'
    style={{borderTopColor:cardInfo.themeColor}}>
      <Link href={'/dashboard/resume/' + cardInfo.documentId + '/edit'}>
        <div
          className='
      bg-gradient-to-b
      from-blue-50 via-blue-100 to-blue-200
      items-center flex 
      justify-center transition-all
      h-[280px] duration-300 '
        >
          {/* <NotebookPen width={80} height={80}/> */}
          <Image src='/resume.png' alt='edit' width={80} height={80} />
        </div>
      </Link>
      <div
        className='p-3 flex justify-between text-white rounded-b-lg'
        style={{ backgroundColor: cardInfo?.themeColor || '#bb23cc' }}
      >
        <h2 className='text-sm'>{cardInfo.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                HandleGoseUrl(
                  '/dashboard/resume/' + cardInfo.documentId + '/edit'
                )
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                HandleGoseUrl(
                  '/dashboard/resume/' + cardInfo.documentId + '/view'
                )
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                HandleGoseUrl(
                  '/dashboard/resume/' + cardInfo.documentId + '/view'
                )
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={open}>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the resume you
                selected and remove this resume from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className='w-[120px]' onClick={() => HandleDelete(cardInfo.documentId)}>
                {deleting ? <Loader className='h-5 w-5 animate-spin'/>:'Confirm Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
