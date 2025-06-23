"use server"

import { createData } from "../../../../../lib/createData"
import { requestBodySchema } from "./requestBodySchema"

export async function formAction(formData: FormData) {
  const endpointUrl = "api/po/hr/authorization/create"
  return createData(endpointUrl, requestBodySchema, formData)
}
