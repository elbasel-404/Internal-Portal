import { HomePageSlot } from '@types';

type Args = {
  slots: HomePageSlot[];
};

export const sortHomePageSlots = ({ slots }: Args) => {
  return slots.toSorted((a, b) => a.index - b.index);
};
