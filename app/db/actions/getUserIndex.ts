'use server';

import { throwError } from '@utils';
import { getAllUsers } from './getAllUsers';
import { ErrorMessage } from '@lib';

export const getUserIndex = async (userId: number) => {
  const allUsers = await getAllUsers();
  const userIndex = allUsers.findIndex(({ id }) => id === userId);
  if (userIndex === -1) {
    console.error('/app/db/actions/getUserIndex.ts');
    return throwError(ErrorMessage.invalidUserId);
  }
  return userIndex;
};
