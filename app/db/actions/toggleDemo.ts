"use server"

import { cookies } from "next/headers"
import { getDemo } from "./getDemo"
import { revalidatePath } from "next/cache"

export const toggleDemo = async () => {
  // return { isDemo: false }
  const isDemo = await getDemo()
  const cookieStore = await cookies()
  if (isDemo) {
    cookieStore.set("demo", "false")
  } else {
    cookieStore.set("demo", "true")
  }
  revalidatePath("/home")
  return { isDemo: !isDemo }
}
