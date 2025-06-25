"use server"

import { getStoredEmployeeId } from "@auth"
import { z } from "zod"
import { CreateErrorSchema } from "../../../../../../api-schemas/CreateErrorSchema"
import { CreateSuccessSchema } from "../../../../../../api-schemas/CreateSuccessSchema"
import { getFetchHeaders } from "../../../../../server/getFetchHeaders"
import { requestBodySchema } from "./requestBodySchema"
import { State } from "./State"

export const formAction = async (formData: FormData): Promise<State> => {
  // ! ==================================
  // ! VARIABLES
  // ! ==================================
  const endpointUrl = "api/po/hr/training-request/create"
  const rootUrl = process.env.API_ROOT_URL
  const fetchHeaders = await getFetchHeaders()
  const detailsHeaders = fetchHeaders?.headers
  if (!detailsHeaders) {
    return {
      success: false,
      errors: ["Failed to get fetchHeaders"],
      id: null,
    }
  }

  const requestBody = Object.fromEntries(formData.entries())
  const employeeId = await getStoredEmployeeId()
  if (!employeeId) {
    return {
      success: false,
      errors: ["Failed to get employee ID"],
      id: null,
    }
  }
  requestBody["employee_id"] = employeeId
  if (requestBody["extended_training"] === "on") {
    requestBody["extended_training"] = "true"
  } else {
    requestBody["extended_training"] = "false"
  }
  const fetchUrl = `${rootUrl}/${endpointUrl}`

  const headers = new Headers()
  headers.append("Authorization", detailsHeaders.Authorization)
  headers.append("x-api-key", detailsHeaders["x-api-key"])

  // ! ==================================
  // ! VALIDATION
  // ! ==================================
  const validation = requestBodySchema.safeParse(requestBody)

  if (!validation.success) {
    const validationErrors = validation.error.format()
    const errors: string[] = []

    for (const [, value] of Object.entries(validationErrors)) {
      if (
        typeof value === "object" &&
        value !== null &&
        "_errors" in value &&
        Array.isArray(value._errors)
      ) {
        const firstError: string | undefined = value._errors[0]
        if (firstError) {
          errors.push(firstError)
        }
      }
    }

    return {
      success: false,
      errors,
      id: null,
    }
  }

  const validatedRequestBody = validation.data

  // ! ==================================
  // ! FETCH
  // ! ==================================
  const fetchFormData = new FormData()
  type RequestBody = z.infer<typeof requestBodySchema>

  const validatedRequestBodyEntries = Object.entries(
    validatedRequestBody as RequestBody,
  )

  validatedRequestBodyEntries.forEach(([key, value]) => {
    fetchFormData.append(key, value as string | File)
  })

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers,
    body: fetchFormData,
  })

  const responseJson = await response.json()
  if (!Array.isArray(responseJson) || responseJson.length === 0) {
    // handle the case where the response is not an array or is empty
  }
  const responseObject = responseJson.at(0)

  const isBadRequest = response.status >= 400 && response.status < 500
  if (isBadRequest) {
    const validatedResponseObject = CreateErrorSchema.parse(responseObject)
    const { error } = validatedResponseObject

    return {
      success: false,
      errors: [error],
      id: null,
    }
  }

  const validatedResponseObject = CreateSuccessSchema.parse(responseObject)
  const { data } = validatedResponseObject

  return { success: true, errors: null, id: data.id }
}
