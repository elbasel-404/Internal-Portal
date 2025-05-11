'use client';

import { isSideBarOpenAtom } from '@atoms';
import { useIsMobile } from '@hooks';
import { cn } from '@utils';
import { useAtomValue } from 'jotai';

interface NavBarPaddingProps {
  className?: string;
}

export const NavBarPadding = ({ className }: NavBarPaddingProps) => {
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom);
  const isMobileScreen = useIsMobile();

  return (
    <div
      className={cn(
        `w-0 lg:w-[71px] h-[34px] transition-all duration-500 ${className}`,
        isSideBarOpen && !isMobileScreen && '!w-[280px]'
      )}
    ></div>
  );
};
