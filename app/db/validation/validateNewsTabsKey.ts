"use server"

import { newsTabsKeyEnum } from "@zodSchemas"

export const validateNewsTabsKey = async (key: string) => {
  const keyValidation = newsTabsKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    console.error("Invalid general info key: ", key)
    return null
  }
  return keyValidation.data
}
