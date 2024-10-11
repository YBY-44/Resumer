'use client';
import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
import { PersonalDetailPre } from './PersonalDetailPre';

export const SummaryPre = ({ content }: { content: string }) => {
  return (
    <p className={'text-xs text-justify'}>
      {content}
    </p>
  );
};
