'use client';

import { Table } from '@components';
import { PrinterIcon } from '@icons';
import { SupplierEvaluationRequest } from '@types';
import { Button, Input } from '@ui';
import { ChangeEvent, useState } from 'react';

interface SupplierEvaluationProps {
  data: SupplierEvaluationRequest[];
}

const tableHeaders = [
  { label: 'تاريخ الطلب' },
  { label: 'الموظف' },
  { label: 'العقد' },
  { label: 'الحالة' },
];

export const EvaluationCriteriaTable = ({ data }: SupplierEvaluationProps) => {

  return (
    <>
      <div className='bg-white rounded-lg'>
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4'>
          <h2 className='text-foreground font-bold text-2xl'>
              تقييم الأداء        
          </h2>
          <div className='flex gap-4 items-center'>
            <Button
              className='flex items-center truncate gap-1 py-2 px-4 text-sm rounded-xl font-medium w-fit bg-primary-opacity text-primary'
            >
              <PrinterIcon className='fill-primary group-hover:fill-primary' />
              طباعة الطلب
            </Button>
          </div>
        </div>
        <Table
          columns={tableHeaders}
          rows={data}
        />
      </div>
    </>
  );
};
