/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getStoredEmployeeId } from "@auth"
import { z } from "zod"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

// ============================================================================
// CONFIGURATION & TYPES
// ============================================================================

interface APIConfig {
  enableLogging: boolean
  defaultRevalidateTime: number
  maxRetries: number
  retryDelay: number
  requestTimeout: number
}

const CONFIG: APIConfig = {
  enableLogging: true,
  defaultRevalidateTime: 15,
  maxRetries: 3,
  retryDelay: 1000,
  requestTimeout: 30000,
}

// Enhanced color constants with semantic meanings
const LOG_COLORS = {
  RESET: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",

  // Status colors
  SUCCESS: "\x1b[32m", // Green
  WARNING: "\x1b[33m", // Yellow
  ERROR: "\x1b[31m", // Red
  INFO: "\x1b[36m", // Cyan
  DEBUG: "\x1b[35m", // Magenta

  // Emphasis colors
  HIGHLIGHT: "\x1b[34m", // Blue
  MUTED: "\x1b[37m", // White

  // Background colors for alerts
  BG_SUCCESS: "\x1b[42m",
  BG_WARNING: "\x1b[43m",
  BG_ERROR: "\x1b[41m",
  BG_INFO: "\x1b[46m",
} as const

interface GetDataOptions<T, D> {
  /* API Configuration */
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  includeEmployeeId?: boolean
  additionalBody?: Record<string, unknown>
  employeeIdKey?: string

  /* Schema Validation */
  responseSchema?: z.ZodType
  dataSchema?: z.ZodType

  /* Data Transformation */
  parseData?: (data: D[]) => T[]

  /* Demo Mode Fallback */
  dummyData: T[]

  /* Performance & Caching */
  debug?: boolean
  cache?: RequestCache
  revalidate?: number

  /* Enhanced Options */
  maxRetries?: number
  timeout?: number
  logLevel?: LogLevel
}

// Custom error types for better error handling
class APIError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly url?: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = "APIError"
  }
}

class ValidationError extends Error {
  constructor(
    message: string,
    public readonly validationErrors: any,
    public readonly data?: unknown,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Unified data fetching function for server-side operations
 * 
 * Features:
 * - Schema validation with Zod
 * - Demo mode support
 * - Comprehensive error handling
 * - Performance monitoring
 * - Flexible caching options
 *
 * @template T The expected return type (array of items)
 * @template D The data type to be parsed
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
    employeeIdKey = "employee_id",
    cache = "force-cache",
    revalidate = DEFAULT_REVALIDATE_TIME,
  } = options

  const logger = new APILogger(url, ENABLE_LOGGING)
  
  // Start performance monitoring
  logger.startRequest(method, additionalBody)

  // Check demo mode first
  const isDemo = await getDemo()
  if (isDemo) {
    logger.logDemoMode()
    return dummyData
  }

