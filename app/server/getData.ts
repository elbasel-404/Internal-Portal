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

// Log level enumeration
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

interface RequestMetrics {
  startTime: number
  endTime?: number
  duration?: number
  retryCount: number
  bytesReceived?: number
  callStack?: string[]
  initiatingFile?: string
}

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
 * Enhanced Features:
 * - Comprehensive logging with performance metrics
 * - Automatic retry logic with exponential backoff
 * - Enhanced error handling with custom error types
 * - Request timeout protection
 * - Better type safety and validation
 * - Performance monitoring and analytics
 * - Configurable log levels
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
    revalidate = CONFIG.defaultRevalidateTime,
    maxRetries = CONFIG.maxRetries,
    timeout = CONFIG.requestTimeout,
    logLevel = LogLevel.INFO,
  } = options

  const logger = new EnhancedAPILogger(url, CONFIG.enableLogging, logLevel)
  const metrics: RequestMetrics = {
    startTime: Date.now(),
    retryCount: 0,
  }

  // Capture call stack immediately when getData is called
  const callStackError = new Error()
  const callStack = logger.extractFilePaths(callStackError.stack)
  metrics.callStack = callStack
  metrics.initiatingFile = logger.findInitiatingFile(callStack)

  logger.startRequest(method, additionalBody, metrics)

  // Check demo mode first
  const isDemo = await getDemo()
  if (isDemo) {
    logger.logDemoMode()
    return dummyData
  }

  // Main execution with retry logic
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      metrics.retryCount = attempt

      if (attempt > 0) {
        logger.logRetryAttempt(attempt, maxRetries)
        await delay(CONFIG.retryDelay * Math.pow(2, attempt - 1)) // Exponential backoff
      }

      const result = await executeDataFetch({
        url,
        method,
        includeEmployeeId,
        additionalBody,
        employeeIdKey,
        responseSchema,
        dataSchema,
        parseData,
        cache,
        revalidate,
        timeout,
        logger,
        metrics,
      })

      logger.logSuccess(result.length, metrics)
      return result
    } catch (error) {
      const isLastAttempt = attempt === maxRetries

      if (
        error instanceof APIError &&
        error.status &&
        error.status >= 400 &&
        error.status < 500
      ) {
        // Don't retry client errors (4xx)
        logger.logClientError(error)
        return dummyData
      }

      if (isLastAttempt) {
        logger.logFinalError(error as Error, metrics)
        return dummyData
      }

      logger.logRetryableError(error as Error, attempt + 1, maxRetries)
    }
  }

  // Should never reach here, but TypeScript requires it
  return dummyData
}

// ============================================================================
// CORE EXECUTION FUNCTION
// ============================================================================

async function executeDataFetch<T, D>({
  url,
  method,
  includeEmployeeId,
  additionalBody,
  employeeIdKey,
  responseSchema,
  dataSchema,
  parseData,
  cache,
  revalidate,
  timeout,
  logger,
  metrics,
}: {
  url: string
  method: string
  includeEmployeeId: boolean
  additionalBody: Record<string, unknown>
  employeeIdKey: string
  responseSchema?: z.ZodType
  dataSchema?: z.ZodType
  parseData?: (data: D[]) => T[]
  cache: RequestCache
  revalidate: number
  timeout: number
  logger: EnhancedAPILogger
  metrics: RequestMetrics
}): Promise<T[]> {
  // Setup API request components
  const { apiRootUrl, headers, requestBody } = await prepareAPIRequest(
    additionalBody,
    includeEmployeeId,
    employeeIdKey,
    logger,
  )

  if (!headers) {
    throw new APIError("Failed to get headers for API request", undefined, url)
  }

  // Execute API request with timeout
  const apiResponse = await executeAPIRequestWithTimeout({
    url: `${apiRootUrl}/${url}`,
    method,
    headers,
    body: requestBody,
    cache,
    revalidate,
    timeout,
    logger,
  })

  // Check response status
  if (!apiResponse.ok) {
    throw new APIError(
      `API request failed: ${apiResponse.status} ${apiResponse.statusText}`,
      apiResponse.status,
      url,
    )
  }

  // Parse response
  const responseJson = await parseJSONResponse(apiResponse, logger)

  // Calculate response size
  const responseText = JSON.stringify(responseJson)
  metrics.bytesReceived = new TextEncoder().encode(responseText).length

  // Process and validate response
  return await processAPIResponse({
    responseJson,
    responseSchema,
    dataSchema,
    parseData,
    logger,
    url,
  })
}

