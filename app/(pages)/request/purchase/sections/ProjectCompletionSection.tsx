'use client';

import { costsAtom } from '@atoms';
import { Table } from '@components';
import { ModalLink } from '@components/modals/ModalLink';
import { CirclePlusIcon } from '@icons';
import { removeProjectCompletion } from '@server';
import { ProjectCompletionSchema } from '@zodSchemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { z } from 'zod';

const tableHeaders = [
  { label: 'اسم المرحلة' },
  { label: 'السنة' },
  { label: 'المبلغ' },
  { label: 'الإجراءات' },
];

const budgetTableHeaders = [
  { label: 'السنة' },
  { label: 'الميزانية المطلوبة' },
];

type Data = z.infer<typeof ProjectCompletionSchema>;

interface ProjectCompletionProps {
  data: Data[];
}

export const ProjectCompletionSection = ({ data }: ProjectCompletionProps) => {
  const [costs] = useAtom(costsAtom);

  const projectCompletionData = data.map((projectCompletionDetails, index) => ({
    ...projectCompletionDetails,
    id: index + 'id',
  }));

  const budgetData = data.map((budgetDetails, index) => {
    const year = budgetDetails.year;
    const amount = Number(budgetDetails.amount) || 0;
    return {
      id: `${index}id`,
      year,
      amount,
    };
  });

  const totalAmount = budgetData.reduce((sum, item) => sum + item.amount, 0);
  const progressPercentage =
    totalAmount > 0 ? Math.min((totalAmount / Number(costs)) * 100, 100) : 0;

  budgetData.push({
    id: 'total',
    year: 'الإجمالي',
    amount: totalAmount,
  });

  const handleRemove = async (id: number) => {
    await removeProjectCompletion(id);
  };

  useEffect(() => {
    if (data.length === 0) {
      localStorage.removeItem('costs');
    }
  }, [data]);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
        <h2 className='text-darkBlue font-bold text-xl'>
          تقسيم مراحل المشروع <span className='text-red-500'>*</span>
        </h2>
        <ModalLink
          name='ProjectCompletionModal'
          className='flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary'
        >
          <CirclePlusIcon className='fill-white group-hover:fill-primary' />
          إضافة عنصر
        </ModalLink>
      </div>

      {projectCompletionData.length > 0 && (
        <Table
          tableClassName='h-fit'
          columns={tableHeaders}
          rows={projectCompletionData}
          toggleId={false}
          toggleDelete
          onRemove={handleRemove}
        />
      )}

      {budgetData.length > 1 && (
        <>
          <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary mt-6'>
            <h2 className='text-darkBlue font-bold text-xl'>
              الميزانية المطلوبة لسنة
            </h2>
          </div>
          <Table
            tableClassName='h-fit'
            columns={budgetTableHeaders}
            rows={budgetData}
            toggleId={false}
          />
        </>
      )}

      {totalAmount === costs && totalAmount > 0 ? (
        <div className='w-full p-4 bg-[#00A65A] bg-opacity-15 rounded-lg mt-4'>
          <h3 className='text-darkBlue font-medium mb-2'>
            تم تغطية مبلغ تكاليف المشروع
          </h3>
          <div className='w-full bg-white h-3'>
            <div
              className='bg-[#00A65A] h-3 transition-all duration-300'
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className='font-medium text-foreground text-lg'>
            {Math.round(progressPercentage)}%
          </div>
        </div>
      ) : (
        totalAmount > 0 && (
          <div className='w-full p-4 bg-[#F15143] bg-opacity-15 rounded-lg mt-4'>
            <h3 className='text-darkBlue font-medium mb-2'>
              لم يتم تغطية مبلغ تكاليف المشروع
            </h3>
            <div className='w-full bg-white h-3'>
              <div
                className='bg-[#F15143] h-3 transition-all duration-300'
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className='font-medium text-foreground text-lg'>
              {Math.round(progressPercentage)}%
            </div>
          </div>
        )
      )}
    </>
  );
};
