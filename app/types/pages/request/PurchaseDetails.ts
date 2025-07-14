import { PurchasePayments } from "./PurchasePayments"
import { PurchaseProduct } from "./PurchaseProduct"

export type PurchaseDetails = {
  id: string
  requestDate: string
  type: string
  requestTitle: string
  description: string
  requestOutcomes: string
  planType: string
  programName: string
  projectName: string
  totalAmount: string
  awardAmount: string
  awardAmountBeforeChange: string
  paymentType: string
  payment_partner: string
  attachments: File[]
  purchaseProducts: PurchaseProduct[]
  payments: PurchasePayments[]
}
