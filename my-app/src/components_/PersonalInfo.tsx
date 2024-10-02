import { Input } from '@/components/ui/input';
import { MyInput } from './MyInput';
import {Button} from '@/components/ui/button'
export const PersonalInfo = ({
  register,
  errors,
  submit
}: {
  register: any;
  errors: any;
  submit:any;
}) => {
  return (
    <form className='bg-gray-50 flex w-full flex-col p-10 gap-4'
    onSubmit={submit(()=>{
        alert('111')
    })}>
      <MyInput label='firstName' register={register} error={errors.firstName?.message||''} />
      <MyInput label='lastName' register={register} error={errors.lastName?.message ||''} />
      <MyInput label='email' register={register} error={errors.lastName?.message ||''} />
      <MyInput label='phone' register={register} error={errors.lastName?.message ||''} />
      <MyInput label='address' register={register} error={errors.lastName?.message ||''} />
      <Button type='submit'>Submit</Button>
    </form>
  );
};
