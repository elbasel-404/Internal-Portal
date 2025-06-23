"use server"

import { createData } from "../../../../../lib/createData"
import { requestBodySchema } from "./requestBodySchema"

export const formAction = async (formData: FormData) => {
  const endpointUrl = "api/po/salary/identification/request/create"

  const result = await createData(endpointUrl, requestBodySchema, formData)

  return result
}
