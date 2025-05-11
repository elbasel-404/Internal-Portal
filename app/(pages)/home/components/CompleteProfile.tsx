'use client';

import { ArrowDownIcon, ArrowLeftIcon, RenewIcon } from '@icons';
import { colors } from '@lib';
import { Button, PieChartElem } from '@ui';
import Link from 'next/link';
import { useState } from 'react';

interface CompleteProfileProps {
  percent: number;
  progressItems: { title: string; percentage: number; link: string }[];
}

export const CompleteProfile = ({
  percent,
  progressItems,
}: CompleteProfileProps) => {
  const [showProgressBarCard, setShowProgressBarCard] = useState(false);

  const pieChartData = [
    { stat: 'مكتمل', percentage: percent, fill: 'var(--color-completed)' },
    {
      stat: 'غير مكتمل',
      percentage: 100 - percent,
      fill: 'var(--color-notCompleted)',
    },
  ];

  const pieChartConfig = {
    completed: {
      label: 'مكتمل',
      color: colors.light.primary,
    },
    notCompleted: {
      label: 'غير مكتمل',
      color: colors.light.white,
    },
  };

  const toggleProfileCards = () => {
    setShowProgressBarCard((prev) => !prev);
  };

  return (
    <div className='relative bg-[#007C9E24] p-4 border-b-2 border-primary rounded-xl'>
      <div className={`flex justify-between items-center`}>
        <div className='flex gap-4 items-center'>
          <div>
            <span className='bg-primary flex items-center justify-center h-16 w-16 rounded-xl'>
              <RenewIcon className='-mr-6' />
            </span>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <h2 className='text-primary font-bold text-lg'>
              اكتمال الملف الشخصي
            </h2>
            <Button
              size='sm'
              icon={
                <span className='bg-white rounded-full w-6 h-6 flex items-center justify-center'>
                  {showProgressBarCard ? (
                    <ArrowDownIcon
                      width={11}
                      height={11}
                      className='fill-foreground'
                    />
                  ) : (
                    <ArrowLeftIcon
                      width={11}
                      height={11}
                      className='fill-foreground'
                    />
                  )}
                </span>
              }
              iconRight={false}
              className={`rounded-full pl-1 bg-background shadow-none hover:bg-background`}
              onClick={toggleProfileCards}
            >
              <span className={`text-sm font-light text-foreground`}>
                {'اكمل الآن'}
              </span>
            </Button>
          </div>
        </div>

        <div className='flex items-center h-16'>
          <PieChartElem
            size={2}
            thickness={8}
            percentage={percent}
            percentageSize='text-base'
            percentageColor='fill-primary font-bold'
            nameKey='stat'
            dataKey='percentage'
            chartConfig={pieChartConfig}
            chartData={pieChartData}
            pieChartHeight='64'
          />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showProgressBarCard
            ? 'max-h-[400px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
          {progressItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className='bg-white rounded-lg p-3 flex flex-col'
            >
              <div className='flex justify-between items-center'>
                <div className='text-shadowBlue text-sm font-medium truncate'>
                  {item.title}
                </div>
                <div className='text-primary font-bold text-lg'>
                  {item.percentage}%
                </div>
              </div>
              <div className='w-full bg-secondary h-1.5'>
                <div
                  className='bg-primary h-1.5'
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
