import { z } from "zod"
import { paths } from "@lib"

export const pathNames = Object.keys(paths) as [keyof typeof paths]

export const pathNamesSchema = z.enum(pathNames)
