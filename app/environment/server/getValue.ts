"use server"

import { environmentStorage } from "@storage"

export const getValue = async (key: string) => {
  const bearerToken = await environmentStorage.get(key)
  return bearerToken?.toString()
}
