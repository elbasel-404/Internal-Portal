'use client';

import { SelectField } from '@components/form';
import { ModalLink } from '@components/modals/ModalLink';
import { CirclePlusIcon } from '@icons';
import { GoalRequest } from '@types';
import { GoalsTable } from './GoalsTable';

const YearsList = Array.from({ length: 51 }, (_, i) => {
  const currentYear = new Date().getFullYear();
  const year = currentYear + i;
  return { id: year, name: year.toString() };
});

interface EvaluationGoalsFormProps {
  goalsData: GoalRequest[];
}

export const EvaluationGoalsForm = ({
  goalsData,
}: EvaluationGoalsFormProps) => {
  const totalGoalWeight = goalsData.reduce(
    (sum, goal) => sum + Number(goal.goalWeight || 0),
    0
  );
  return (
    <form className='bg-white rounded-md'>
      <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4'>
        <h2 className='text-foreground font-bold text-2xl'>الأهداف</h2>
        <ModalLink
          name='GoalsModal'
          className='flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary'
        >
          <CirclePlusIcon className='fill-white group-hover:fill-primary' />
          إضافة هدف جديد
        </ModalLink>
      </div>
      <div className='p-4'>
        <SelectField
          label='السنة'
          name='year'
          placeholder='--'
          types={YearsList}
          required
        />
      </div>

      <GoalsTable goalsData={goalsData} />

      <div className='border-t border-[#ECF0F480]'></div>

      <div className='p-4'>
        <div className='flex items-center gap-4'>
          <p className='text-foreground font-medium'>{totalGoalWeight}%</p>
          <div className='w-full rounded-full bg-cloudGray h-3'>
            <div
              className='bg-primary rounded-full h-3 transition-all duration-300'
              style={{ width: `${totalGoalWeight}%` }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
