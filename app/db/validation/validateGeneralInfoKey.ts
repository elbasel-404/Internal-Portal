"use server"

import { generalInfoKeyEnum } from "@zodSchemas"

export const validateGeneralInfoKey = async (key: string) => {
  const keyValidation = generalInfoKeyEnum.safeParse(key)
  if (!keyValidation.success) {
    console.error("Invalid general info key: ", key)
    return null
  }
  return keyValidation.data
}
