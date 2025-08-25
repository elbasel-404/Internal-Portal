import { infoIcons } from "../../components/InfoGrid/config"
import type { GeneralInfoKey } from "@types"

export type IconName = keyof typeof infoIcons

export type GeneralInfo = {
  title: string
  active: boolean
  index: number
  key: GeneralInfoKey
  icon: IconName
  backgroundColor: string
  count: number
  link: string
  id: number
  userId: number
}
