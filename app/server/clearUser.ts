"use server";

import { cookies } from "next/headers";

export const clearUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("userId");
};
