"use server"

import { z } from "zod"
import { getFetchHeaders } from "../server/getFetchHeaders"
import { CreateErrorSchema } from "../../api-schemas/CreateErrorSchema"
import { CreateSuccessSchema } from "../../api-schemas/CreateSuccessSchema"
import { getStoredEmployeeId } from "@auth"

const LOG_INFO = true

export interface State {
  success: boolean
  errors: string[] | null
  id: number | null
}

export async function createData<T extends Record<string, unknown>>(
  endpointUrl: string,
  requestBodySchema: z.ZodType<T, z.ZodTypeDef>,
  formData: FormData,
  messageBody?: (
    body: Record<string, FormDataEntryValue>,
  ) => Record<string, FormDataEntryValue>,
): Promise<State> {

  let timeStart = 0;

  if (LOG_INFO) {
    logSeperator();
    timeStart = Date.now()
    console.info("\x1b[30m\x1b[1m\x1b[47m%s\x1b[0m", ` <==   ${endpointUrl}   ==>  `)
  }

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

  if (messageBody) {
    requestBody = messageBody(requestBody)
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
  const employeeId = await getStoredEmployeeId()

  const fetchFormData = new FormData()
  fetchFormData.append("employee_id", employeeId ?? "")
  // requestBody["employee_id"] = employeeId || ""
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

    if (LOG_INFO) {
      const timeEnd = Date.now()
      const timeTaken = timeEnd - timeStart
      // Log time taken with different background color based on duration
      const timeColor =
        timeTaken > 500
          ? "\x1b[30m\x1b[1m\x1b[41m" // red background for slow requests
          : "\x1b[30m\x1b[1m\x1b[42m" // green background for fast requests
      console.info(`${timeColor}%s\x1b[0m`, `${timeTaken}ms`)
      logSeperator();
    }

  const responseObject = responseJson.at(0)

  // const isBadRequest = response.status === 400
  // if (isBadRequest) {
  const validatedErrorResponseObject = CreateErrorSchema.safeParse(responseObject)
  const {success: errorSuccess, data: errorData, error: errorValidationError} = validatedErrorResponseObject;

  if (errorValidationError) {
    return {
      success: false,
      errors: [JSON.stringify(errorValidationError.format())],
      id: null,
    }
  }


  if (errorSuccess) {
    console.log({ status })
    return {
      success: false, // Assuming errorData is an array of strings or a single string
      errors: Array.isArray(errorData) ? errorData.map(e => (typeof e === 'object' && 'error' in e) ? e.error : String(e)) : [String(errorData)],
      id: null,
    }
  }

  // }

  const validatedResponseObject = CreateSuccessSchema.parse(responseObject)
  const { data } = validatedResponseObject

  return {
    success: true,
    errors: null,
    id: data && data.id ? data.id : null,
  }
}

const logSeperator = () => {
  console.log("\x1b[33m\n------------\n\x1b[0m")
}