"use server";

import { paths } from '@lib';
import { revalidatePath } from 'next/cache';

export const revalidateHomePage = async () => {
  revalidatePath(paths.home.href, 'layout');
};
