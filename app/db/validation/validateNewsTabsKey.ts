"use server"

import { newsTabsKeyEnum } from "@zodSchemas"

export const validateNewsTabsKey = async (key: string) => {
  const keyValidation = newsTabsKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    return null
  }
  return keyValidation.data
}
