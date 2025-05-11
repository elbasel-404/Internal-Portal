import type { HomePageSlotKey } from '@types';
import type { ReactNode } from 'react';
import type { HomePageLayoutProps } from '../layout';

export const createInitialSlots = (
  props: HomePageLayoutProps
): { key: HomePageSlotKey; node: ReactNode }[] => [
  { node: props.completeProfile, key: 'completeProfile' },
  { node: props.generalInfo, key: 'generalInfo' },
  { node: props.userInfo, key: 'userInfo' },
  { node: props.attendance, key: 'attendance' },
  { node: props.approvalRequestsTable, key: 'approvalRequestsTable' },
  { node: props.sliders, key: 'sliders' },
  { node: props.timelineCalendar, key: 'timelineCalendar' },
  { node: props.news, key: 'news' },
];
