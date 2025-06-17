"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  cookieStore.delete("userId")
  cookieStore.delete("employeeId")
  revalidatePath("/", "layout")
}
