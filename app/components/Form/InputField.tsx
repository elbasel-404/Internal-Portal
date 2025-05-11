import { Input } from '@ui';
import { ChangeEvent } from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
}: InputFieldProps) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='font-medium text-foreground'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type='text'
        disabled={disabled}
        placeholder={placeholder}
        className='w-full shadow-none text-black placeholder:text-black placeholder:font-medium rounded-sm py-6 bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary'
      />
    </div>
  );
};
