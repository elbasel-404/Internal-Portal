'use client';

import { Input, Label, Popover, PopoverContent, PopoverTrigger } from '@ui';
import { cn } from '@utils';
import { format } from 'date-fns';
import { TimePickerData } from './time-picker-data';

interface TimePickerProps {
  date: Date | undefined;
  label: string;
  name?: string;
  setDateAction: (date: Date | undefined) => void;
}

export function TimePicker({
  date,
  label,
  name,
  setDateAction,
}: TimePickerProps): JSX.Element {
  const formattedDateTime: string = date ? format(date, 'hh:mm') : '';

  return (
    <div className='space-y-1'>
      <Label htmlFor='date-time-picker' className='text-sm font-medium'>
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <input
              type='text'
              value={formattedDateTime}
              name={name}
              className='hidden'
              readOnly
            />
            <Input
              readOnly
              value={formattedDateTime}
              placeholder='حدد الوقت'
              className={cn(
                'w-full shadow-none justify-between text-right font-medium rounded-sm p-6 bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary',
                !date && 'text-black'
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className=' border-t border-border'>
            <TimePickerData date={date} setDateAction={setDateAction} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
