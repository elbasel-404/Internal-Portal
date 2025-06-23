"use server"

import { getUserId } from "@server"
// import { setDemo } from "./setDemo"

export const enableDemo = async () => {
  const userId = await getUserId()
  if (!userId) return
  // await setDemo({ userId, demo: true })
}
