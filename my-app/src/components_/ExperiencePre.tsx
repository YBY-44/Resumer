import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
export const ExperiencePre = ({ ResumeInfo }: { ResumeInfo: ResumeInfo }) => {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: ResumeInfo?.themeColor }}
      >
        Personal Experience
      </h2>
      <hr
        className='border-[1.5px] mb-2'
        style={{ borderColor: ResumeInfo?.themeColor }}
      />
      {ResumeInfo?.experience?.exp?.map((item, index) => {
        return (
          <div key={index}>
            <h2
              className='text-sm font-bold'
              style={{ color: ResumeInfo?.themeColor }}
            >
              {item?.positionTitle}
            </h2>
            <h2 className='text-xs flex justify-between mb-2'>
              {item.companyName},{item.city},{item.state}
              <span>
                {item.startDate} -{' '}
                {item.isCurrentlyWork ? 'present' : item.endDate}
              </span>
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: item?.workSummary }}
              className='text-xs text-align'
            />
          </div>
        );
      })}
    </div>
  );
};
