"use server"

import { homePageSlotKeyEnum } from "@zodSchemas"

export const validateHomePageSlotKey = async (key: string) => {
  const keyValidation = homePageSlotKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    return null
  }
  return keyValidation.data
}
