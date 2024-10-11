import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
export const PersonalDetailPre = ({
  ResumeInfo,
}: {
  ResumeInfo: ResumeInfo;
}) => {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div>
          <h2 className='font-bold text-xl text-center'>
            {ResumeInfo?.Detail?.firstName} {ResumeInfo?.Detail?.lastName}
          </h2>
          <h2 className='text-center text-sm font-medium'>
            {ResumeInfo?.Detail?.jobTitle}
          </h2>
          <h2
            className='text-center font-normal text-xs'
            style={{ color: ResumeInfo?.themeColor }}
          >
            {ResumeInfo?.Detail?.address}
          </h2>
        </div>
        <div className='flex flex-col gap-0'>
          <div className='flex justify-between my-1'>
            <h2
              className='font-normal text-sm'
              style={{ color: ResumeInfo?.themeColor }}
            >
              {ResumeInfo?.Detail?.phone}
            </h2>
            <h2
              className='font-normal text-sm'
              style={{ color: ResumeInfo?.themeColor }}
            >
              {ResumeInfo?.Detail?.email}
            </h2>
          </div>
          <div className='flex justify-between text-xs'>
            Linkin:
            <a
              href={ResumeInfo?.Detail?.linkinLink || ''}
              className='text-end text-xs hover:text-blue-400 duration-300'
            >
              {ResumeInfo?.Detail?.linkinLink}
            </a>
          </div>
          <div className='flex justify-between text-xs'>
            Portfolio:
            <a
              href={ResumeInfo?.Detail?.portfolioLink || ''}
              className='text-end text-xs hover:text-blue-400 duration-300'
            >
              {ResumeInfo?.Detail?.portfolioLink}
            </a>
          </div>
        </div>
      </div>
      <hr
        className='border-[1.5px] my-1'
        style={{ borderColor: ResumeInfo?.themeColor }}
      />
    </>
  );
};