  try {
    // Setup API request components
    const { apiRootUrl, headers, requestBody } = await prepareAPIRequest(
      additionalBody,
      includeEmployeeId,
      employeeIdKey
    )

    // Validate headers
    if (!headers) {
      logger.logError("Failed to get headers for API request")
      return dummyData
    }

    // Execute API request
    const apiResponse = await executeAPIRequest({
      url: `${apiRootUrl}/${url}`,
      method,
      headers,
      body: requestBody,
      cache,
      revalidate
    })

    const responseJson = await apiResponse.json()

    // Process and validate response
    const processedData = await processAPIResponse({
      responseJson,
      responseSchema,
      dataSchema,
      parseData,
      logger,
      dummyData
    })

    logger.logSuccess(processedData.length)
    return processedData

  } catch (error) {
    logger.logUnexpectedError(error as Error)
    return dummyData
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Prepares API request components (headers, body, URL)
 */
async function prepareAPIRequest(
  additionalBody: Record<string, unknown>,
  includeEmployeeId: boolean,
  employeeIdKey: string
) {
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers

  const requestBody: Record<string, unknown> = { ...additionalBody }

  if (includeEmployeeId) {
    const employeeId = await getStoredEmployeeId()
    requestBody[employeeIdKey] = Number(employeeId)
  }

  return { apiRootUrl, headers, requestBody }
}

/**
 * Executes the API request with proper configuration
 */
async function executeAPIRequest({
  url,
  method,
  headers,
  body,
  cache,
  revalidate
}: {
  url: string
  method: string
  headers: HeadersInit
  body: Record<string, unknown>
  cache: RequestCache
  revalidate: number
}) {
  const requestBodyString = JSON.stringify(body)

  return await fetch(url, {
    credentials: "include",
    headers,
    method,
    body: method !== "GET" ? requestBodyString : undefined,
    cache: cache,
    next: { revalidate: revalidate },
  })
}

/**
 * Processes and validates API response data
 */
async function processAPIResponse<T, D>({
  responseJson,
  responseSchema,
  dataSchema,
  parseData,
  logger,
  dummyData
}: {
  responseJson: any
  responseSchema?: z.ZodType
  dataSchema?: z.ZodType
  parseData?: (data: D[]) => T[]
  logger: APILogger
  dummyData: T[]
}): Promise<T[]> {
  let data: any

  // Validate response structure
  if (responseSchema) {
    const validatedResponse = responseSchema.safeParse(responseJson)
    
    if (!validatedResponse.success) {
      logger.logValidationError("Response validation failed", {
        errors: validatedResponse.error.flatten().fieldErrors,
        responseJson
      })
      return dummyData
    }

    data = validatedResponse.data?.result?.data
  } else {
    data = responseJson?.result?.data
  }

  // Validate data schema
  if (dataSchema && data) {
    const schemaToUse = Array.isArray(data) ? dataSchema.array() : dataSchema
    const validatedData = schemaToUse.safeParse(data)

    if (!validatedData.success) {
      logger.logValidationError("Data validation failed", {
        errors: validatedData.error.flatten().fieldErrors,
        responseJson
      })
      return dummyData
    }

    data = validatedData.data
  }

  // Transform data if parser provided
  if (parseData && data) {
    return parseData(data)
  }

  // Return normalized array
  return Array.isArray(data) ? data : [data]
}

// ============================================================================
// LOGGING CLASS
// ============================================================================

class APILogger {
  private startTime: number = 0
  private readonly url: string
  private readonly enabled: boolean

  constructor(url: string, enabled: boolean = true) {
    this.url = url
    this.enabled = enabled
  }

  startRequest(method: string, additionalBody: Record<string, unknown>) {
    if (!this.enabled) return

    this.startTime = Date.now()
    const timestamp = new Date().toISOString()

    console.group(`${COLORS.BRIGHT}${COLORS.CYAN}🚀 API Request Started${COLORS.RESET}`)
    
    console.table({
      URL: this.url,
      Method: method,
      Timestamp: timestamp,
      'Has Additional Body': Object.keys(additionalBody).length > 0
    })

    if (Object.keys(additionalBody).length > 0) {
      console.info(`${COLORS.YELLOW}📤 Request Body:${COLORS.RESET}`)
      console.table(additionalBody)
    }

    console.groupEnd()
  }

  logDemoMode() {
    if (!this.enabled) return

    console.warn(
      `${COLORS.BRIGHT}${COLORS.BG_YELLOW} 🎭 DEMO MODE ${COLORS.RESET} ` +
      `${COLORS.YELLOW}Returning dummy data for: ${this.url}${COLORS.RESET}`
    )
  }

  logSuccess(itemCount: number) {
    if (!this.enabled) return

    const duration = Date.now() - this.startTime
    
    console.group(`${COLORS.BRIGHT}${COLORS.GREEN}✅ API Request Successful${COLORS.RESET}`)
    
    console.table({
      URL: this.url,
      'Items Fetched': itemCount,
      'Duration (ms)': duration,
      'Items/sec': Math.round(itemCount / (duration / 1000)) || 'N/A'
    })

    // Performance indicator
    if (duration > 1000) {
      console.warn(`${COLORS.YELLOW}⚠️  \n Slow request detected (${duration}ms)${COLORS.RESET}`)
    } else if (duration > 500) {
      console.info(`${COLORS.BLUE}ℹ️  \n Moderate response time (${duration}ms)${COLORS.RESET}`)
    }

    console.groupEnd()
  }

  logError(title: string, details?: any) {
    if (!this.enabled) return

    const error = new Error()
    const stackTrace = this.extractFilePaths(error.stack)

    console.group(`${COLORS.BRIGHT}${COLORS.RED}❌ ${title.toUpperCase()}${COLORS.RESET}`)
    
    console.table({
      URL: this.url,
      Error: title,
      Timestamp: new Date().toISOString()
    })

    if (details) {
      console.error(`${COLORS.RED}📋 Error Details:${COLORS.RESET}`, details)
    }

    if (stackTrace.length > 0) {
      console.info(`${COLORS.DIM}📁 Stack Trace:${COLORS.RESET}`)
      stackTrace.forEach((path, index) => {
        console.info(`${COLORS.DIM}  ${index + 1}. ${path}${COLORS.RESET}`)
      })
    }

    this.logFallbackNotice()
    console.groupEnd()
  }

  logValidationError(title: string, { errors, responseJson }: { errors: any, responseJson: any }) {
    if (!this.enabled) return

    console.group(`${COLORS.BRIGHT}${COLORS.RED}🔍 ${title.toUpperCase()}${COLORS.RESET}`)
    
    console.table({
      URL: this.url,
      'Error Type': 'Schema Validation',
      Timestamp: new Date().toISOString()
    })

    console.error(`${COLORS.RED}🚫 Validation Errors:${COLORS.RESET}`)
    console.table(errors)

    if (responseJson) {
      console.info(`${COLORS.YELLOW}📄 Response Data:${COLORS.RESET}`)
      console.dir(responseJson, { depth: 3, colors: true })
    }

    this.logFallbackNotice()
    console.groupEnd()
  }

  logUnexpectedError(error: Error) {
    if (!this.enabled) return

    console.group(`${COLORS.BRIGHT}${COLORS.BG_RED}${COLORS.WHITE} 💥 UNEXPECTED ERROR ${COLORS.RESET}`)
    
    console.table({
      URL: this.url,
      'Error Message': error.message,
      'Error Name': error.name,
      Timestamp: new Date().toISOString()
    })

    console.error(`${COLORS.RED}📋 Full Error:${COLORS.RESET}`, error)

    if (error.cause) {
      console.error(`${COLORS.RED}🔗 Error Cause:${COLORS.RESET}`, error.cause)
    }

    this.logFallbackNotice()
    console.groupEnd()
  }

  private logFallbackNotice() {
    if (!this.enabled) return
    
    console.warn(
      `${COLORS.BRIGHT}${COLORS.MAGENTA}🔄 Falling back to dummy data for: ${this.url}${COLORS.RESET}`
    )
  }

  private extractFilePaths(stackTrace: string | undefined): string[] {
    if (!stackTrace) return []
    
    const regex = /([./\w()@-]+\.tsx?:\d+:\d+)/g
    const files = [...stackTrace.matchAll(regex)]
      .map(match => match[1].replace("///(rsc)/", ""))
      .slice(1) // Remove first entry (usually this function)
    
    return files
  }
}
