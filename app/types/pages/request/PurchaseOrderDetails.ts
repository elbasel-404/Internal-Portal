import type { ProductsType } from "./ProductsType"

export type PurchaseOrderDetails = {
  purchaseRequestId: string
  purchaseRequestDate: string
  type: string
  description: string
  costs: string
  requestOutcomes: string
  planType: string
  programName: string
  initiativeName: string
  requestAddress: string
  purchaseOrderNumber: string
  resourceName: string
  spentAmount: string
  remainingAmount: string
  contractNumber: string
  contractStartDate: string
  contractEndDate: string
  contractDuration: string
  contractType: string
  awardAmount: string
  products: ProductsType[]
  totalAmount: string
}
