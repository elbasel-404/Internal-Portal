"use server"

import { cookies } from "next/headers"

export const deleteUserId = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete("userId")
}
