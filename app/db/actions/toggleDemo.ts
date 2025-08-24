"use server"

import { cookies } from "next/headers"
import { getDemo } from "./getDemo"
import { revalidatePath } from "next/cache"

export const toggleDemo = async () => {
  // return { isDemo: false }
  const isDemo = await getDemo()
  const cookieStore = await cookies()
  const demoLogin = cookieStore.get("demoLogin")?.value === "true"
  if (demoLogin) {
    return {
      isDemo: true,
      error:
        "Cannot disable demo mode while logged in as demo user, please log out and sign in with a real user",
    }
  }
  if (isDemo) {
    cookieStore.set("demo", "false")
  } else {
    cookieStore.set("demo", "true")
  }
  revalidatePath("/home")
  return { isDemo: !isDemo, error: null }
}
