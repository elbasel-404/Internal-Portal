import { DateField, InputField } from '@components/form';
import { DateDurationSectionProps } from '../FormTypes/types';

export const DateDurationSection = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  duration,
}: DateDurationSectionProps) => (
  <div className='space-y-6'>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-0'>
      <div className='space-y-2'>
        <DateField
          required
          label='تاريخ البدء'
          name='date_from'
          date={dateFrom}
          onChange={(date) => setDateFrom(date || new Date())}
        />
      </div>
      <div className='space-y-2'>
        <DateField
          required
          label='تاريخ الانتهاء'
          name='date_to'
          date={dateTo}
          onChange={(date) => setDateTo(date || new Date())}
        />
      </div>
      <div className='space-y-2'>
        <InputField
          label='مدة المشروع'
          name='duration'
          disabled
          value={duration}
          placeholder=''
        />
      </div>
    </div>
  </div>
);
