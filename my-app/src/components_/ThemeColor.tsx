'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const ThemeColor = ({
  setValue,
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
}) => {
  const handleColor=(c:string)=>{
    setValue('themeColor',c);
  }
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#33FFA1',
    '#FF7133',
    '#71FF33',
    '#7133FF',
    '#FF3371',
    '#33FF71',
    '#3371FF',
    '#A1FF33',
    '#33A1FF',
    '#FF5733',
    '#5733FF',
    '#33FF5A',
    '#5A33FF',
    '#FF335A',
    '#335AFF',
  ];
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'outline'} size='sm' className='flex gap-2'>
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='text-sm border-b pb-2'>Select your theme color</h2>
        <div className='grid grid-cols-6 gap-3 mt-3 '>
          {colors.map((c, index) => {
            return (
              <div
                key={index}
                className={`w-5 h-5 rounded-full cursor-pointer hover:shadow-lg hover:scale-125 duration-300`}
                style={{ backgroundColor: c }}
                onClick={()=>handleColor(c)}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
