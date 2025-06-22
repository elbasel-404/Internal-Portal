"use server"

import { z } from "zod"
import { getFetchHeaders } from "../server/getFetchHeaders"
import { CreateErrorSchema } from "../../api-schemas/CreateErrorSchema"
import { CreateSuccessSchema } from "../../api-schemas/CreateSuccessSchema"
import { getStoredEmployeeId } from "@auth"

export interface State {
  success: boolean
  errors: string[] | null
  id: number | null
}

export async function createData<T extends Record<string, unknown>>(
  endpointUrl: string,
  requestBodySchema: z.ZodType<T, z.ZodTypeDef>,
  formData: FormData,
  massageBody?: (
    body: Record<string, FormDataEntryValue>,
  ) => Record<string, FormDataEntryValue>,
): Promise<State> {
  // ! ==================================
  // ! VARIABLES
  // ! ==================================
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

  let requestBody = Object.fromEntries(formData.entries())
  const employeeId = await getStoredEmployeeId()
  requestBody["employee_id"] = employeeId || ""

  if (massageBody) {
    requestBody = massageBody(requestBody)
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
    const formattedErrors = validation.error.flatten()
    const fieldErrors = Object.values(formattedErrors.fieldErrors)
      .flat()
      .filter((e): e is string => e !== undefined)
    const formErrors = formattedErrors.formErrors
    const allErrors = [...formErrors, ...fieldErrors]

    return {
      success: false,
      errors: allErrors.length > 0 ? allErrors : ["Validation error"],
      id: null,
    }
  }

  const { data: validatedRequestBody } = validation

  // ! ==================================
  // ! FETCH
  // ! ==================================
  const fetchFormData = new FormData()
  const validatedRequestBodyEntries = Object.entries(validatedRequestBody)

  validatedRequestBodyEntries.forEach(([key, value]) => {
    fetchFormData.append(key, value as string | File)
  })

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers,
    body: fetchFormData,
  })

  const responseJson = await response.json()
  const responseObject = responseJson.at(0)

  const isBadRequest = response.status === 400
  if (isBadRequest) {
    const validatedResponseObject = CreateErrorSchema.parse(responseObject)
    const { error } = validatedResponseObject

    return {
      success: false,
      errors: Array.isArray(error) ? error : [error],
      id: null,
    }
  }

  const validatedResponseObject = CreateSuccessSchema.parse(responseObject)
  const { data } = validatedResponseObject

  return {
    success: true,
    errors: null,
    id: data && data.id ? data.id : null,
  }
}
