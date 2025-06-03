import { Route } from "next"
import { IconKey } from "./IconKey"

export type MenuItem = {
  iconKey: IconKey
  label: string
  href: Route
  hasSubMenu?: boolean
  tag?: string
  subMenuItems?: MenuItem[]
}
