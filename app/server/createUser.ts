'use server';

import { db } from '@db';
import { defaultUser } from '../lib/defaultUser';
import { setUserId } from './setUserId';

export const createUser = async () => {
  await db.read();

  // get counts
  const userCount = db.data.userCount;

  // add user to database
  const userId = userCount + 1;
  const newUser = JSON.parse(JSON.stringify(defaultUser));
  db.data.users.push({
    ...newUser,
    id: userId,
  });

  // update user count
  db.data.userCount = userCount + 1;

  await db.write();

  // Set user Id in cookies
  await setUserId(userId);
  return newUser;
};
