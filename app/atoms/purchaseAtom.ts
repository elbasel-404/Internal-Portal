'use client';

import { AttachmentType, FileWithId, PurchaseType, YesNoOption } from '@types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Basic information atoms
export const purchaseTypeAtom = atomWithStorage<PurchaseType>(
  'purchaseType',
  'operational'
);
export const addressRequestAtom = atomWithStorage<string>('addressRequest', '');
export const descriptionAtom = atomWithStorage<string>('description', '');
export const requestOutputsAtom = atomWithStorage<string>('requestOutputs', '');

// Attachments atoms
export const selectedAttachmentTypesAtom = atomWithStorage<AttachmentType[]>(
  'selectedAttachmentTypes',
  []
);
export const filesAtom = atomWithStorage<FileWithId[]>('files', []);

// Project details atoms
export const planTypeAtom = atomWithStorage<string>('planType', '');
export const programNameAtom = atomWithStorage<string>('programName', '');
export const projectNameAtom = atomWithStorage<string>('projectName', '');
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
export const costsAtom = atom<number>(0);
export const batchAmount = atomWithStorage<number>('batchAmount', 0);

// Requirements atoms
export const institutionalDiscriminationAtom = atomWithStorage<YesNoOption>(
  'institutionalDiscrimination',
  ''
);
export const instFilesAtom = atomWithStorage<FileWithId[]>('instFiles', []);

export const cyberSecurityAtom = atomWithStorage<YesNoOption>(
  'cyberSecurity',
  ''
);
export const securityFilesAtom = atomWithStorage<FileWithId[]>(
  'securityFiles',
  []
);

export const dataGovernanceAtom = atomWithStorage<YesNoOption>(
  'dataGovernance',
  ''
);
export const dataFilesAtom = atomWithStorage<FileWithId[]>('dataFiles', []);

/**
 * Helper functions for file operations
 */
export const createFileHandler = (
  getAtom: () => FileWithId[],
  setAtom: (files: FileWithId[]) => void
) => {
  return {
    upload: (uploadedFiles: FileList | null) => {
      if (!uploadedFiles) return;

      const newFiles = Array.from(uploadedFiles).map(
        (file) =>
          ({
            id: crypto.randomUUID(),
            name: file.name,
          } as FileWithId)
      );

      setAtom([...getAtom(), ...newFiles]);
    },
    remove: (id: string) => {
      const updatedFiles = getAtom().filter((file) => file.id !== id);
      setAtom(updatedFiles);
    },
  };
};
