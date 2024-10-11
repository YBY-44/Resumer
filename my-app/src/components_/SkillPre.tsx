import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
export const SkillsPre = ({ ResumeInfo }: { ResumeInfo: ResumeInfo }) => {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: ResumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr
        className='border-[1.5px] mb-2'
        style={{ borderColor: ResumeInfo?.themeColor }}
      />
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-8'>
        {ResumeInfo?.skills?.skl?.map((item, index) => {
          return (
            <div
              key={index}
              className={
                'grid grid-cols-5 gap-2 items-center '
              }
            >
              <h2 className='text-xs text-start col-span-2'>{item.name}</h2>
              <div className='h-2 bg-gray-200 col-span-2 justify-end'>
                <div
                  className='h-2'
                  style={{
                    backgroundColor: ResumeInfo?.themeColor,
                    width: item?.rating * 20 + '%',
                  }}
                />
              </div>
              <h2 className='text-xs text-end col-span-1'>
                {item.rating * 20 + '%'}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};
