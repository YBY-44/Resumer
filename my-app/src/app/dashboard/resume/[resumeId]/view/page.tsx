'use client';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ResumeOverview, ResumeInfo } from '@/lib/types';
import { PersonalInfo } from '@/components_/PersonalInfo';
import { PreViewInfo } from '@/components_/PreviewInfo';
import { ResumeInfoDetail, FormTypePickDetail } from '@/forms/userInfoForm';
import { Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RWebShare } from 'react-web-share';
function Page() {
  const router = useRouter();
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [MyResume, setResume] = useState<ResumeInfo>();
  const [loading, setLoading] = useState(true);
  const HandleDownload = () => {
    window.print();
  };
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
    <div>
      {loading ? (
        <div className='shadow-lg h-[85vh] p-14 rounded-md justify-center items-center flex-col flex gap-5 my-10 mx-10 md:mx-20 lg:mx-36 xl:mx-52'>
          <h2 className='animate-bounce'>We are fetching your resume...</h2>
          <Loader className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        <div>
          <div id='np' className='my-10 mx-10 md:mx-20 lg:mx-36 xl:mx-52'>
            <h2 className='text-center text-2xl font-medium mb-2'>
              Congrats! 🎉 Your Ultimait AI generates Resume is ready !{' '}
            </h2>
            <p className='text-center text-gray-400 text-md'>
              Your resume is now ready for download. You are welcome to share
              your unique URL with others if you wish to provide them access.
            </p>

            <div className='flex justify-between px-44 my-10'>
              <Button className='w-[90px]' onClick={HandleDownload}>
                Download
              </Button>
              <RWebShare
                data={{
                  text: 'Hi, this is my Resume!',
                  url: process.env.NEXT_PUBLIC_URL+'dashboard/resume/'+resumeId+'/view',
                  title: watch().Detail.firstName+ ' ' +watch().Detail.lastName,
                }}
                onClick={() => console.log('shared successfully!')}
              >
                <Button className='w-[90px]'>Share</Button>
              </RWebShare>
              
            </div>
          </div>
          <div id='print_a'>
            <PreViewInfo ResumeInfo={watch()} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Page;
