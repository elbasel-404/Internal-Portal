import type { Route } from 'next';

export type RelatedUser = {
  id: string;
  image: string;
  name: string;
  position: string;
  phone: string;
  recycleWork: string;
  address: string;
  email: string;
  department: string;
  workType: string;
  link?: Route;
};
