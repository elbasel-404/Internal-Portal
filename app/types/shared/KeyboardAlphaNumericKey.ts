// app/types/shared/KeyboardAlphaNumericKey.ts
import { z } from "zod"
import { keyboardAlphaNumericKeysEnum } from "@zodSchemas"

export type KeyboardAlphaNumericKey = z.infer<
  typeof keyboardAlphaNumericKeysEnum
>
