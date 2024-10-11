'use client';
import { Input } from '@/components/ui/input';
import { MyInput } from './MyInput';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { FormDetail, DetailSchema } from '@/forms/userInfoForm';
import { Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DetailType } from '@/lib/types';
import React from 'react';
import API from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import { title } from 'process';
import { describe } from 'node:test';
export const PersonalDetailFormComponment = ({
  DetailInfo,
  setValue,
  setActiveFromIndex,
}: {
  DetailInfo: DetailType;
  setValue: (
    name:
      | 'Detail'
      | 'themeColor'
      | 'summery'
      | 'experience'
      | 'education'
      | 'skills',
    value: any
  ) => void;
  setActiveFromIndex: (index: number) => void;
}) => {
  const {toast} = useToast();
  const [formError, setFormError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue: setSub,
    formState: { errors },
  } = useForm<FormDetail>({
    resolver: zodResolver(DetailSchema),
    defaultValues: DetailInfo,
  });
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    setSub('lastName', DetailInfo.lastName);
    setSub('firstName', DetailInfo.firstName);
    setSub('phone', DetailInfo.phone);
    setSub('jobTitle', DetailInfo.jobTitle);
    setSub('linkinLink', DetailInfo.linkinLink || '');
    setSub('portfolioLink', DetailInfo.portfolioLink || '');
    setSub('email', DetailInfo.email);
    setSub('address', DetailInfo.address);
  }, [DetailInfo]);

  return (
    <form
      className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-6'
      onSubmit={handleSubmit((data) => {
        isLoading(true);
        setFormError(false);
        API.UpdatePersonalDetailResume(resumeId, watch())
          .then((res: any) => {
            isLoading(false);
            setFormError(false);
            console.log(res);
            setValue('Detail', data);
            setActiveFromIndex(2);
            toast({
                title: "Your content has been saved.",
                description: "At the " + (new Date()).toString(),
            })
          })
          .catch((error: any) => {
            isLoading(false);
            setFormError(true);
            console.error(error);
            toast({
                title: "We meet some Error",
                description: error,
                variant:'destructive'
            })
          });
      })}
    >
      <h2 className='font-bold text-md'>Personal Detail</h2>
      <h2 className='text-md'>
        Now, at fitst, give us some basic information of yourself.
      </h2>
      <div className='grid grid-cols-2 gap-3 mt-5'>
        <MyInput
          label='firstName'
          register={register}
          error={errors.firstName?.message || ''}
        />
        <MyInput
          label='lastName'
          register={register}
          error={errors.lastName?.message || ''}
        />
        <MyInput
          className='col-span-2'
          label='jobTitle'
          register={register}
          error={errors.jobTitle?.message || ''}
        />
        <MyInput
          label='email'
          register={register}
          error={errors.email?.message || ''}
        />
        <MyInput
          label='phone'
          register={register}
          error={errors.phone?.message || ''}
        />
        <MyInput
          optional
          className='col-span-2'
          label='linkinLink'
          register={register}
          error={errors.linkinLink?.message || ''}
        />
        <MyInput
          optional
          className='col-span-2'
          label='portfolioLink'
          register={register}
          error={errors.portfolioLink?.message || ''}
        />
        <MyInput
          className='col-span-2'
          label='address'
          register={register}
          error={errors.address?.message || ''}
        />
      </div>
      <div className='mt-3 flex justify-between items-center'>
        {formError ? (
          <h2 className='text-red-800'>
            Please check your Information, then try to save.
          </h2>
        ) : (
          <h2></h2>
        )}
        <Button
          className='w-[70px] p-3'
          type='submit'
          onClick={() => setFormError(true)}
        >
          {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};
