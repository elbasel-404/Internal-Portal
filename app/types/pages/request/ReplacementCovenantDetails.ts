import type { CovenantDetails } from "@types"
export type ReplacementCovenantDetails = {
  id: string
  date: string
  pledgeAmount: string
  pledgeType: string
  covenantRequestNumber: string
  covenantPurpose: string
  covenantAmount: string
  covenantDate: string
  details: CovenantDetails[]
}
