// app/(pages)/home/layout.tsx
import { getUserId } from '@server';
import { type ReactNode } from 'react';
import { getUser } from '@db/actions';
import { createInitialSlots, filterSlots, renderLayout } from './util';
import { HomePageSlotKey } from '@types';

export interface HomePageLayoutProps {
  children: ReactNode;
  completeProfile: ReactNode;
  generalInfo: ReactNode;
  userInfo: ReactNode;
  attendance: ReactNode;
  approvalRequestsTable: ReactNode;
  sliders: ReactNode;
  news: ReactNode;
  timelineCalendar: ReactNode;
}

export const dynamic = 'force-dynamic';

const HomePageLayout = async ({
  children,
  completeProfile,
  generalInfo,
  userInfo,
  attendance,
  approvalRequestsTable,
  sliders,
  timelineCalendar,
  news,
}: HomePageLayoutProps): Promise<ReactNode> => {
  const initSlots = createInitialSlots({
    children,
    completeProfile,
    generalInfo,
    userInfo,
    attendance,
    approvalRequestsTable,
    sliders,
    timelineCalendar,
    news,
  });

  const userId = await getUserId();
  if (!userId)
    return renderLayout({ slotsToRender: initSlots, children, userId });

  const user = await getUser(userId);
  const activeSlotKeys = user.activeHomePageSlotsKeys || [];
  const slotsToRender = filterSlots(initSlots, activeSlotKeys);
  const visuallyHiddenKeys: HomePageSlotKey[] = [];
  if (user.activeNewsTabsKeys.length === 0) visuallyHiddenKeys.push('news');

  return renderLayout({ slotsToRender, children, userId, visuallyHiddenKeys });
};

export default HomePageLayout;
