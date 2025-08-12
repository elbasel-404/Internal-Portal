import type { RequestLabel } from "@types"
import { JSX, ReactNode } from "react"

export type RequestHeader = {
  label: RequestLabel
  value: ReactNode | JSX.Element | File[] | string | number[]
  key?: string
  tableHeaders?: { label: string; key: string }[]
  index?: number
}
