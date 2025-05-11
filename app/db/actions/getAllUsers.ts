import { db } from "@db";
import { validateAllUsers } from "@db/validation";

export const getAllUsers = async () => {
  await db.read();
  const allUsers = db.data.users;
  const validAllUsers = await validateAllUsers(allUsers);
  return validAllUsers;
};
