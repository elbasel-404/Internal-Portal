'use client';

import {
  BlueSandWatchIcon,
  GreenCheckMarkIcon,
  PersonIcon,
  WhiteCheckMarkIcon,
  XMarkIcon2,
} from '@icons';
import type { RequestStatus as RequestType } from '@types';
import { Button } from '@ui';
import { cn } from '@utils';
import { Fragment, useEffect, useState } from 'react';

interface RequestStatusProps {
  status: RequestType[];
  caption?: string;
}
export const RequestStatus = ({ status, caption }: RequestStatusProps) => {
  const [showCaption, setShowCaption] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const length = status.length - 1;
  const stat = status[length]?.status;
  const currentStatus = status[status.length - 2].title;

  useEffect(() => {
    if (stat === '') {
      setRejected(true);
      setAccepted(false);
    } else if (stat === 'completed') {
      setAccepted(true);
      setRejected(false);
    }
  }, [stat]);

  return (
    <div className='bg-white pt-4 pb-4 px-4 rounded-lg space-y-4'>
      <div className='bg-[#FAFCFE] flex flex-col lg:flex-row items-center px-2 lg:px-8 p-6'>
        {status.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, title, subtitle, status, icon }, index) => {
            const isLast = index === length;
            const requestIcon = icons[icon as keyof typeof icons];
            return (
              <Fragment key={Number(id) + index}>
                <div
                  className={cn(
                    'relative h-32 flex lg:block w-full lg:w-auto',
                    isLast && 'lg:ml-16'
                  )}
                  key={id}
                >
                  <div
                    className={`relative h-16 w-16 flex flex-col justify-center items-center ${
                      icon === 'personConfirmed'
                        ? 'bg-primary border-none'
                        : 'bg-white border-blue-50'
                    } rounded-full border-[3px]`}
                  >
                    {requestIcon}
                    <div className='absolute w-8 h-8 rounded-full top-0 ml-16'>
                      {subIcons[status]}
                    </div>
                  </div>
                  <h2
                    className={`text-sm w-max mr-20 lg:mr-0 mt-4 absolute ${
                      status === 'in-progress' && 'text-grey-400'
                    }`}
                  >
                    {title}
                  </h2>
                  <p
                    className={`${
                      status === 'in-progress'
                        ? 'text-blue-300'
                        : 'text-primary'
                    } mt-8 mr-20 lg:mr-0 absolute w-max`}
                  >
                    {subtitle}
                  </p>
                </div>
                <Separator isLast={isLast} />
              </Fragment>
            );
          }
        )}
      </div>
      {showCaption && (
        <>
          <RequestCaption
            caption={
              rejected
                ? 'تم رفض الطلب'
                : accepted
                ? 'تم اعتماد الطلب'
                : `انت الأن في مرحلة ${currentStatus} و بإنتظار الموافقة`
            }
            onClose={() => setShowCaption(false)}
            rejected={rejected}
            accepted={accepted}
          />
          <p className='hidden'>{caption}</p>
        </>
      )}
    </div>
  );
};

interface SeparatorProps {
  isLast: boolean;
  dataKey?: string;
}
const Separator = ({ isLast, dataKey }: SeparatorProps) => {
  if (isLast) return null;
  return (
    <div className='h-16 flex-1 mr-2 ml-4'>
      <div data-key={dataKey} className='h-1 bg-grey-200 flex-1' />
    </div>
  );
};

const RequestCaption = ({
  caption,
  onClose,
  rejected,
  accepted,
}: {
  caption: string;
  onClose: () => void;
  rejected: boolean;
  accepted: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between ${
        rejected && 'bg-red-100'
      } ${accepted ? 'bg-success' : 'bg-primary-opacity'} py-4 px-4 rounded-lg`}
    >
      <p
        className={`
          ${
            accepted
              ? 'text-success-foreground'
              : rejected
              ? `text-destructive-foreground`
              : 'text-primary'
          }
          font-medium
        `}
      >
        {caption}
      </p>
      <Button onClick={onClose} className='bg-transparent shadow-none p-0'>
        <XMarkIcon2
          className={`${rejected && 'fill-red-500'} ${
            accepted ? 'fill-success-foreground' : 'fill-primary'
          } hover:cursor-pointer`}
        />
      </Button>
    </div>
  );
};

const icons: { [key: string]: JSX.Element } = {
  person: <PersonIcon className='fill-white' />,
  personConfirmed: (
    <PersonIcon className='fill-transparent' strokeStyle='#fff' />
  ),
};

const subIcons: { [key: string]: JSX.Element } = {
  pending: <WhiteCheckMarkIcon />,
  'in-progress': <BlueSandWatchIcon />,
  completed: <GreenCheckMarkIcon />,
};
