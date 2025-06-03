"use server"

import { homePageSlotKeyEnum } from "@zodSchemas"

export const validateHomePageSlotKey = async (key: string) => {
  const keyValidation = homePageSlotKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    console.error("Invalid home page slot key:", key)
    return null
  }
  return keyValidation.data
}
