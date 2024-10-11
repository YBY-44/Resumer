import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
import { PersonalDetailPre } from './PersonalDetailPre';
import { SummaryPre } from './SummaryPre';
import { EducationPre } from './EducationPre';
import { SkillsPre } from './SkillPre';
import { ExperiencePre } from './ExperiencePre';

export const PreViewInfo = ({ ResumeInfo }: { ResumeInfo: ResumeInfo }) => {
  const [ResumeInfoNow, setResumeInfoNow] = useState<ResumeInfo>(ResumeInfo);
  useEffect(()=>{
   setResumeInfoNow(ResumeInfo)
  //  console.log(ResumeInfoNow)
  },[ResumeInfo])

  return (
    <div
      className={'shadow-lg h-full p-14 border-t-[20px]'}
      style={{ borderColor: ResumeInfoNow.themeColor }}
    >
      <PersonalDetailPre ResumeInfo={ResumeInfoNow} />
      <SummaryPre content={ResumeInfoNow.summery} />
      <ExperiencePre ResumeInfo={ResumeInfoNow} />
      <EducationPre ResumeInfo={ResumeInfoNow} />
      <SkillsPre ResumeInfo={ResumeInfoNow} />
    </div>
  );
};
