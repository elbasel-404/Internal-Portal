import { atomWithStorage } from 'jotai/utils';

export const trainingMethodAtom = atomWithStorage<string>(
  'trainingMethod',
  'internal'
);
