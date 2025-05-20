import { Checkbox } from '@ui';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxListFieldProps {
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  layoutClass?: string;
  labelStyle?: string;
  checkboxStyle?: string;
  required?: boolean;
  label?: string;
}

export const CheckboxListField = ({
  name,
  options,
  selectedValues,
  onChange,
  className,
  layoutClass,
  labelStyle,
  checkboxStyle,
  required,
  label,
}: CheckboxListFieldProps) => {
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    const updatedValues = isChecked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    onChange(updatedValues);
  };

  return (
    <div className={className}>
      {label && (
        <label className={labelStyle}>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-6 ${layoutClass}`}>
        {options.map((option) => (
          <label key={option.value} className='flex items-center space-x-2 gap-2'>
            <Checkbox
              name={`${name}-${option.value}`}
              className={`rounded-[3px] border-2 shadow-none ${checkboxStyle}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked as boolean)
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
