'use client';
import { Input } from '@/components/ui/input';
import { MyInput } from './MyInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Brain } from 'lucide-react';
import React from 'react';
import API from '@/lib/api';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { chatSession } from '../../service/google';
import { describe } from 'node:test';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
export const SummaryFormComponment = ({
  setValue,
  setActiveFromIndex,
  SummaryInfo,
  jobTitle,
}: {
  setValue: (
    name:
      | 'Detail'
      | 'themeColor'
      | 'summery'
      | 'experience'
      | 'education'
      | 'skills',
    value: any
  ) => void;
  setActiveFromIndex: (index: number) => void;
  SummaryInfo: string;
  jobTitle: string;
}) => {
  const send_txt =
    'Job Title: {jobTitle}, Depends on job title give me summery for my resume within 5-6 lines in JSON format with field experince Level and Summery with Experience level for Fresher, Mid-Level, Experienced. The format must in this way. {Jobtitle:string, Summaries:{    Experienced: string, Fresher: string, Mid-Level: string}}, with the following KEYWORDS:';
  const { toast } = useToast();
  const [isGenerate,setIsGenerate] =useState(false);
  const [summary, setSummary] = useState(SummaryInfo);
  const [level, setLevel] = useState<
    'Fresher' | 'Experienced' | 'Mid-Level' | null
  >('Fresher');
  const [AIlist, setAIlist] = useState<{
    Experienced: string;
    Fresher: string;
    'Mid-Level': string;
  }>({
    Experienced: '',
    Fresher: '',
    'Mid-Level': '',
  });
  const [loading, setLoading] = useState(false);
  const [generating, setgenerating] = useState(false);
  const [describe, setdescribe] = useState('');
  const path = usePathname();
  const resumeId = path.split('/')[3];
  useEffect(() => {
    if (AIlist && level && isGenerate) {
      try {
        setSummary(AIlist[level]);
        setValue('summery',AIlist[level]);
      } catch {
        console.log(AIlist);
      }
    }
  }, [AIlist, level]);
  const generateSummary = async () => {
    setgenerating(true);
    const PROMPT = send_txt.replace('{jobTitle}', jobTitle || '') + describe;
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const res = JSON.parse(result.response.text());
      console.log(res);
      console.log(res.Summaries);
      setAIlist(res.Summaries);
      setIsGenerate(true);
    } catch {
      console.log(result.response.text());
    }
    setgenerating(false);
  };
  const submitSummary = () => {
    if (!summary) {
      return;
    }
    setLoading(true);
    API.UpdateSummaryResume(resumeId, summary)
      .then((res: any) => {
        toast({
          title: 'Summary has been saved.',
          description: new Date().toString(),
        });
        setLoading(false);
        setActiveFromIndex(3);
      })
      .catch((error: any) => {
        toast({
          title: 'We meet some Error, try again.',
          description: error,
        });
        setLoading(false);
      });
  };
  return (
    <form className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-6'>
      <h2 className='font-bold text-md'>Summary</h2>
      <h2 className='text-md'>Now, talk more about your self.</h2>
      <div className='my-3 mb-2 flex items-end justify-between '>
        <p className='text-sm text-gray-500'>Please provide some key words.</p>
        <Button
          type='button'
          size={'sm'}
          className='cursor-pointer border-primary hover:border-purple-700 font-bold text-primary border-2 hover:bg-white hover:text-purple-700 duration-300'
          variant={'outline'}
          onClick={generateSummary}
        >
          {generating ? (
            <Loader className='h-5 w-5 animate-spin' />
          ) : (
            <p className='flex'>
              <Brain className='w-5 h-5 mr-2' />
              Generate from AI
            </p>
          )}
        </Button>
      </div>
      <div className='h-[400px] flex-col gap-2 flex'>
        <Textarea
          className='text-md resize-none min-h-[100px]'
          placeholder = 'Please provide key words, such as the level, skills, and other relevant information.'
          value={describe}
          onChange={(e) => {
            setdescribe(e.target.value);
          }}
        ></Textarea>
        <h2 className='mt-2'>Your Summary</h2>
        <Textarea
          className='text-md h-full'
          placeholder='Here is your summary.'
          value={summary}
          onChange={(e) => {
            setValue('summery', e.target.value);
            setSummary(e.target.value);
          }}
        ></Textarea>
      </div>
      {isGenerate && <div className='flex flex-col gap-3 py-2 px-2 sm:flex-row'>
        <h2 className='text-xs max-w-[300px] text-gray-500'>
          Which of the following levels best suits you?
        </h2>
        <div className='flex gap-3'>
          <Button
            type='button'
            className={
              'pt-[2px] bg-green-100 border-b-4 border-green-100 rounded-none text-green-800 py-0 w-[80px] hover:bg-green-300 hover:border-green-400 duration-300 ' +
              (level === 'Fresher' && ' border-green-400')
            }
            size={'sm'}
            onClick={() => {
              setLevel('Fresher');
            }}
          >
            Fresher
          </Button>
          <Button
            type='button'
            className={
              'pt-[2px] bg-blue-100 border-b-4 border-blue-100 text-blue-800 rounded-none w-[80px] hover:bg-blue-300 hover:border-blue-400 duration-300 ' +
              (level === 'Mid-Level' && ' border-blue-400')
            }
            size={'sm'}
            onClick={() => {
              setLevel('Mid-Level');
            }}
          >
            Mid-level
          </Button>
          <Button
            type='button'
            className={
              'pt-[2px] bg-red-100 text-red-800 border-red-100 border-b-4 rounded-none w-[80px] hover:bg-red-300 hover:border-red-400 duration-300 ' +
              (level === 'Experienced' && ' border-red-400')
            }
            size={'sm'}
            onClick={() => {
              setLevel('Experienced');
            }}
          >
            Senior
          </Button>
        </div>
      </div>}
      <div className='my-3 mb-2 flex items-center justify-between '>
        {summary === '' ? (
          <p className='text-md text-red-800'>Try to write something...</p>
        ) : (
          <p></p>
        )}
        <Button
          type='button'
          className='w-[70px]'
          size={'sm'}
          onClick={submitSummary}
        >
          {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};
