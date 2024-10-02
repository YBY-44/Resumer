import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export const MyInput = ({
  label,
  register,
  error,
}: {
  label: string;
  register: any;
  error: string;
}) => {
  return (
    <div>
      <Label className='text-md font-bold'>{label[0].toUpperCase()+label.substring(1,label.length)}</Label>
      <Input {...register(label)} />
      <label className='text-blue-600 text-sm my-2'>{error}</label>
    </div>
  );
};
