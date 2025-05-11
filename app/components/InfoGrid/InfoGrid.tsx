'use client';

import { isSideBarOpenAtom } from '@atoms';
import type { GeneralInfo } from '@types';
import { cn } from '@utils';
import { useAtomValue } from 'jotai';
import { Animate } from '../Animate';
import { InfoCard } from './InfoCard';

interface InfoGridProps {
  info: GeneralInfo[];
  className?: string;
}

export const InfoGrid = ({ info, className }: InfoGridProps) => {
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom);

  return (
    <Animate
      className={cn(
        // 'grid lg:grid-cols-3 gap-6 grid-cols-1 sm:grid-cols-2',
        'flex flex-wrap gap-6',
        className
      )}
    >
      {info.map((i) => {
        return (
          <div
            key={i.id}
            className='md:flex-grow-[1] w-full md:w-[calc(50%-24px)] lg:w-[calc(30%-24px)] transition-all duration-500 '
          >
            <InfoCard isSideBarOpen={isSideBarOpen} info={i} />
          </div>
        );
      })}
    </Animate>
  );
};
