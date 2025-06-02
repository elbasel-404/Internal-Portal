import { PencilIcon, TrashIcon } from '@icons';
import { colors } from '@lib';
import { GoalRequest } from '@types';
import { Button, PieChartElem } from '@ui';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';
import { StrategicGoals } from './StrategicGoals';

const tableHeaders = [
  { label: 'الهدف الفردي' },
  { label: 'مؤشر الأداء' },
  { label: 'وزن المؤشر' },
  { label: 'خطوات الإنجاز' },
  { label: 'مقياس المؤشر' },
  { label: 'نوع المستهدف' },
  { label: 'المستهدف (رقم - تاريخ)' },
  { label: 'وزن الهدف ٪' },
  { label: 'الإجراءات' },
];

interface GoalsTableProps {
  goalsData: GoalRequest[];
}

export const GoalsTable = ({ goalsData }: GoalsTableProps) => {
  const [isStrtegicGoals, setIsStrategicGoals] = useState(false);

  const pieChartConfig = {
    completed: {
      color: colors.light.primary,
    },
    notCompleted: {
      color: colors.light.white,
    },
  };
  return (
    <div className='overflow-x-auto app-scrollbar'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-cloudGray'>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className='text-center text-black font-medium text-base p-4 border border-gray-200'
                colSpan={header.label === 'وزن المؤشر' ? 2 : 1}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {goalsData.map((goal) => {
            const totalIndicatorWeight = goal.indicators.reduce(
              (sum, indicator) => sum + Number(indicator.indicatorWeight || 0),
              0
            );

            const indicatorWeightChartData = [
              {
                stat: '',
                percentage: totalIndicatorWeight,
                fill: 'var(--color-completed)',
              },
              {
                stat: '',
                percentage: 100 - totalIndicatorWeight,
                fill: 'var(--color-notCompleted)',
              },
            ];

            const totalGoalWeight = Number(goal.goalWeight);

            const goalWeightChartData = [
              {
                stat: '',
                percentage: totalGoalWeight,
                fill: 'var(--color-completed)',
              },
              {
                stat: '',
                percentage: 100 - totalGoalWeight,
                fill: 'var(--color-notCompleted)',
              },
            ];

            return goal.indicators.map((indicator, indicatorIndex) => (
              <tr key={`${goal.id}-${indicatorIndex}`} className='bg-white'>
                {indicatorIndex === 0 && (
                  <td
                    rowSpan={goal.indicators.length}
                    className='p-4 border border-gray-200 align-middle bg-grey-100'
                  >
                    <p>{goal.individualGoal}</p>
                    <div className='flex items-center'>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsStrategicGoals(!isStrtegicGoals);
                        }}
                        className='bg-transparent shadow-none hover:bg-transparent text-sm underline text-primary p-0'
                      >
                        الأهداف الاستراتيجية
                      </Button>
                      {isStrtegicGoals ? (
                        <ChevronUpIcon size={18} className='text-primary' />
                      ) : (
                        <ChevronDownIcon size={18} className='text-primary' />
                      )}
                    </div>
                  </td>
                )}
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.indicatorPerformance}
                </td>
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.indicatorWeight}
                </td>
                {indicatorIndex === 0 ? (
                  <td
                    rowSpan={goal.indicators.length}
                    className='border border-gray-200 align-middle text-center bg-primary-opacity'
                  >
                    <PieChartElem
                      size={2}
                      thickness={8}
                      percentage={totalIndicatorWeight}
                      percentageSize='text-base'
                      percentageColor='fill-foreground'
                      nameKey='stat'
                      dataKey='percentage'
                      chartConfig={pieChartConfig}
                      chartData={indicatorWeightChartData}
                      pieChartHeight='64'
                    />
                  </td>
                ) : null}
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.achievementSteps}
                </td>
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.indicatorScale}
                </td>
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.targetType === 'number' ? 'رقم' : 'تاريخ'}
                </td>
                <td className='p-4 border border-gray-200 align-middle text-center'>
                  {indicator.targetValue}
                </td>
                {indicatorIndex === 0 && (
                  <td
                    rowSpan={goal.indicators.length}
                    className='border border-gray-200 align-middle text-center bg-primary-opacity'
                  >
                    <PieChartElem
                      size={2}
                      thickness={8}
                      percentage={totalGoalWeight}
                      percentageSize='text-base'
                      percentageColor='fill-foreground'
                      nameKey='stat'
                      dataKey='percentage'
                      chartConfig={pieChartConfig}
                      chartData={goalWeightChartData}
                      pieChartHeight='64'
                    />
                  </td>
                )}
                {indicatorIndex === 0 && (
                  <td className='p-4 align-middle text-center flex flex-col gap-3'>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className='flex group gap-1 items-center shadow-none hover:bg-primary hover:text-white text-primary bg-primary-opacity rounded-xl px-4 py-2.5'
                    >
                      <PencilIcon className='fill-primary group-hover:fill-white' />
                      تعديل
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className='flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5'
                    >
                      <TrashIcon className='fill-destructive-foreground group-hover:fill-white' />
                      حذف
                    </Button>
                  </td>
                )}
              </tr>
            ));
          })}
        </tbody>
      </table>
      {isStrtegicGoals && <StrategicGoals goalsData={goalsData} />}
    </div>
  );
};
