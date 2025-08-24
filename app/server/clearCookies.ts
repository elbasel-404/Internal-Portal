"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const clearCookies = async () => {
  const cookieStore = await cookies()
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name)
  })
  revalidatePath("/")
  redirect("/home")
}
