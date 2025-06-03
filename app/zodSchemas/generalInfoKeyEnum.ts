import { z } from "zod"
import { generalInfoKeys } from "@lib"

export const generalInfoKeyEnum = z.enum(generalInfoKeys)
