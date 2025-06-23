"use server"

import { generalInfoKeyEnum } from "@zodSchemas"

export const validateGeneralInfoKey = async (key: string) => {
  const keyValidation = generalInfoKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    return null
  }
  return keyValidation.data
}
