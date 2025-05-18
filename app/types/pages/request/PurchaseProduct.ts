export type PurchaseProduct = {
  id: string;
  product: string;
  description: string;
  quantity: string;
  completedQuantity?: string;
  completedCost?: string;
  underCompletedQauntity?: string;
  remainingQuantity?: string;
  remainingCost?: string;
  unitPrice: string;
  unitPriceWithTax: string;
  subtotal: string;
  subtotalWithTax?: string;
};
