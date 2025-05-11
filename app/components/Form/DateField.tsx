import { DatePicker } from '@ui';

interface DateFieldProps {
  name: string;
  label: string;
  required: boolean;
  date?: Date | undefined;
  onChange?: (date: Date | undefined | null) => void;
}

export const DateField = ({
  name,
  date,
  onChange,
  label,
  required,
}: DateFieldProps) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='font-medium text-foreground'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <DatePicker  label='' name={name} value={date} onChange={onChange} />
    </div>
  );
};
