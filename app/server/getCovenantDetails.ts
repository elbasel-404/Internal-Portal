'use server';

import type { CovenantDetails } from '@types';

export const getCovenantDetails = async (): Promise<CovenantDetails[]> => {
  return CovenantDetailsDummyData;
};

const CovenantDetailsDummyData: CovenantDetails[] = [
  {
    product: 'المنتج',
    statement: 'بيان المنتج',
    amount: 1000,
    invoiceNumber: 12354,
    attachments: '',
  },
  {
    product: 'المنتج',
    statement: 'بيان المنتج',
    amount: 2000,
    invoiceNumber: 12354,
    attachments: '',
  },
  {
    product: 'المنتج',
    statement: 'بيان المنتج',
    amount: 1000,
    invoiceNumber: 18632,
    attachments: '',
  },
  {
    product: 'المنتج',
    statement: 'بيان المنتج',
    amount: 1000,
    invoiceNumber: 14585,
    attachments: '',
  },
  {
    product: 'المنتج',
    statement: 'بيان المنتج',
    amount: 1000,
    invoiceNumber: 84651,
    attachments: '',
  },
];
