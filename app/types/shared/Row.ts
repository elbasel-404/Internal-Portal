import { ReactNode } from 'react';

export interface Row {
  id: string;
  description?: string;
  date?: string;
  [key: string]: string | number | ReactNode | undefined;
}