// ============================================================================
// ENHANCED HELPER FUNCTIONS
// ============================================================================

/**
 * Prepares API request components with enhanced error handling
 */
async function prepareAPIRequest(
  additionalBody: Record<string, unknown>,
  includeEmployeeId: boolean,
  employeeIdKey: string,
  logger: EnhancedAPILogger,
) {
  const apiRootUrl = process.env.API_ROOT_URL as string

  if (!apiRootUrl) {
    logger.logConfigError("API_ROOT_URL environment variable is not set")
    throw new APIError("Missing API configuration")
  }

  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers

  const requestBody: Record<string, unknown> = { ...additionalBody }

  if (includeEmployeeId) {
    try {
      const employeeId = await getStoredEmployeeId()
      if (!employeeId) {
        logger.logAuthError("No employee ID found")
        throw new APIError("Authentication required: No employee ID available")
      }
      requestBody[employeeIdKey] = Number(employeeId)
    } catch (error) {
      logger.logAuthError("Failed to get employee ID", error)
      throw new APIError("Authentication failed", undefined, undefined, error)
    }
  }

  return { apiRootUrl, headers, requestBody }
}

/**
 * Executes API request with timeout protection
 */
async function executeAPIRequestWithTimeout({
  url,
  method,
  headers,
  body,
  cache,
  revalidate,
  timeout,
  logger,
}: {
  url: string
  method: string
  headers: HeadersInit
  body: Record<string, unknown>
  cache: RequestCache
  revalidate: number
  timeout: number
  logger: EnhancedAPILogger
}): Promise<Response> {
  const requestBodyString = method !== "GET" ? JSON.stringify(body) : undefined

  logger.logRequestDetails({
    url,
    method,
    bodySize: requestBodyString
      ? new TextEncoder().encode(requestBodyString).length
      : 0,
    cache,
    revalidate,
  })

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers,
      method,
      body: requestBodyString,
      cache,
      next: { revalidate },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)

    if (controller.signal.aborted) {
      throw new APIError(`Request timeout after ${timeout}ms`, 408, url)
    }

    throw new APIError("Network request failed", undefined, url, error)
  }
}

/**
 * Safely parses JSON response with error handling
 */
async function parseJSONResponse(
  response: Response,
  logger: EnhancedAPILogger,
): Promise<any> {
  try {
    return await response.json()
  } catch (error) {
    logger.logParseError("Failed to parse JSON response", error)
    throw new APIError(
      "Invalid JSON response",
      response.status,
      response.url,
      error,
    )
  }
}

/**
 * Enhanced API response processing with better validation
 */
