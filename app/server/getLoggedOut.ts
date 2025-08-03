"use server"

import { cookies } from "next/headers"

export const getLoggedOut = async () => {
  const cookieStore = await cookies()
  const loggedOut = cookieStore.get("logged_out")?.value
  if (!loggedOut) return false
  if (loggedOut === "true") return true
  if (loggedOut === "false") return false
}
