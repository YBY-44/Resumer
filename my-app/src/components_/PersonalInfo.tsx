'use client';
import Link from 'next/link';
import { ThemeColor } from './ThemeColor';
import { Input } from '@/components/ui/input';
import { MyInput } from './MyInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid, House } from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';
import { PersonalDetailFormComponment } from './PersonalDetailFormComponment';
import { ResumeInfo } from '@/lib/types';
import { ExperienceFormComponment } from './ExperienceFormComponment';
import { EducationFormComponment } from './EducationFormComponment';
import { SkillsFormComponment } from './SkillsFormComponment';
import { SummaryFormComponment } from './SummaryFormComponment';
import { useRouter, usePathname } from 'next/navigation';
import { Navigate } from 'react-router-dom';
import API from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import {Loader} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const PersonalInfo = ({
  setValue,
  watcher,
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
  watcher: ResumeInfo;
}) => {
  const { toast } = useToast();
  const path = usePathname();
  const router = useRouter();
  const resumeId = path.split('/')[3];
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [colorChanging, setColorChanging] = useState(false);
  const nextPage = () => {
    setActiveFormIndex(activeFormIndex + 1);
  };
  const presPage = () => {
    setActiveFormIndex(activeFormIndex - 1);
  };

  const { Detail, themeColor, summery, experience, education, skills } =
    watcher;
  const changeColor = () => {
    setColorChanging(true);
    API.UpdateColorResume(resumeId, themeColor)
      .then((res: any) => {
        toast({
          title: 'ThemeColor has been saved.',
          description: new Date().toString(),
        });
        setColorChanging(false);
      })
      .catch((error: any) => {
        console.error(error);
        setColorChanging(false);
      });
  };
  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push(`/dashboard/resume/${resumeId}/view`);
    }
  }, [activeFormIndex, router, resumeId]);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Link href='/dashboard'>
            <Button variant={'outline'} size='sm' className='flex gap-2'>
              <House />
              Home
            </Button>
          </Link>
          <ThemeColor setValue={setValue} />
          <Button
            variant={'outline'}
            size='sm'
            className='flex gap-2 w-[100px]'
            onClick={changeColor}
          >
            {colorChanging?<Loader className='h-5 w-5 animate-spin'/>:'Save Color'}
          </Button>
        </div>

        <div className='flex gap-4'>
          <Button
            size='sm'
            className='flex gap-1 text-sm w-[80px]'
            disabled={activeFormIndex < 2}
            onClick={() => {
              presPage();
            }}
          >
            Back
            <ArrowLeft />
          </Button>

          <Button
            size='sm'
            className='flex gap-1 text-sm w-[80px]'
            disabled={activeFormIndex > 5}
            onClick={() => {
              nextPage();
            }}
          >
            <ArrowRight />
            {activeFormIndex == 5 ? 'View' : 'Next'}
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 && (
        <PersonalDetailFormComponment
          DetailInfo={Detail}
          setValue={setValue}
          setActiveFromIndex={setActiveFormIndex}
        />
      )}
      {activeFormIndex === 2 && (
        <SummaryFormComponment
          jobTitle={Detail.jobTitle}
          SummaryInfo={summery}
          setValue={setValue}
          setActiveFromIndex={setActiveFormIndex}
        />
      )}
      {activeFormIndex === 3 && (
        <ExperienceFormComponment
          ExperienceInfo={experience.exp}
          setValue={setValue}
          setActiveFromIndex={setActiveFormIndex}
        />
      )}
      {activeFormIndex === 4 && (
        <EducationFormComponment
          EducationInfo={education.edu}
          setValue={setValue}
          setActiveFromIndex={setActiveFormIndex}
        />
      )}
      {activeFormIndex === 5 && (
        <SkillsFormComponment
          SkillInfo={skills.skl}
          setValue={setValue}
          setActiveFromIndex={setActiveFormIndex}
        />
      )}
    </div>
  );
};
