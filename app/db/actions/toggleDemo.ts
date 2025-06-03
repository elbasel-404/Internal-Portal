"use server"

import { disableDemo } from "./disableDemo"
import { enableDemo } from "./enableDemo"
import { getDemo } from "./getDemo"

export const toggleDemo = async () => {
  const isDemo = await getDemo()
  console.log({ isDemo })
  if (isDemo) return await disableDemo()

  return await enableDemo()
}
