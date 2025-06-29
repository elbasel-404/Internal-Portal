"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const clearUser = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete("userId")
  revalidatePath("/", "layout")
  redirect("/home")
}
