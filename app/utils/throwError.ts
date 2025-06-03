import { ErrorCode } from "../lib/ErrorCode"

export const throwError = (
  errorCode: ErrorCode,
  path?: string,
  message?: string,
) => {
  const error = new Error(errorCode)
  error.name = errorCode
  error.message = message || errorCode
  if (path) {
    error.stack = path
  }
  throw error
}
