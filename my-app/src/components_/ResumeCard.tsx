'use client';
import { Button } from '@/components/ui/button';
import { ResumeOverview } from '@/lib/types';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
export const ResumeCard = ({ cardInfo }: { cardInfo: ResumeOverview }) => {
  return (
    <Link href={'/dashboard/resume/'+cardInfo.documentId+'/edit'}>
      <div className='border border-blue-200 
      items-center flex 
      justify-center bg-slate-50 rounded-lg transition-all
      h-[280px] hover:scale-105 duration-300 shadow-primary hover:shadow-md'>
      <NotebookPen />
      </div>
      <h2 className='text-center my-2'>{cardInfo.title}</h2>
    </Link>
  );
};
