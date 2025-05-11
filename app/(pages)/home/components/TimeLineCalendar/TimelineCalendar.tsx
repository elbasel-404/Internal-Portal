'use client';

import { SelectField } from '@components/form';
import {
  HandshakeIcon,
  NotePenIcon,
  NotesIcon,
  PalmTreeIcon,
  UserHandsIcon,
  UserTriangleIcon,
} from '@icons';
import { isSameDay } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarDateSelect } from './CalendarDateSelect';

const today = new Date();
const todayMonth = today.getMonth();
const todayYear = today.getFullYear();

export const TimelineCalendar = () => {
  const [selected, setSelected] = useState<Date>();
  const [month, setMonth] = useState(todayMonth);
  const [year, setYear] = useState(todayYear);

  return (
    <div className='flex flex-col justify-center items-center sm:justify-normal sm:items-stretch bg-white lg:px-4 py-2.5 space-y-4 sm:space-y-6'>
      <div className='flex flex-col w-full min-[475px]:flex-row justify-between items-center min-[475px]:items-end py-4 text-center xs:text-start gap-2'>
        <SelectField
          label='عضو الفريق'
          name='team_member'
          types={[]}
          placeholder='__'
        />
        <CalendarDateSelect
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
      </div>
      <DayPicker
        locale={arSA}
        mode='single'
        selected={selected}
        onSelect={setSelected}
        month={new Date(year, month)}
        startMonth={new Date(1950, 1)}
        endMonth={new Date(2050, 9)}
        hideNavigation
        components={{
          Day: ({ day, modifiers: { outside } }) => {
            const isSelected =
              day.date.toDateString() === selected?.toDateString();
            const isToday = isSameDay(day.date, today);
            const vacationDate = isSameDay(day.date, new Date('2025-04-05'));
            const permessionDate = isSameDay(day.date, new Date('2025-04-06'));
            const trainingDate = isSameDay(day.date, new Date('2025-04-07'));
            const internalCourseDate = isSameDay(
              day.date,
              new Date('2025-04-08')
            );
            const remoteWorkDate = isSameDay(day.date, new Date('2025-04-09'));
            const delegationDate = isSameDay(day.date, new Date('2025-04-10'));

            return (
              <td
                className={`text-center ${!outside && 'cursor-pointer'}`}
                onClick={() => setSelected(day.date)}
              >
                <span
                  className={`w-10 h-10 inline-flex items-center justify-center rounded-full 
                    ${isToday && !isSelected ? 'bg-gray-200 text-primary' : ''}
                    ${isSelected ? 'bg-primary-opacity text-primary' : ''}
                    ${outside ? 'hidden' : 'text-foreground'}
                    ${
                      vacationDate
                        ? 'bg-[#20AE94] bg-opacity-15 text-[#20AE94]'
                        : ''
                    }
                    ${
                      permessionDate
                        ? 'bg-[#FFB689] bg-opacity-15 text-[#FFB689]'
                        : ''
                    }
                    ${
                      trainingDate
                        ? 'bg-[#00D4C2] bg-opacity-15 text-[#00D4C2]'
                        : ''
                    }
                    ${
                      internalCourseDate
                        ? 'bg-[#A3CF5E] bg-opacity-15 text-[#A3CF5E]'
                        : ''
                    }
                    ${
                      remoteWorkDate
                        ? 'bg-[#0569EC] bg-opacity-15 text-[#0569EC]'
                        : ''
                    }
                    ${
                      delegationDate
                        ? 'bg-[#7064DC] bg-opacity-15 text-[#7064DC]'
                        : ''
                    }
                    
                    hover:bg-primary hover:text-primary-foreground`}
                >
                  {day.date.getDate()}
                </span>
              </td>
            );
          },
        }}
        classNames={{
          week: 'h-[100px]',
          root: 'w-full',
          months: 'space-y-6',
          month_caption: 'hidden',
          month_grid: 'w-full',
          weekday: 'text-center text-foreground text-sm border-b-2 pb-2',
          day_button: 'px-4 py-2 rounded-full',
        }}
      />
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4 border-t border-light pt-4'>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#FFB689] bg-opacity-15`}>
            <HandshakeIcon />
          </div>
          <p className='text-foreground font-medium'>استئذان</p>
        </div>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#A3CF5E] bg-opacity-15`}>
            <NotesIcon />
          </div>
          <p className='text-foreground font-medium'>دورات داخلية</p>
        </div>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#20AE94] bg-opacity-15`}>
            <PalmTreeIcon width={18} height={18} fill='#20AE94' />
          </div>
          <p className='text-foreground font-medium'>إجازة</p>
        </div>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#0569EC] bg-opacity-15`}>
            <UserTriangleIcon />
          </div>
          <p className='text-foreground font-medium'>عمل عن بعد</p>
        </div>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#7064DC] bg-opacity-15`}>
            <UserHandsIcon />
          </div>
          <p className='text-foreground font-medium'>انتداب</p>
        </div>
        <div className='flex items-center gap-2 p-2 border border-light rounded-lg'>
          <div className={`p-2 rounded-full bg-[#00D4C2] bg-opacity-15`}>
            <NotePenIcon />
          </div>
          <p className='text-foreground font-medium'>تدريب</p>
        </div>
      </div>
    </div>
  );
};