async function processAPIResponse<T, D>({
  responseJson,
  responseSchema,
  dataSchema,
  parseData,
  logger,
  url,
}: {
  responseJson: any
  responseSchema?: z.ZodType
  dataSchema?: z.ZodType
  parseData?: (data: D[]) => T[]
  logger: EnhancedAPILogger
  url: string
}): Promise<T[]> {
  let data: any

  // Validate response structure
  if (responseSchema) {
    const validatedResponse = responseSchema.safeParse(responseJson)

    if (!validatedResponse.success) {
      throw new ValidationError(
        "Response validation failed",
        validatedResponse.error.flatten().fieldErrors,
        responseJson,
      )
    }

    data = validatedResponse.data?.result?.data
    logger.logValidationSuccess("Response schema validation passed")
  } else {
    data = responseJson?.result?.data
    logger.logDebug("Skipping response schema validation")
  }

  // Check if data exists
  if (data === undefined || data === null) {
    logger.logDataWarning("No data found in response", responseJson)
    return []
  }

  // Validate data schema
  if (dataSchema && data) {
    const schemaToUse = Array.isArray(data) ? dataSchema.array() : dataSchema
    const validatedData = schemaToUse.safeParse(data)

    if (!validatedData.success) {
      throw new ValidationError(
        "Data validation failed",
        validatedData.error.flatten().fieldErrors,
        data,
      )
    }

    data = validatedData.data
    logger.logValidationSuccess("Data schema validation passed")
  }

  // Transform data if parser provided
  if (parseData && data) {
    try {
      const transformedData = parseData(data)
      logger.logDataTransformation(data.length, transformedData.length)
      return transformedData
    } catch (error) {
      logger.logTransformationError(error as Error)
      throw new APIError("Data transformation failed", undefined, url, error)
    }
  }

  // Return normalized array
  const result = Array.isArray(data) ? data : [data]
  logger.logDataNormalization(result.length)
  return result
}

// ============================================================================
// ENHANCED LOGGING CLASS
// ============================================================================

class EnhancedAPILogger {
  private readonly url: string
  private readonly enabled: boolean
  private readonly logLevel: LogLevel
  private requestId: string

