"use server"

import { getStoredEmployeeId } from "@auth"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { z } from "zod"

const LOG_INFO = false

interface GetDataOptions<T, D> {
  /* API request configuration */
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  includeEmployeeId?: boolean

  additionalBody?: Record<string, unknown>
  employeeIdKey?: string

  /* Schema validation */
  responseSchema?: z.ZodType
  dataSchema?: z.ZodType

  /* Data transformation */
  parseData?: (data: D[]) => T[]

  /* Demo mode fallback */
  dummyData: T[]

  /* Debugging */
  debug?: boolean

  /* Caching */
  cache?: RequestCache
  revalidate?: number
}

/**
 * Unified data fetching function for server-side operations
 *
 * @template T The expected return type (array of items)
 * @template R The raw response data type
 * @template D the data type to be parsed
 *
 * @param options Configuration options for the data fetching operation
 * @returns Promise that resolves to an array of the expected type
 */
export const getData = async <T, D = unknown>(
  options: GetDataOptions<T, D>,
): Promise<T[]> => {
  const {
    // debug,
    url,
    method = "POST",
    includeEmployeeId = true,
    additionalBody = {},
    responseSchema,
    dataSchema,
    parseData,
    dummyData,
    employeeIdKey = "employee_id",
    cache = "force-cache",
    revalidate = 3600,
  } = options

  let timeStart = 0

  if (LOG_INFO) {
    timeStart = Date.now()
    const seconds = new Date().getMilliseconds()
    console.info(
      "\x1b[30m\x1b[1m\x1b[47m%s\x1b[0m",
      ` ${seconds} <==   ${url}   ==>  `,
    )
    // check if additional body is en empty object:
    if (!(Object.keys(additionalBody).length === 0)) {
      console.info(
        "\x1b[30m\x1b[1m\x1b[43m%s\x1b[0m",
        ` <==   ${JSON.stringify(additionalBody)}   ==>  `,
      )
    }
  }

  const isDemo = await getDemo()
  if (isDemo) {
    if (LOG_INFO) {
      console.info("Demo Mode On\x1b[33mReturning dummy data for\x1b[0m", {
        url,
      })
    }
    logReturingDummyData(url)
    return dummyData
  }

  try {
    // !! VARIABLES
    // ==================================
    const apiRootUrl = process.env.API_ROOT_URL as string
    const fetchHeaders = await getFetchHeaders()
    const headers = fetchHeaders?.headers

    // Return dummy data if headers aren't available
    if (!headers) {
      // console.error("Failed to get headers for API request")
      logError({
        errorTitle: "Failed to get headers for API request",
        url,
      })
      logReturingDummyData(url)

      return dummyData
    }

    // Generate request body
    const requestBody: Record<string, unknown> = { ...additionalBody }

    // Add employee ID to request body if needed
    if (includeEmployeeId) {
      const employeeId = await getStoredEmployeeId()
      requestBody[employeeIdKey] = Number(employeeId)
    }

    const requestBodyString = JSON.stringify(requestBody)
    const requestUrl = `${apiRootUrl}/${url}`

    // ==================================
    const apiResponse = await fetch(requestUrl, {
      credentials: "include",
      headers,
      method,
      body: method !== "GET" ? requestBodyString : undefined,
      cache,
      next: { revalidate },
    })

    const responseJson = await apiResponse.json()
    // logSeperator()

    // VALIDATION
    // ==================================
    let validatedResponse, result, data

    // Validate response structure if schema provided
    if (responseSchema) {
      validatedResponse = responseSchema.safeParse(responseJson)

      if (!validatedResponse.success) {
        const validationError = validatedResponse.error.flatten().fieldErrors
        console.log({ requestBody, headers })
        logError({
          url,
          responseJson,
          errorDetails: validationError,
          errorTitle: "response validation failed",
        })
        logReturingDummyData(url)
        // logSeperator()

        return dummyData
      }

      result = validatedResponse.data?.result
      data = result?.data
      if (LOG_INFO) {
        console.log(
          "\x1b[1m\x1b[42m\x1b[30m  Fetched %d items from %s in %dms  \x1b[0m",
          data.length,
          url,
          Date.now() - timeStart,
        )
      }
    } else {
      // Basic validation without schema
      result = responseJson?.result
      data = result?.data
    }

    // Validate data with schema if provided
    let validatedData
    if (dataSchema && data) {
      const schemaToUse = Array.isArray(data) ? dataSchema.array() : dataSchema

      validatedData = schemaToUse.safeParse(data)

      if (!validatedData.success) {
        const errorDetails = validatedData.error.flatten().fieldErrors
        logError({
          url,
          responseJson,
          errorDetails,
          errorTitle: "data validation failed",
        })
        logReturingDummyData(url)
        return dummyData
      }

      data = validatedData.data
    }

    // PARSING
    // ==================================
    if (parseData && data) {
      return parseData(data)
    }

    // Return raw data if no parser provided
    return Array.isArray(data) ? data : [data]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorTitle = error.message
    const errorDetails = error.cause
    logError({
      url,
      errorDetails,
      errorTitle,
    })

    logReturingDummyData(url)
    return dummyData
  }
}

// !! Logging

const logSeperator = () => {
  console.log("\x1b[33m\n------------\n\x1b[0m")
}

const logReturingDummyData = (url: string) => {
  console.log("\x1b[1m\x1b[95mRETURNING DUMMY DATA FOR %s\x1b[0m", url)
}

// !! Error Logging

type LogErrorParams = {
  errorTitle?: string
  url?: string
  responseJson?: string
  errorDetails?: unknown
}
const logError = ({
  url,
  errorTitle,
  responseJson,
  errorDetails,
}: LogErrorParams) => {
  const error = new Error()
  const stack = error.stack

  // logSeperator()
  logErrorTitle(errorTitle)
  console.log({ url })
  console.log(extractFilePaths(stack))
  console.log(errorDetails)
  console.log({ responseJson })
  logSeperator()
}
const extractFilePaths = (text: string | undefined) => {
  if (!text) return []
  const regex = /([./\w()@-]+\.tsx?:\d+:\d+)/g
  const files = [...text.matchAll(regex)].map((m) =>
    m[1].replace("///(rsc)/", ""),
  )
  files.shift()
  return files
}

const logErrorTitle = (title?: string) => {
  if (!title) return
  console.log(
    "\x1b[31m\x1b[1m\x1b[40m%s\x1b[0m",
    "   " + title.toUpperCase(),
    "\n",
  )
}
