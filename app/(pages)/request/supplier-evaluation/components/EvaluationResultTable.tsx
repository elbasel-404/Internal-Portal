'use client';

import { Table } from '@components';
import { PrinterIcon } from '@icons';
import { SupplierEvaluationCriterionResult } from '@types';
import { Button, Input } from '@ui';
import { ChangeEvent, useState } from 'react';

interface SupplierEvaluationCriterionResultProps {
  data: SupplierEvaluationCriterionResult[];
}

const tableHeaders = [
 { label: 'معدل التقييم' },
  { label: 'الوزن %' },
  { label: 'تقييم المورد' },
  { label: 'مجموعة نقاط الموردين %' },
];

export const EvaluationResultTable = ({ data }: SupplierEvaluationCriterionResultProps) => {

  const tableData = data;

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
          rows={tableData}
        />
      </div>
    </>
  );
};
