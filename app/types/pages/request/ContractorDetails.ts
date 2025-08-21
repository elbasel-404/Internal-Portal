import type { CovenantDetails } from "@types"
export type ContractorDetails = {
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
