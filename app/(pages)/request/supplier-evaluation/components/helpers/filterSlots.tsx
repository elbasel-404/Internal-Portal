import type { ReactNode } from 'react';

export const filterSlots = (
  slots: { key: string; title: string; node: ReactNode }[],
  keys: string[]
) => {
  const mappedSlots = keys.map((key) => {
    const slot = slots.find(({ key: slotKey }) => slotKey === key);
    return slot;
  });
  const filteredSlots = mappedSlots.filter((slot) => slot !== undefined);
  return filteredSlots;
};