  constructor(
    url: string,
    enabled: boolean = true,
    logLevel: LogLevel = LogLevel.INFO,
  ) {
    this.url = url
    this.enabled = enabled
    this.logLevel = logLevel
    this.requestId = this.generateRequestId()
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private shouldLog(level: LogLevel): boolean {
    return this.enabled && level >= this.logLevel
  }

  private formatMessage(level: string, emoji: string, message: string): string {
    const timestamp = new Date().toISOString()
    return `${LOG_COLORS.DIM}[${timestamp}]${LOG_COLORS.RESET} ${emoji} ${LOG_COLORS.BRIGHT}${level}${LOG_COLORS.RESET} ${message}`
  }

  private logWithLevel(
    level: LogLevel,
    logFn: (...args: any[]) => void,
    levelName: string,
    emoji: string,
    message: string,
    ...args: any[]
  ) {
    if (!this.shouldLog(level)) return

    const formattedMessage = this.formatMessage(levelName, emoji, message)
    logFn(formattedMessage, ...args)
  }

  startRequest(
    method: string,
    additionalBody: Record<string, unknown>,
    metrics: RequestMetrics,
  ) {
    if (!this.shouldLog(LogLevel.INFO)) return

    console.group(
      `${LOG_COLORS.BRIGHT}${LOG_COLORS.INFO}🚀 API Request Started${LOG_COLORS.RESET}`,
    )

    console.table({
      "Request ID": this.requestId,
      URL: this.url,
      Method: method,
      "Initiated From": metrics.initiatingFile || "Unknown",
      Timestamp: new Date(metrics.startTime).toISOString(),
      "Body Keys": Object.keys(additionalBody),
      "Body Size (bytes)": JSON.stringify(additionalBody).length,
    })

    // Always log the call stack to show request origin
    if (metrics.callStack && metrics.callStack.length > 0) {
      console.info(
        `${LOG_COLORS.HIGHLIGHT}📍 Call Stack (Request Origin):${LOG_COLORS.RESET}`,
      )
      metrics.callStack.forEach((path, index) => {
        const isInitiating = index === 0
        const prefix = isInitiating ? "👉" : "  "
        const color = isInitiating ? LOG_COLORS.SUCCESS : LOG_COLORS.MUTED
        console.info(
          `${color}${prefix} ${index + 1}. ${path}${LOG_COLORS.RESET}`,
        )
      })
    }

    if (
      this.shouldLog(LogLevel.DEBUG) &&
      Object.keys(additionalBody).length > 0
    ) {
      console.info(`${LOG_COLORS.DEBUG}📤 Request Body:${LOG_COLORS.RESET}`)
      console.dir(additionalBody, { depth: 3, colors: true })
    }

    console.groupEnd()
  }

  logRequestDetails({
    url,
    method,
    bodySize,
    cache,
    revalidate,
  }: {
    url: string
    method: string
    bodySize: number
    cache: RequestCache
    revalidate: number
  }) {
    this.logWithLevel(
      LogLevel.DEBUG,
      console.debug,
      "DEBUG",
      "🔍",
      `Request details for ${this.requestId}`,
      {
        "Full URL": url,
        Method: method,
        "Body Size": `${bodySize} bytes`,
        "Cache Strategy": cache,
        Revalidate: `${revalidate}s`,
      },
    )
  }

  logDemoMode() {
    this.logWithLevel(
      LogLevel.WARN,
      console.warn,
      "DEMO",
      "🎭",
      `Demo mode active for ${this.url} (${this.requestId})`,
    )
  }

  logRetryAttempt(attempt: number, maxRetries: number) {
    this.logWithLevel(
      LogLevel.WARN,
      console.warn,
      "RETRY",
      "🔄",
      `Retry ${attempt}/${maxRetries} for ${this.url} (${this.requestId})`,
    )
  }

  logSuccess(itemCount: number, metrics: RequestMetrics) {
    if (!this.shouldLog(LogLevel.INFO)) return

    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime

    console.group(
      `${LOG_COLORS.BRIGHT}${LOG_COLORS.SUCCESS}✅ API Request Successful${LOG_COLORS.RESET}`,
    )

    const performanceData = {
      "Request ID": this.requestId,
      URL: this.url,
      "Initiated From": metrics.initiatingFile || "Unknown",
      "Items Fetched": itemCount,
      "Duration (ms)": metrics.duration,
      "Items/sec":
        metrics.duration > 0
          ? Math.round(itemCount / (metrics.duration / 1000))
          : "N/A",
      "Retry Count": metrics.retryCount,
      "Bytes Received": metrics.bytesReceived
        ? `${metrics.bytesReceived} bytes`
        : "Unknown",
    }

    console.table(performanceData)

    // Show call stack for successful requests too (at debug level)
    if (
      this.shouldLog(LogLevel.DEBUG) &&
      metrics.callStack &&
      metrics.callStack.length > 0
    ) {
      console.info(
        `${LOG_COLORS.DIM}📍 Complete Call Stack:${LOG_COLORS.RESET}`,
      )
      metrics.callStack.forEach((path, index) => {
        console.info(
          `${LOG_COLORS.DIM}  ${index + 1}. ${path}${LOG_COLORS.RESET}`,
        )
      })
    }

    // Performance analysis
    this.analyzePerformance(metrics.duration, itemCount)

    console.groupEnd()
  }

  private analyzePerformance(duration: number, itemCount: number) {
    if (duration > 5000) {
      console.warn(
        `${LOG_COLORS.ERROR}🐌 Very slow request detected (${duration}ms) - Consider optimization${LOG_COLORS.RESET}`,
      )
    } else if (duration > 2000) {
      console.warn(
        `${LOG_COLORS.WARNING}⚠️  Slow request detected (${duration}ms) - Monitor performance${LOG_COLORS.RESET}`,
      )
    } else if (duration > 1000) {
      console.info(
        `${LOG_COLORS.WARNING}⏱️  Moderate response time (${duration}ms)${LOG_COLORS.RESET}`,
      )
    } else {
      console.info(
        `${LOG_COLORS.SUCCESS}⚡ Fast response (${duration}ms)${LOG_COLORS.RESET}`,
      )
    }

    // Data efficiency analysis
    if (itemCount === 0) {
      console.warn(
        `${LOG_COLORS.WARNING}📭 No items returned - Check query parameters${LOG_COLORS.RESET}`,
      )
    } else if (itemCount > 1000) {
      console.info(
        `${LOG_COLORS.INFO}📊 Large dataset (${itemCount} items) - Consider pagination${LOG_COLORS.RESET}`,
      )
    }
  }

  logValidationSuccess(message: string) {
    this.logWithLevel(LogLevel.DEBUG, console.debug, "VALIDATION", "✓", message)
  }

  logDataTransformation(originalCount: number, transformedCount: number) {
    this.logWithLevel(
      LogLevel.DEBUG,
      console.debug,
      "TRANSFORM",
      "🔄",
      `Data transformed: ${originalCount} → ${transformedCount} items`,
    )
  }

  logDataNormalization(count: number) {
    this.logWithLevel(
      LogLevel.DEBUG,
      console.debug,
      "NORMALIZE",
      "📋",
      `Data normalized to array with ${count} items`,
    )
  }

  logDataWarning(message: string, data?: any) {
    if (!this.shouldLog(LogLevel.WARN)) return

    console.group(
      `${LOG_COLORS.WARNING}⚠️  Data Warning: ${message}${LOG_COLORS.RESET}`,
    )
    if (data && this.shouldLog(LogLevel.DEBUG)) {
      console.dir(data, { depth: 2, colors: true })
    }
    console.groupEnd()
  }

  logConfigError(message: string) {
    this.logWithLevel(LogLevel.ERROR, console.error, "CONFIG", "⚙️", message)
  }

  logAuthError(message: string, error?: unknown) {
    if (!this.shouldLog(LogLevel.ERROR)) return

    console.group(
      `${LOG_COLORS.ERROR}🔐 Authentication Error${LOG_COLORS.RESET}`,
    )
    console.error(`${LOG_COLORS.ERROR}${message}${LOG_COLORS.RESET}`)
    if (error && this.shouldLog(LogLevel.DEBUG)) {
      console.error("Details:", error)
    }
    console.groupEnd()
  }

  logParseError(message: string, error: unknown) {
    this.logWithLevel(
      LogLevel.ERROR,
      console.error,
      "PARSE",
      "📄",
      `${message} (${this.requestId})`,
      error,
    )
  }

  logTransformationError(error: Error) {
    if (!this.shouldLog(LogLevel.ERROR)) return

    console.group(
      `${LOG_COLORS.ERROR}🔧 Data Transformation Error${LOG_COLORS.RESET}`,
    )
    console.error(
      `${LOG_COLORS.ERROR}Request ID: ${this.requestId}${LOG_COLORS.RESET}`,
    )
    console.error(
      `${LOG_COLORS.ERROR}Error: ${error.message}${LOG_COLORS.RESET}`,
    )
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.error("Stack:", error.stack)
    }
    console.groupEnd()
  }

