import { Checkbox } from '@ui';

interface CheckboxFieldProps {
  label: string;
  name: string;
  className?: string;
  labelStyle?: string;
  checkboxStyle?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckboxField = ({
  label,
  name,
  labelStyle,
  className,
  checkboxStyle,
  required,
  checked,
  onChange,
}: CheckboxFieldProps) => {
  return (
    <div className={`${className}`}>
      <label className={`${labelStyle}`}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <Checkbox
        name={name}
        className={`rounded-[3px] border-2 shadow-none space-y-0 ${checkboxStyle}`}
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
};
