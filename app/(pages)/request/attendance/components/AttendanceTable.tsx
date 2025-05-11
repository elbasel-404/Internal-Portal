'use client';

import { FilterSection, Table } from '@components';
import { PrinterIcon } from '@icons';
import { paths } from '@lib';
import type { AttendanceListRequest } from '@types';
import { tableHeaders } from './config';

interface AttendanceListRequestProps {
  data: AttendanceListRequest[];
}

export const defaultMonths = [
  { id: '1', description: 'يناير' },
  { id: '2', description: 'فبراير' },
  { id: '3', description: 'مارس' },
  { id: '4', description: 'أبريل' },
  { id: '5', description: 'مايو' },
  { id: '6', description: 'يونيو' },
  { id: '7', description: 'يوليو' },
  { id: '8', description: 'أغسطس' },
  { id: '9', description: 'سبتمبر' },
  { id: '10', description: 'أكتوبر' },
  { id: '11', description: 'نوفمبر' },
  { id: '12', description: 'ديسمبر' },
];

export const AttendanceTable = ({ data }: AttendanceListRequestProps) => {
  return (
    <>
      <div className='bg-white rounded-lg'>
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4'>
          <h2 className='text-foreground font-bold text-2xl'>
            قائمة الحضور و الإنصراف
          </h2>
        </div>

        <FilterSection
          options={defaultMonths}
          selectLabel='الشهر'
          selectPlaceholder='حدد الشهر'
          filterHeader='فرز الطلبات'
          filterButton='طباعة تقارير الحضور و الإنصراف'
          Icon={PrinterIcon}
          onApplyFilters={() => {}}
        />

        <Table
          columns={tableHeaders}
          rows={data}
          link={paths.vacationDetails.href}
          toggleId={false}
        />
      </div>
    </>
  );
};
