"use server"

import { getUserId } from "@server"
import { getUser } from "."

export const getDemo = async (): Promise<boolean> => {
  return false
  // const userId = await getUserId()
  // // if (!userId) throw new Error("User not found")
  // if (!userId) {
  //   console.warn("User ID not found, returning true for demo status")
  //   return true
  // }

  // const user = await getUser(userId)
  // return user.demo
}
