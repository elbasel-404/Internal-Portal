export type PurchaseProduct = {
  product_name: any
  product_qty: any
  quantity_completed: any
  amount_completed: any
  quantity_under_completed: any
  quantity_remain: any
  amount_quantity_remain: any
  price_unit: any
  unit_price_after_tax: any
  price_subtotal: any
  total_after_tax: any
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
