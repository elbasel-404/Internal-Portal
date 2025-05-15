'use server';

import type { PurchaseProduct } from '@types';

interface getPurchaseProductsAgrs {
  purchaseRequestId: string;
}

export const getPurchaseProductsByRequestId = async ({
  // purchaseRequestId,
}: getPurchaseProductsAgrs): Promise<PurchaseProduct[]> => {
  return dummyData;
};

const dummyData: PurchaseProduct[] = [
  {
    id: '1',
    product: 'لوحة مفاتيح ميكانيكية',
    description: 'لوحة مفاتيح ميكانيكية للأعمال المكتبية',
    quantity: '15',
    completedQuantity: '10',
    completedCost: '3000',
    underCompletedQauntity: '2',
    remainingQuantity: '3',
    remainingCost: '900',
    unitPrice: '300',
    unitPriceWithTax: '345',
    subtotal: '4500',
    subtotalWithTax: '5175',
  },
  {
    id: '2',
    product: 'ماوس لاسلكي Logitech',
    description: 'ماوس دقيق للاستخدام المكتبي',
    quantity: '20',
    completedQuantity: '18',
    completedCost: '1800',
    underCompletedQauntity: '1',
    remainingQuantity: '1',
    remainingCost: '100',
    unitPrice: '100',
    unitPriceWithTax: '115',
    subtotal: '2000',
    subtotalWithTax: '2300',
  },
];
