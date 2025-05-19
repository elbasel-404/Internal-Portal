import { RadioGroup, RadioGroupItem } from '@ui';

interface RadioFieldProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  labelStyle?: string;
  radioStyle?: string;
  selectedValue?: string;
  required: boolean;
  onChange?: (value: string) => void;
}

export const RadioField = ({
  label,
  name,
  options,
  labelStyle,
  className,
  radioStyle,
  selectedValue,
  required,
  onChange,
}: RadioFieldProps) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`flex gap-x-2 mt-2 ${className}`}>
      {label && (
        <label className={`mt-2 ${labelStyle}`}>
          {label}
          {required && <span className='text-red-500'> *</span>}
        </label>
      )}
      <input
        type='text'
        value={selectedValue}
        name={name}
        className='hidden'
        readOnly
      />
      <RadioGroup
        defaultValue={selectedValue}
        className={`flex ${radioStyle}`}
        onValueChange={handleChange}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center gap-x-2 px-4 py-2 rounded-xl bg-cloudGray ${
              selectedValue === option.value
                ? 'bg-primary-opacity'
                : 'bg-cloudGray'
            }`}
          >
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className={`border-[#49454F] hover:border-primary text-[#49454F] hover:text-primary ${
                selectedValue === option.value
                  ? 'border-primary text-primary'
                  : ''
              }`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`text-darkBlue font-medium ${
                selectedValue === option.value
                  ? 'text-primary'
                  : 'text-darkBlue'
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
