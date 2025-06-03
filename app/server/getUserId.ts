"use server"

import { cookies } from "next/headers"
// import { headers } from 'next/headers';

export const getUserId = async () => {
  const cookiesStore = await cookies()
  const userId = cookiesStore.get("userId")?.value

  if (!userId) return
  const isNan = Number.isNaN(parseInt(userId))

  if (isNan) return

  return parseInt(userId)
}

// export const getUserId = async () => {
//   const headersStore = await headers();
//   const userId = headersStore.get('x-user-id');

//   if (!userId) return;
//   const isNan = Number.isNaN(parseInt(userId));

//   if (isNan) return;

//   return parseInt(userId);
// };
