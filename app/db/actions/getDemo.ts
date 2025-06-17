"use server"

import { getUserId } from "@server"
import { getUser } from "."

export const getDemo = async (): Promise<boolean> => {
  return false
  // const userId = await getUserId()
  // if (!userId) {
  //   return true
  // }

  // const user = await getUser(userId)
  // return user.demo
}
