'use client';
import API from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResumeOverview, ResumeInfo } from '@/lib/types';
import { PersonalInfo } from '@/components_/PersonalInfo';
import { PreViewInfo } from '@/components_/PreviewInfo';
import { ResumeInfoDetail, FormTypePickDetail } from '@/forms/userInfoForm';
import { Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
function Page() {
  const router = useRouter();
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [MyResume, setResume] = useState<ResumeInfo>();
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
    defaultValues: {
      Detail: {
        firstName: '',
        lastName: '',
        address: '',
        jobTitle: '',
        email: '',
        phone: '',
        linkinLink: '',
        portfolioLink: '',
      },
      themeColor: '',
      summery: '',
      experience: { exp: [] },
      education: { edu: [] },
      skills: { skl: [] },
    },
  });
  useEffect(() => {
    API.GetOneResume(resumeId)
      .then((res: any) => {
        const all = res.data.data[0];
        console.log(res.data.data[0]);
        setLoading(false);
        const resumeData = {
          Detail: {
            firstName: all?.FirstName || '',
            lastName: all?.LastName || '',
            address: all?.Address || '',
            jobTitle: all?.title || '',
            email: all?.ContactEmail || '',
            phone: all?.Phone || '',
            linkinLink: all?.Linkin || '',
            portfolioLink: all?.Portfolio || '',
          },
          themeColor: all?.themeColor || '#ff0000',
          summery: all?.Summary || '',
          experience: { exp: all?.Experience || [] },
          education: { edu: all?.Education || [] },
          skills: { skl: all?.Skill || [] },
        };
        console.log(resumeData);
        setValue('Detail', resumeData.Detail);
        setValue('experience', resumeData.experience);
        setValue('education', resumeData.education);
        setValue('skills', resumeData.skills);
        setValue('summery', resumeData.summery);
        setValue('themeColor', resumeData.themeColor);
      })
      .catch(() => {
        console.log('1');
      });
  }, []);
  return (
    <div className='min-w-[600px] grid grid-cols-1 xl:grid-cols-2 p-10 gap-10 w-full'>
      {loading ? (
        <div className='col-span-2 shadow-lg h-[85vh] p-14 border-t-[10px] border-primary rounded-md justify-center items-center flex-col flex gap-5'>
          <h2 className='animate-bounce'>We are fetching your resume...</h2>
          <Loader className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        <>
          <PersonalInfo setValue={setValue} watcher={watch()} />
          <PreViewInfo ResumeInfo={watch()} />
        </>
      )}
    </div>
  );
}
export default Page;
