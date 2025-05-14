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

export const EvaluationResultTable = ({ data }: SupplierEvaluationProps) => {

  return (
    <>
      <div className='bg-white rounded-lg'>
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4'>
          <h2 className='text-foreground font-bold text-2xl'>
              نتيجة التقييم        
          </h2>
        </div>
        <Table
          columns={tableHeaders}
          rows={data}
        />
      </div>
    </>
  );
};
