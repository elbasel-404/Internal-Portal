import type { HomePageSlotKey } from './HomePageSlotKey';

export type HomePageSlot = {
  id: number;
  title?: string;
  key: HomePageSlotKey;
  active: boolean;
  index: number;
  userId?: number;
  slotType: 'homePage';
};