  logClientError(error: APIError) {
    if (!this.shouldLog(LogLevel.ERROR)) return

    console.group(
      `${LOG_COLORS.ERROR}❌ Client Error (${error.status})${LOG_COLORS.RESET}`,
    )
    console.table({
      "Request ID": this.requestId,
      URL: this.url,
      Status: error.status,
      Message: error.message,
      "No Retry": "Client errors are not retried",
    })
    console.groupEnd()
  }

  logRetryableError(error: Error, attempt: number, maxRetries: number) {
    if (!this.shouldLog(LogLevel.WARN)) return

    console.group(
      `${LOG_COLORS.WARNING}🔄 Retryable Error (Attempt ${attempt}/${maxRetries})${LOG_COLORS.RESET}`,
    )
    console.warn(`${LOG_COLORS.WARNING}${error.message}${LOG_COLORS.RESET}`)
    console.warn(
      `${LOG_COLORS.DIM}Will retry in ${CONFIG.retryDelay * Math.pow(2, attempt - 1)}ms${LOG_COLORS.RESET}`,
    )
    console.groupEnd()
  }

  logFinalError(error: Error, metrics: RequestMetrics) {
    if (!this.shouldLog(LogLevel.ERROR)) return

    const duration = Date.now() - metrics.startTime

    console.group(
      `${LOG_COLORS.BRIGHT}${LOG_COLORS.BG_ERROR} 💥 FINAL ERROR - ALL RETRIES EXHAUSTED ${LOG_COLORS.RESET}`,
    )

    console.table({
      "Request ID": this.requestId,
      URL: this.url,
      "Initiated From": metrics.initiatingFile || "Unknown",
      "Error Type": error.constructor.name,
      "Error Message": error.message,
      "Total Duration": `${duration}ms`,
      "Retry Count": metrics.retryCount,
      "Falling Back": "Using dummy data",
    })

    // Always show call stack for errors to trace the source
    if (metrics.callStack && metrics.callStack.length > 0) {
      console.error(
        `${LOG_COLORS.ERROR}📍 Request Call Stack:${LOG_COLORS.RESET}`,
      )
      metrics.callStack.forEach((path, index) => {
        const isInitiating = index === 0
        const prefix = isInitiating ? "👉" : "  "
        const color = isInitiating ? LOG_COLORS.ERROR : LOG_COLORS.DIM
        console.error(
          `${color}${prefix} ${index + 1}. ${path}${LOG_COLORS.RESET}`,
        )
      })
    }

    if (error instanceof APIError && error.status) {
      console.error(
        `${LOG_COLORS.ERROR}🌐 HTTP Status: ${error.status}${LOG_COLORS.RESET}`,
      )
    }

    if (error instanceof ValidationError) {
      console.error(
        `${LOG_COLORS.ERROR}🔍 Validation Errors:${LOG_COLORS.RESET}`,
      )
      console.table(error.validationErrors)
    }

    if (this.shouldLog(LogLevel.DEBUG)) {
      console.error(
        `${LOG_COLORS.ERROR}📋 Full Error:${LOG_COLORS.RESET}`,
        error,
      )

      // Show error's own stack trace too
      const errorStack = this.extractFilePaths(error.stack)
      if (errorStack.length > 0) {
        console.error(
          `${LOG_COLORS.DIM}📁 Error Stack Trace:${LOG_COLORS.RESET}`,
        )
        errorStack.forEach((path, index) => {
          console.error(
            `${LOG_COLORS.DIM}  ${index + 1}. ${path}${LOG_COLORS.RESET}`,
          )
        })
      }
    }

    console.groupEnd()
  }

