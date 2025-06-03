export type BatchProduct = {
  id?: string
  product: string
  description: string
  quantity: string
  completedQuantity?: string
  completedCost?: string
  underCompletedQauntity?: string
  underCompletedCost?: string
  remainingQuantity?: string
  remainingCost?: string
  unitPrice: string
  unitPriceWithTax: string
  subtotal: string
}
