"use server"

import { createData } from "../../../../lib/createData"
// @ts-ignore - Path will resolve at runtime
import { requestBodySchema } from "./requestBodySchema"

export async function formAction(formData: FormData) {
  // This is an example endpoint - in a real application, use a valid endpoint
  const endpointUrl = "api/po/hr/example/create"
  return createData(endpointUrl, requestBodySchema, formData)
}
