import { PurchaseProduct } from './PurchaseProduct';

export type PurchaseDetails = {
  id: string;
  requestDate: string;
  type: string;
  requestTitle: string;
  description: string;
  requestOutcomes: string;
  planType: string;
  programName: string;
  projectName: string;
  costs: string;
  awardAmount: string;
  awardAmountBeforeChange: string;
  attachments: File[];
  purchaseProducts: PurchaseProduct[];
};
