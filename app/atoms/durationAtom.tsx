import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const dateFromAtom = atomWithStorage<Date>('dateFrom', new Date());
export const dateToAtom = atomWithStorage<Date>('dateTo', new Date());

export const durationAtom = atom<string>((get) => {
  const dateFrom = get(dateFromAtom);
  const dateTo = get(dateToAtom);

  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays > 0 ? `${diffDays.toString()} يوم` : '1 يوم';
});
