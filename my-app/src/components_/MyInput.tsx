import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { date } from 'zod';
export const MyInput = ({
  label,
  register,
  error,
  className = '',
  optional = false,
  type = 'input',
}: {
  className?: string;
  label: string;
  register: any;
  error: string;
  optional?: boolean;
  type?: 'date' | 'input';
}) => {
  return (
    <div className={className}>
      <Label className={'text-md font-[500] '}>
        {label[0].toUpperCase() +
          label.substring(1, label.length) +
          (optional ? ' (optional)' : '')}
      </Label>
      <Input {...register(label)} type={type} />
      <label className='text-red-700 text-sm my-2'>{error}</label>
    </div>
  );
};
