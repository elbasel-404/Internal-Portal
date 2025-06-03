import { z } from "zod"
import { ErrorCode } from "../lib/ErrorCode"

const errorMessagesArray = Object.values(ErrorCode) as Array<ErrorCode>

export const errorMessageSchema = z.enum(
  errorMessagesArray as [ErrorCode, ...ErrorCode[]],
)
