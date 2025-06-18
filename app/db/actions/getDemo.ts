"use server"

// import { getUserId } from "@server"
// import { getUser } from "."
// import { cookies } from "next/headers"

export const getDemo = async (): Promise<boolean> => {
  return false
  // const cookieStore = await cookies()
  // const isDemo = cookieStore.get("demo")?.value
  // if (isDemo === "true") return true
  // return false
  // const userId = await getUserId()
  // if (!userId) {
  //   return true
  // }

  // const user = await getUser(userId)
  // return user.demo
}
