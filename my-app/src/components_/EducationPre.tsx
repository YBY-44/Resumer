import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfo } from '@/lib/types';
export const EducationPre = ({
  ResumeInfo,
}: {
  ResumeInfo: ResumeInfo;
}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
      style={{color:ResumeInfo?.themeColor}}>
        Education
      </h2>
      <hr className='border-[1.5px] mb-2' style={{borderColor:ResumeInfo?.themeColor}}>
      </hr>
      {ResumeInfo.education?.edu?.map((item,index)=>{
       return (
       <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
          style={{color:ResumeInfo.themeColor}}>{item.universityName}</h2>
          <h2 className='text-xs flex justify-between'>{item.degree}
          <span>{item?.startDate} - {item?.endDate}</span>
          </h2>
          <p className="text-xs my-2">
            {item.describtion}
          </p>
       </div>)
      })}
    </div>
  );
};
