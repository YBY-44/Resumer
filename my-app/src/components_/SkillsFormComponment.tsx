'use client';
import { Input } from '@/components/ui/input';
import { Rating, ThinStar, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { MyInput } from './MyInput';
import { MyInputwithIndex } from './MyInputwithIndex';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SkillSchema, FormSkill } from '@/forms/userInfoForm';
import API from '@/lib/api';
import { usePathname } from 'next/navigation';
import { chatSession } from '../../service/google';
import { Skill } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
const myStyles = {
  itemShapes: Star,
  activeFillColor: '#000000',
  inactiveFillColor: 'rgb(240,240,240)',
};
export const SkillsFormComponment = ({
  setValue,
  setActiveFromIndex,
  SkillInfo,
}: {
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
  SkillInfo: Skill[];
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue: setSkl,
    getValues,
    formState: { errors },
  } = useForm<FormSkill>({
    resolver: zodResolver(SkillSchema),
    defaultValues: { skl: SkillInfo },
  });
  const { skl } = watch();
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [generating, setgenerating] = useState(false);
  const DelEdu = () => {
    const newExp = skl.filter((_, i) => i !== skl.length - 1);
    setSkl('skl', newExp);
  };
  const AddSkl = () => {
    setSkl('skl', [
      ...skl, // 这里展开当前的数组
      {
        name: '',
        rating: 0,
      }, // 添加新的空经验对象
    ]);
  };
  return (
    <form
      className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-6'
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        API.UpdateSkillResume(resumeId, data.skl)
          .then((res: any) => {
            setLoading(false);
            toast({
              title: 'Skill has been saved.',
              description: new Date().toString(),
            });
            setValue('skills', data);
            setActiveFromIndex(6);
          })
          .catch((error: any) => {
            console.error(error);
            setLoading(false);
          });
      })}
    >
      <h2 className='font-bold text-md'>Professional Skill</h2>
      <h2 className='text-md'>
        We are almost done! Highlight your skills to stand out!
      </h2>
      <div className='flex flex-col'>
        {skl?.map((item, index) => {
          return (
            <div
              key={index}
              className={
                'mt-3 flex justify-between gap-2 pb-4 items-center border-b-2 border-gray-300'
              }
            >
              <div className='w-[50%]'>
                <Input
                  placeholder='Enter your Skill here'
                  {...register(`skl.${index}.name`)}
                />
                <label>{errors.skl?.[index]?.name?.message || ''}</label>
              </div>
              <div>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rating}
                  itemStyles={myStyles}
                  onChange={(newRating: number) => {
                    setSkl(`skl.${index}.rating`, newRating);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='mt-4 flex justify-between'>
        <div className='flex gap-3'>
          <Button
            className='text-primary hover:text-primary duration-300'
            type='button'
            variant={'outline'}
            onClick={AddSkl}
          >
            + Add More Skill
          </Button>
          <Button
            className='text-primary hover:text-primary duration-300'
            type='button'
            variant={'outline'}
            onClick={() => DelEdu()}
          >
            - Remove
          </Button>
        </div>

        <Button type='submit' className='w-[80px]'>
          {' '}
          {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};
