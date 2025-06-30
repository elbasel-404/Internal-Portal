"use server"

import { getStoredEmployeeId } from "@auth"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { z } from "zod"

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
    url,
    method = "POST",
    includeEmployeeId = true,
    additionalBody = {},
    responseSchema,
    dataSchema,
    parseData,
    dummyData,
    debug = false,
    employeeIdKey = "employee_id",
  } = options

  // Check if in demo mode
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  try {
    // VARIABLES
    // ==================================
    const apiRootUrl = process.env.API_ROOT_URL as string
    const fetchHeaders = await getFetchHeaders()
    const headers = fetchHeaders?.headers

    // Return dummy data if headers aren't available
    if (!headers) return dummyData

    // Generate request body
    const requestBody: Record<string, unknown> = { ...additionalBody }

    // Add employee ID to request body if needed
    if (includeEmployeeId) {
      const employeeId = await getStoredEmployeeId()
      requestBody[employeeIdKey] =
        typeof additionalBody[employeeIdKey] === "number"
          ? Number(employeeId)
          : employeeId
    }

    const requestBodyString = JSON.stringify(requestBody)
    const requestUrl = `${apiRootUrl}/${url}`

    if (debug) {
      // log("Request URL:", requestUrl)
      // log("Request Body:", requestBodyString)
    }

    // FETCH
    // ==================================
    const apiResponse = await fetch(requestUrl, {
      headers,
      method,
      body: method !== "GET" ? requestBodyString : undefined,
    })

    const responseJson = await apiResponse.json()

    if (debug) {
      // log("API Response:", responseJson)
    }

    // VALIDATION
    // ==================================
    let validatedResponse, result, data

    // Validate response structure if schema provided
    if (responseSchema) {
      validatedResponse = responseSchema.safeParse(responseJson)

      if (!validatedResponse.success) {
        console.error("Response validation failed:", validatedResponse.error)
        return dummyData
      }

      result = validatedResponse.data?.result
      data = result?.data
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
        console.error("Data validation failed:", validatedData.error)
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
  } catch (error) {
    console.error("Error fetching data:", error)
    return dummyData
  }
}
