"use server"

import { z } from "zod"
import { getFetchHeaders } from "../server/getFetchHeaders"
import { CreateErrorSchema } from "../../api-schemas/CreateErrorSchema"
import { CreateSuccessSchema } from "../../api-schemas/CreateSuccessSchema"
import { getStoredEmployeeId } from "@auth"

// Toggle this to enable/disable logging
const LOG_INFO = false

export interface State {
  success: boolean
  errors: string[] | null
  id: number | null
}

export async function createData<T extends Record<string, unknown>>(
  endpointUrl: string,
  requestBodySchema: z.ZodType<T, z.ZodTypeDef>,
  formData: FormData,
  // transformBody?: (
  // body: Record<string, FormDataEntryValue>,
  // ) => Record<string, FormDataEntryValue>,
): Promise<State> {
  let timeStart = 0
  if (LOG_INFO) {
    logSeparator()
    timeStart = Date.now()
    logHeader(endpointUrl)
  }

  // Step 1: Prepare headers and URL
  const apiRoot = process.env.API_ROOT_URL
  const fetchHeaders = await getFetchHeaders()
  const headersObject = fetchHeaders?.headers

  if (!headersObject) {
    logError("getFetchHeaders", "Missing headers object")
    return failure(["Failed to get fetchHeaders"])
  }

  const headers = new Headers()
  headers.append("Authorization", headersObject.Authorization)
  headers.append("x-api-key", headersObject["x-api-key"])

  const fetchUrl = `${apiRoot}/${endpointUrl}`

  // Step 2: Build and validate request body
  // let requestBody = Object.fromEntries(formData.entries())
  // const requestBodyKeys = Object.keys(requestBody)
  // const fileKeys = requestBodyKeys.filter((key) => key.startsWith("file-"))
  // const files = fileKeys.map((key) => formData.get(key))
  // console.log({ files })
  // files.forEach(() => requestBody['attachment_ids'])

  // return {
  //   errors: ["error"],
  //   id: null,
  //   success: false,
  // }

  // if (transformBody) {
  //   requestBody = transformBody(requestBody)
  // }

  logDebug("Request Body", Array.from(formData.entries()))

  // const validation = requestBodySchema.safeParse(requestBody)
  // if (!validation.success) {
  //   const allErrors = [
  //     ...validation.error.flatten().formErrors,
  //     ...Object.values(validation.error.flatten().fieldErrors).flat(),
  //   ].filter((e): e is string => e !== undefined)

  //   logError("Validation Failed", allErrors)
  //   return failure(allErrors.length ? allErrors : ["Validation error"])
  // }

  // const validatedData = validation.data

  // Step 3: Build final POST FormData
  const employeeId = await getStoredEmployeeId()
  if (!employeeId) {
    console.error("No employee id found")
    return {
      errors: ["Error, please sign out and signin again"],
      id: null,
      success: false,
    }
  }
  formData.append("employee_id", employeeId as string)
  // const postData = new FormData()
  // postData.append("employee_id", employeeId ?? "")

  // for (const [key, value] of Object.entries(validatedData)) {
  //   if (key === "attachment_ids") continue
  //   postData.append(key, value as string | File)
  // }

  logInfo("Sending POST to", fetchUrl)

  // Step 4: Perform fetch
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers,
    // body: postData,
    body: formData,
  })

  const responseClone = response.clone()
  let responseJson

  try {
    responseJson = await response.json()
    logDebug("Response JSON", responseJson)
  } catch (error) {
    logError("Failed to parse JSON", error)
    const text = await responseClone.text()
    logDebug("Raw response text", text)
    return failure(["Invalid response from server"])
  }

  if (LOG_INFO) {
    logSuccessTime(Date.now() - timeStart)
    logSeparator()
  }

  // Step 5: Parse API response
  const responseObject = responseJson.at(0)

  const parsedError = CreateErrorSchema.safeParse(responseObject)
  if (parsedError.success) {
    const errorList = Array.isArray(parsedError.data)
      ? parsedError.data.map((e) =>
          typeof e === "object" && "error" in e ? e.error : String(e),
        )
      : [parsedError.data.error]

    logError("API Returned Error", errorList)
    return failure(errorList)
  }

  const parsedSuccess = CreateSuccessSchema.parse(responseObject)
  const successId = parsedSuccess.data?.id ?? null

  logInfo("Created ID", successId)

  return {
    success: true,
    errors: null,
    id: successId,
  }
}

// =============================
// Logging Utilities
// =============================

const COLORS = {
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
  greenBg: "\x1b[30m\x1b[1m\x1b[42m",
  redBg: "\x1b[30m\x1b[1m\x1b[41m",
  grayBg: "\x1b[30m\x1b[1m\x1b[47m",
  errorRed: "\x1b[31m",
  bold: "\x1b[1m",
}

const logSeparator = () => {
  console.log(`${COLORS.yellow}\n------------\n${COLORS.reset}`)
}

const logHeader = (title: string) => {
  console.info(`${COLORS.grayBg} %s ${COLORS.reset}`, `REQUEST: ${title}`)
}

const logSuccessTime = (ms: number) => {
  const color = ms > 500 ? COLORS.redBg : COLORS.greenBg
  console.info(`${color} %s ${COLORS.reset}`, `Duration: ${ms}ms`)
}

const logError = (label: string, error: unknown) => {
  console.error(`${COLORS.errorRed}[ERROR] ${label}:${COLORS.reset}`, error)
}

const logDebug = (label: string, data: unknown) => {
  console.debug(`${COLORS.bold}[DEBUG] ${label}:${COLORS.reset}`, data)
}

const logInfo = (label: string, data: unknown) => {
  console.info(`${COLORS.bold}[INFO] ${label}:${COLORS.reset}`, data)
}

// =============================
// Result Helper
// =============================

const failure = (errors: string[]): State => ({
  success: false,
  errors,
  id: null,
})
