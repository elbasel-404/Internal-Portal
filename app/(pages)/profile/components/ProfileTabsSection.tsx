'use client';

import { RequestLabel } from '@types';
import { Tabs } from '@ui';
import { cn } from '@utils';
import { ReactNode, useMemo, useState } from 'react';
import { profileTabs } from './ProfileTabs';

interface ProfileDetailsProps {
  personalDataDetails: { label: RequestLabel; value: ReactNode }[];
  workDataDetails: { label: RequestLabel; value: ReactNode }[];
  contactInformationDetails: { label: RequestLabel; value: ReactNode }[];
}

export const ProfileTabs = ({
  personalDataDetails,
  workDataDetails,
  contactInformationDetails,
}: ProfileDetailsProps) => {
  const [activeProfileTab, setActiveProfileTab] =
    useState<string>('personalData');


  const currentData = useMemo(() => {
    switch (activeProfileTab) {
      case 'workData':
        return workDataDetails;
      case 'contactInformation':
        return contactInformationDetails;
      default:
        return personalDataDetails;
    }
  }, [
    activeProfileTab,
    personalDataDetails,
    workDataDetails,
    contactInformationDetails,
  ]);

  const rows = useMemo(() => {
    const tempRows = [];
    for (let i = 0; i < currentData.length; i += 2) {
      tempRows.push(currentData.slice(i, i + 2));
    }
    return tempRows;
  }, [currentData]);

  return (
    <div className='space-y-6'>
      <Tabs
        tabs={profileTabs}
        activeTab={activeProfileTab}
        onTabChange={setActiveProfileTab}
        tabClassName='h-12 w-full text-xl bg-grey-50 font-bold rounded-lg flex gap-3 justify-start px-4 py-8 items-center'
        activeTabClassName='font-bold text-forground text-lg text-primary rounded-lg bg-primary-opacity'
        tabSectionClassName='gap-2 mt-2 flex-wrap md:flex-nowrap'
      />
      <div>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              'grid grid-cols-2',
              rowIndex % 2 === 0 ? 'bg-grey-50' : ''
            )}
          >
            {row.map(({ label, value }, index) => (
              <div key={index} className='py-[22px] md:flex'>
                <div className='mx-3 md:basis-1/4 md:flex-1 md:max-w-[30%]'>
                  {label}
                </div>
                <div className='font-medium mx-3 text-darkBlue'>{value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