  logDebug(message: string, data?: any) {
    if (!this.shouldLog(LogLevel.DEBUG)) return

    console.debug(
      `${LOG_COLORS.DEBUG}🔍 [${this.requestId}] ${message}${LOG_COLORS.RESET}`,
    )
    if (data) {
      console.dir(data, { depth: 2, colors: true })
    }
  }

  /**
   * Finds the most likely initiating file from the call stack
   * Excludes internal/framework files to find the actual caller
   */
  findInitiatingFile(callStack: string[]): string {
    // Files to exclude when determining the initiating file
    const excludePatterns = [
      "getData.ts",
      "getData.js",
      "node_modules/",
      "next/dist/",
      "react/",
      "webpack/",
      "internal/",
      "server.js",
      "middleware",
    ]

    for (const file of callStack) {
      const shouldExclude = excludePatterns.some((pattern) =>
        file.toLowerCase().includes(pattern.toLowerCase()),
      )

      if (!shouldExclude) {
        return file
      }
    }

    // If no good candidate found, return the first non-internal file
    return (
      callStack.find((file) => !file.includes("node_modules/")) ||
      callStack[0] ||
      "Unknown"
    )
  }

  extractFilePaths(stackTrace: string | undefined): string[] {
    if (!stackTrace) return []

    const regex = /([./\w()@-]+\.tsx?:\d+:\d+)/g
    const files = [...stackTrace.matchAll(regex)]
      .map((match) => match[1].replace("///(rsc)/", ""))
      .slice(1) // Remove first entry (usually this function)
      .slice(0, 10) // Limit to 10 most relevant entries

    return files
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Simple delay function for retry logic
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
