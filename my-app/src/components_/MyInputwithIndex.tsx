import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export const MyInputwithIndex = ({
  label,
  register,
  error,
  className = '',
  optional = false,
  index = 0,
  type = 'input',
  page = 'exp',
}: {
  className?: string;
  label: string;
  register: any;
  error: string;
  optional?: boolean;
  index: number;
  type?: 'date' | 'input';
  page?: string;
}) => {
  return (
    <div className={className}>
      <Label className={'text-md font-[500] '}>
        {label[0].toUpperCase() +
          label.substring(1, label.length) +
          (optional ? ' (optional)' : '')}
      </Label>
      <Input {...register(`${page}.${index}.${label}`)} type={type} />
      <label className='text-red-700 text-sm my-2'>{error}</label>
    </div>
  );
};
