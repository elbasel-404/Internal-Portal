import { z } from "zod"
import { keyboardAlphaNumericKeys } from "@lib"

export const keyboardAlphaNumericKeysEnum = z.enum(keyboardAlphaNumericKeys)
