'use client';

import { BellIcon, MemoCircleCheckIcon, NoteCheckIcon, PaperPlaneIcon } from '@icons';
import { NotificationItem } from '@types';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@ui';
import { useState } from 'react';

interface NotificationProps {
  notifications: NotificationItem[];
}

const iconMap = {
  MemoCircleCheckIcon: <MemoCircleCheckIcon width={20} height={20} />,
  NoteCheckIcon: <NoteCheckIcon width={20} height={20} />,
  PaperPlaneIcon: <PaperPlaneIcon width={20} height={20} />,
};

export const Notification = ({ notifications }: NotificationProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  // Filter notifications based on the active tab
  const filteredNotifications =
    activeTab === 'all'
      ? notifications
      : notifications.filter((notification) => notification.unread);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='relative bg-secondary shadow-none hover:bg-secondary'
          size='icon'
          icon={<BellIcon />}
        >
          <span className='absolute top-1 right-3.5 block h-2 w-2 bg-red-500 rounded-full' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='py-4 px-2.5 bg-white rounded-xl shadow-md sm:w-full'
      >
        <div className='flex flex-col justify-between items-start mb-4 gap-4'>
          <h2 className='text-2xl font-bold'>الإشعارات</h2>
          <div className='flex gap-2'>
            <Button
              onClick={() => setActiveTab('all')}
              className={`p-2.5 rounded-full shadow-none hover:bg-primary hover:text-white ${
                activeTab === 'all'
                  ? 'bg-primary-opacity text-black'
                  : 'bg-cloudGray text-black'
              }`}
            >
              الكل
            </Button>
            <Button
              onClick={() => setActiveTab('unread')}
              className={`py-2.5 px-4 rounded-full shadow-none hover:bg-primary hover:text-white ${
                activeTab === 'unread'
                  ? 'bg-primary-opacity text-black'
                  : 'bg-cloudGray text-black'
              }`}
            >
              غير مقروء
            </Button>
          </div>
        </div>
        <hr />
        <ul>
          {filteredNotifications.map((notification, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 p-2.5 rounded-lg border-b border-[#F1F4F7] bg-white mb-2`}
            >
              <Button
                size='icon'
                variant='secondary'
                icon={iconMap[notification.icon as keyof typeof iconMap]}
                className='p-2.5 bg-primary-opacity'
              />
              <div className='flex-1'>
                <p className='text-sm text-gray-500'>
                  {notification.time} - {notification.date}
                </p>
                <p className='text-sm text-foreground text-wrap truncate'>
                  {notification.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Button className='w-full mt-4 p-2.5 text-primary text-sm font-semibold bg-cloudGray rounded-full shadow-none hover:bg-primary-opacity'>
          عرض جميع الإشعارات
        </Button>
      </PopoverContent>
    </Popover>
  );
};
