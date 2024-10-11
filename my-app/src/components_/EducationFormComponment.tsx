'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const { default: axios } = require('axios');
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { EducationSchema, FormEducation } from '@/forms/userInfoForm';
import { Education } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
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
import { MyInputwithIndex } from './MyInputwithIndex';
import { useToast } from '@/hooks/use-toast';
import API from '@/lib/api';
import { usePathname } from 'next/navigation';
import { chatSession } from '../../service/google';
import { Outfit, Nunito } from 'next/font/google';
const outfit = Outfit({
  subsets: ['latin'], // Specify subsets (e.g., latin, cyrillic) if needed
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Specify the weights you want to include
});
import { fetchCountries } from'@/lib/api';
export const EducationFormComponment = ({
  setValue,
  setActiveFromIndex,
  EducationInfo,
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
  EducationInfo: Education[];
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue: setEdu,
    formState: { errors },
  } = useForm<FormEducation>({
    resolver: zodResolver(EducationSchema),
    defaultValues: { edu: EducationInfo },
  });
  const { edu } = watch();
  const path = usePathname();
  const resumeId = path.split('/')[3];
  const [generating, setgenerating] = useState(false);
  const [generating2, setgenerating2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSchools, setAllSchools] = useState<string[]>([]);
  const [allCountries, setallCountries] = useState<string[]>([]);
  const DelEdu = (index: number) => {
    const newExp = edu.filter((_, i) => i !== index);
    setEdu('edu', newExp);
  };
  const send_txt =
    'University Name: {positionTitle}, Degree: {companyName} generate a education describtion, for my resume with 5-6 sentence,  with JSON format {summary:string}.';
  const refine = 
    'Information: {positionTitle},help me refine this summary, with JSON format {summary:string}.';
    const generateSummary = async (index: number) => {
    setgenerating(true);
    const PROMPT = send_txt
      .replace('{positionTitle}', edu[index].universityName)
      .replace('{companyName}', edu[index].degree);
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const res = JSON.parse(result.response.text());
      console.log(res.summary);
      setEdu(`edu.${index}.describtion`, res.summary);
    } catch {
      console.log(result.response.text());
    }
    setgenerating(false);
  };
  const refineSummary = async (index: number) => {
    setgenerating2(true);
    const PROMPT = refine.replace('{positionTitle}', edu[index].describtion)
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const res = JSON.parse(result.response.text());
      console.log(res.summary);
      setEdu(`edu.${index}.describtion`, res.summary);
    } catch {
      console.log(result.response.text());
    }
    setgenerating2(false);
  };
  const AddExp = () => {
    setEdu('edu', [
      ...edu, // 这里展开当前的数组
      {
        universityName: '',
        degree: '',
        startDate: '',
        country: '',
        endDate: '',
        describtion: '',
      }, // 添加新的空经验对象
    ]);
  };
  const fetchSchools = useCallback(
    debounce((value: string) => {
      if (value !== '') {
        value = value.replace(/\b\w/g, function (char) {
          return char.toUpperCase();
        });
        axios
          .get(`http://universities.hipolabs.com/search?name=${value}`)
          .then((response: any) => {
            const schoolNames = response.data.map((school: any) => school.name);
            setAllSchools([...schoolNames, value]);
          })
          .catch((error: any) =>
            console.error('Error fetching schools:', error)
          );
      }
    }, 300),
    []
  ); // 500ms 防抖时间
  return (
    <div className='p-5 rounded-lg mt-6 border'>
      <form
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          API.UpdateEducationResume(resumeId, data.edu)
            .then((res: any) => {
              setLoading(false);
              toast({
                title: 'Education has been saved.',
                description: new Date().toString(),
              });
              setValue('education', data);
              setActiveFromIndex(5);
            })
            .catch((error: any) => {
              console.error(error);
              setLoading(false);
            });
        })}
      >
        <h2 className='font-bold text-md'>Education</h2>
        <h2 className='text-md mb-4'>
          Then, Add your education to complete your profile!
        </h2>
        <div className='flex flex-col gap-8'>
          {edu?.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  'border-t-[5px] border-primary shadow-lg rounded-md p-5 grid grid-cols-4 gap-3 '
                }
              >
                <h2 className='col-span-4 font-bold text-lg border-b pb-3 mb-3'>
                  {'Education ' + (index + 1)}
                </h2>
                <div className='col-span-2'>
                  <Label className='text-md font-[500]'>UniversityName</Label>
                  <Autocomplete
                    options={allSchools}
                    value={item.universityName}
                    renderInput={(params) => {
                      const { InputProps, ...rest } = params;
                      return (
                        <TextField
                          value={item.universityName}
                          className='text-sm'
                          {...params}
                          sx={{
                            '& label': {
                              display: 'none', // 隐藏标签
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置边框颜色
                                borderWidth: '1px',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置聚焦时的边框颜色
                                borderWidth: '1px', // 保持聚焦时的边框宽度为 1px
                              },
                              '&.Mui-hovered fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置聚焦时的边框颜色
                                borderWidth: '1px', // 保持聚焦时的边框宽度为 1px
                              },
                              height: '40px', // 修改输入框的高度
                            },
                            '& input': {
                              fontSize: '14px', // 设置输入框的字体大小
                              fontFamily: outfit.style.fontFamily,
                              padding: '0px', // 设置输入框内边距
                              margin: '0px',
                            },
                          }}
                        />
                      );
                    }}
                    onInputChange={(event, newInputValue) => {
                      fetchSchools(newInputValue);
                      setEdu(`edu.${index}.universityName`, newInputValue);
                    }}
                  />
                  <label className='text-red-700 text-sm my-2'>
                    {errors.edu?.[index]?.universityName?.message}
                  </label>
                </div>

                <MyInputwithIndex
                  page='edu'
                  index={index}
                  className='col-span-2'
                  label='degree'
                  register={register}
                  error={errors.edu?.[index]?.degree?.message || ''}
                />
                <div className='col-span-2'>
                  <Label className='text-md font-[500]'>Country</Label>
                  <Autocomplete
                    options={allCountries}
                    value={item.country}
                    renderInput={(params) => {
                      const { InputProps, ...rest } = params;
                      return (
                        <TextField
                          className='text-sm'
                          {...params}
                          sx={{
                            '& label': {
                              display: 'none', // 隐藏标签
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置边框颜色
                                borderWidth: '1px',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置聚焦时的边框颜色
                                borderWidth: '1px', // 保持聚焦时的边框宽度为 1px
                              },
                              '&.Mui-hovered fieldset': {
                                borderColor: 'rgb(230, 230, 230)', // 设置聚焦时的边框颜色
                                borderWidth: '1px', // 保持聚焦时的边框宽度为 1px
                              },
                              height: '40px', // 修改输入框的高度
                            },
                            '& input': {
                              fontSize: '14px', // 设置输入框的字体大小
                              fontFamily: outfit.style.fontFamily,
                              padding: '0px', // 设置输入框内边距
                              margin: '0px',
                            },
                          }}
                        />
                      );
                    }}
                    onInputChange={(event, newInputValue) => {
                      fetchCountries(newInputValue).then((res)=>{
                        console.log(res);
                        setallCountries(res);
                      });
                      setEdu(`edu.${index}.country`, newInputValue);
                    }}
                  />
                  <label className='text-red-700 text-sm my-2'>
                    {errors.edu?.[index]?.universityName?.message}
                  </label>
                </div>
                <MyInputwithIndex
                  page='edu'
                  index={index}
                  type='date'
                  className='col-span-1'
                  label='startDate'
                  register={register}
                  error={errors.edu?.[index]?.startDate?.message || ''}
                />
                <MyInputwithIndex
                  page='edu'
                  index={index}
                  type='date'
                  className='col-span-2-1'
                  label='endDate'
                  register={register}
                  error={errors.edu?.[index]?.endDate?.message || ''}
                />

                <div className='col-span-4'>
                  <div className='flex justify-between my-3 items-center'>
                    <h2 className='font-semibold'>Add the describtion</h2>
                    <Button
                      type='button'
                      size={'sm'}
                      className='w-[170px] cursor-pointer border-primary hover:border-purple-700 font-bold text-primary border-2 hover:bg-white hover:text-purple-700 duration-300'
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
                    <Button
                      type='button'
                      size={'sm'}
                      className='w-[150px] cursor-pointer border-primary hover:border-purple-700 font-bold text-primary border-2 hover:bg-white hover:text-purple-700 duration-300'
                      variant={'outline'}
                      onClick={() => refineSummary(index)}
                    >
                      {generating2 ? (
                        <Loader className='h-5 w-5 animate-spin' />
                      ) : (
                        <p className='flex'>
                          <Brain className='w-5 h-5 mr-2' />
                          Refine from AI
                        </p>
                      )}
                    </Button>
                    
                  </div>
                  <EditorProvider>
                    <Editor
                      value={edu[index].describtion}
                      onChange={(e) => {
                        setEdu(`edu.${index}.describtion`, e.target.value);
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
                    onClick={() => DelEdu(index)}
                  >
                    Remove this education
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
            + Add One Education
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
