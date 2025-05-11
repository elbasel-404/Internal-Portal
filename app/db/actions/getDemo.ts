'use server';

import { getUserId } from '@server';
import { getUser } from '.';

export const getDemo = async (): Promise<boolean> => {
  const userId = await getUserId();
  if (!userId) throw new Error('User not found');

  const user = await getUser(userId);
  return user.demo;
};
