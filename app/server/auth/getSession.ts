"use server";

import { cookies } from "next/headers";

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return session;
};
