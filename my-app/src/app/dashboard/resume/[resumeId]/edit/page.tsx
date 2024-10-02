'use client';
import API from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResumeOverview, ResumeInfo } from '@/lib/types';
import { PersonalInfo } from '@/components_/PersonalInfo';
import { PreViewInfo } from '@/components_/PreviewInfo';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ResumeInfoDetail, FormTypePickDetail } from '@/forms/userInfoForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
function Page() {
  const router = useRouter();
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [MyResume, setResume] = useState<ResumeOverview>();
  const [loading, setLoading] = useState(true);

  const {
    register,
    watch,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormTypePickDetail>({
    resolver: zodResolver(ResumeInfoDetail),
    defaultValues:{

    }
  });
  // const [resumeInfo, setResumeInfo] = useState<ResumeInfo>(watch());
  useEffect(() => {
    API.GetOneResume(resumeId)
      .then((res: any) => {
        console.log(res.data.data[0]);
        setResume(res.data.data[0]);
        setLoading(false);
      })
      .catch(() => {
        console.log('1');
      });
  }, []);
  return (
    // <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 w-full'>
        <PersonalInfo register={register} errors={errors} submit={handleSubmit}/>
        <PreViewInfo ResumeInfo={watch()}/>
      </div>
    // </ResumeInfoContext.Provider>
  );
}
export default Page;
