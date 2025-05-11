import type { HomePageSlotKey } from '@types';
import type { ReactNode } from 'react';

export const filterSlots = (
  slots: { key: HomePageSlotKey; node: ReactNode }[],
  keys: string[]
) => {
  const mappedSlots = keys.map((key) => {
    const slot = slots.find(({ key: slotKey }) => slotKey === key);
    return slot;
  });
  const filteredSlots = mappedSlots.filter((slot) => slot !== undefined);
  return filteredSlots;
};
