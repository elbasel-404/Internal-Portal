"use server"

import { createData } from "../../../../../lib/createData"
import { requestBodySchema } from "./requestBodySchema"

export async function formAction(formData: FormData) {
  const endpointUrl = "api/purchase/request/create/po"
  return createData(endpointUrl, requestBodySchema, formData)
}
