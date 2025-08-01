"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  cookieStore.delete("employeeId")
  cookieStore.set("demo", "false")
  revalidatePath("/")
  redirect("/home")
}
