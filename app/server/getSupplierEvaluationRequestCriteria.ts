'use server';

import {SupplierEvaluationCriterion} from '@types';

export const getSupplierEvaluationRequestCriteria = async (
  id: string
): Promise<SupplierEvaluationCriterion[] | void> => {
  try {
    return SupplierEvaluationData;
  } catch (error) {
    console.error('Error in getWorkDocumentDetails:', error);
    return;
  }
};
const SupplierEvaluationData: SupplierEvaluationCriterion[] = [];