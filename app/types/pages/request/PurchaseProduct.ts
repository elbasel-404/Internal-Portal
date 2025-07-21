export type PurchaseProduct = {
  product_name?: string
  product_qty?: number
  quantity_completed?: number
  amount_completed?: number
  quantity_under_completed?: number
  quantity_remain?: number
  amount_quantity_remain?: number
  price_unit?: number
  unit_price_after_tax?: number
  price_subtotal?: number
  total_after_tax?: number
  id: string
  product: string
  description: string
  quantity: string
  completedQuantity?: string
  completedCost?: string
  underCompletedQauntity?: string
  remainingQuantity?: string
  remainingCost?: string
  unitPrice: string
  unitPriceWithTax: string
  subtotal: string
  subtotalWithTax?: string
}
