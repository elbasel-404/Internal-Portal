import { infoIcons } from "../../components/InfoGrid/config"
// import type { GeneralInfoKey } from "@types"

export type IconName = keyof typeof infoIcons
export type GeneralInfo = {
  [x: string]: string
}
