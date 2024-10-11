'use client';
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStyles,
  HtmlButton,
  Toolbar,
} from 'react-simple-wysiwyg';
import { Loader, Brain } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { MyInputwithIndex } from './MyInputwithIndex';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ExperienceSchema, FormExperience } from '@/forms/userInfoForm';
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from 'react-hook-form';
import { Experience } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import API from '@/lib/api';
import { usePathname } from 'next/navigation';
import { chatSession } from '../../service/google';
export const ExperienceFormComponment = ({
  setValue,
  setActiveFromIndex,
  ExperienceInfo,
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
  ExperienceInfo: Experience[];
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue: setExp,
    formState: { errors },
  } = useForm<FormExperience>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: { exp: ExperienceInfo },
  });
  const { exp } = watch();
  const path = usePathname();
  const [isGenerate, setIsGenerate] = useState(false);
  const resumeId = path.split('/')[3];
  const [generating, setgenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const DelExp = (index: number) => {
    const newExp = exp.filter((_, i) => i !== index);
    setExp('exp', newExp);
  };
  const send_txt =
    'Job Title: {positionTitle}, Company Name: {companyName} generate a work contetn with 5-6 bullet points for my experience in resume,  with JSON format {summary: content}. contetn in html format';
  const generateSummary = async (index: number) => {
    setgenerating(true);
    const PROMPT = send_txt
      .replace('{positionTitle}', exp[index].positionTitle)
      .replace('{companyName}', exp[index].companyName);
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const res = JSON.parse(result.response.text());
      console.log(res.summary);
      setExp(`exp.${index}.workSummary`, res.summary);
      setIsGenerate(true);
    } catch {
      console.log(result.response.text());
    }
    setgenerating(false);
  };
  const AddExp = () => {
    setExp('exp', [
      ...exp, // 这里展开当前的数组
      {
        positionTitle: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        isCurrentlyWork: false,
        workSummary: '',
      }, // 添加新的空经验对象
    ]);
  };
  // useEffect(() => {
  //   setValue('experience', exp);
  //   console.log(exp);
  // }, [exp]);
  return (
    <div className='p-5 rounded-lg mt-6 border'>
      <form
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          API.UpdateExperienceResume(resumeId, data.exp)
            .then((res: any) => {
              setLoading(false);
              toast({
                title: 'Experience has been saved.',
                description: new Date().toString(),
              });
              setValue('experience', data);
              setActiveFromIndex(4);
            })
            .catch((error: any) => {
              console.error(error);
              setLoading(false);
            });
        })}
      >
        <h2 className='text-md font-bold'>Experience</h2>
        <h2 className='text-md mb-4'>
          Now, Share your key experiences to make your resume stand out.
        </h2>
        <div className='flex flex-col gap-8'>
          {exp?.map((item, index) => {
            return (
              <div
                key={index}
                className={'border-t-[5px] border-primary shadow-lg rounded-md p-5 grid grid-cols-4 gap-3 '}
              >
                <h2 className='col-span-4 font-bold text-lg border-b pb-3 mb-3'>
                  {'Professional Experience ' + (index + 1)}
                </h2>
                <MyInputwithIndex
                  index={index}
                  className='col-span-2'
                  label='positionTitle'
                  register={register}
                  error={errors.exp?.[index]?.positionTitle?.message || ''}
                />
                <MyInputwithIndex
                  index={index}
                  className='col-span-2'
                  label='companyName'
                  register={register}
                  error={errors.exp?.[index]?.companyName?.message || ''}
                />
                <MyInputwithIndex
                  index={index}
                  className='col-span-2'
                  label='city'
                  register={register}
                  error={errors.exp?.[index]?.city?.message || ''}
                />
                <MyInputwithIndex
                  index={index}
                  className='col-span-2'
                  label='state'
                  register={register}
                  error={errors.exp?.[index]?.state?.message || ''}
                />
                <MyInputwithIndex
                  index={index}
                  className=''
                  label='startDate'
                  type='date'
                  register={register}
                  error={errors.exp?.[index]?.startDate?.message || ''}
                />
                <MyInputwithIndex
                  index={index}
                  className=''
                  label='endDate'
                  type='date'
                  register={register}
                  error={errors.exp?.[index]?.endDate?.message || ''}
                />
                <div className='col-span-2 flex flex-col'>
                  <h2 className='font-[500] text-md'>WorkState</h2>
                  <div className='gap-2 border rounded-md flex justify-center h-full items-center'>
                    <Checkbox
                      checked={watch(`exp.${index}.isCurrentlyWork`)} // 确保 checked 属性有默认值
                      onClick={() => {
                        const checkedValue = item.isCurrentlyWork;
                        setExp(`exp.${index}.isCurrentlyWork`, !checkedValue); // 手动更新状态
                      }}
                    />
                    <div className='grid gap-1.5 leading-none'>
                      <label
                        htmlFor='terms1'
                        className='text-md text-gray-800 font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        I am current working in there.
                      </label>
                    </div>
                  </div>
                </div>

                <div className='col-span-4'>
                  <div className='flex justify-between my-3 items-center'>
                    <h2 className='font-semibold'>Add the summary</h2>
                    <Button
                      type='button'
                      size={'sm'}
                      className='cursor-pointer border-primary hover:border-purple-700 font-bold text-primary border-2 hover:bg-white hover:text-purple-700 duration-300'
                      variant={'outline'}
                      onClick={() => generateSummary(index)}
                    >
                      {generating ? (
                        <Loader className='h-5 w-5 animate-spin' />
                      ) : (
                        <p className='flex'>
                          <Brain className='w-5 h-5 mr-2' />
                          Generate from AI
                        </p>
                      )}
                    </Button>
                  </div>
                  <EditorProvider>
                    <Editor
                      value={exp[index].workSummary}
                      onChange={(e) => {
                        setExp(`exp.${index}.workSummary`, e.target.value);
                      }}
                    >
                      <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                      </Toolbar>
                    </Editor>
                  </EditorProvider>
                </div>
                <div className='col-span-4 flex justify-end'>
                  <Button
                    className='text-primary hover:text-primary duration-300'
                    variant={'outline'}
                    type='button'
                    onClick={() => DelExp(index)}
                  >
                    Remove this experience
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className='mt-4 flex justify-between'>
          <Button
            className='text-primary hover:text-primary duration-300'
            type='button'
            variant={'outline'}
            onClick={AddExp}
          >
            + Add More Experience
          </Button>
          <Button type='submit' className='w-[80px]'>
            {' '}
            {loading ? <Loader className='h-5 w-5 animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};
