import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';

export const PreViewInfo = ({ResumeInfo}:{ResumeInfo:ResumeInfo}) => {


  return (
  <div className={'shadow-lg h-full p-14 border-t-[20px]'}
  style={{ borderColor: ResumeInfo.themeColor }}>
    <h2>{ResumeInfo?.firstName}</h2>
    <h2>{ResumeInfo?.lastName}</h2>
  </div>);
};
