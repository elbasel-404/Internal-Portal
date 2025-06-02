import { DateField, InputField, SelectField } from '@components/form';

interface GoalDetailsSectionProps {
  formData: {
    measurementPeriod: string;
    goalWeight: string;
    startDate: Date;
    endDate: Date;
  };
  onInputChange: (
    name: string,
    value: string | Date | null | undefined
  ) => void;
}

export const GoalDetailsSection = ({
  formData,
  onInputChange,
}: GoalDetailsSectionProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <SelectField
        label='فترة القياس'
        name='measurementPeriod'
        types={[
          { id: '1', name: 'ربع سنوي' },
          { id: '2', name: 'نصف سنوي' },
          { id: '3', name: 'سنوي' },
        ]}
        placeholder=''
        value={formData.measurementPeriod}
        onChange={(value) => onInputChange('measurementPeriod', value)}
        required
      />
      <InputField
        label='وزن الهدف'
        name='goalWeight'
        placeholder=''
        value={formData.goalWeight}
        onChange={(e) => onInputChange('goalWeight', e.target.value)}
        required
      />
      <DateField
        label='تاريخ بداية تحقيق الهدف'
        name='startDate'
        date={formData.startDate}
        onChange={(value) => onInputChange('startDate', value)}
        required={false}
      />
      <DateField
        label='تاريخ نهاية تحقيق الهدف'
        name='endDate'
        date={formData.endDate}
        onChange={(value) => onInputChange('endDate', value)}
        required={false}
      />
    </div>
  );
};
