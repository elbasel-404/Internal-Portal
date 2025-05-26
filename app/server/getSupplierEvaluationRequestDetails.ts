'use server';

import { SupplierEvaluationRequestDetails } from '@types';

export const getSupplierEvaluationRequestDetails = async (
  id: string
): Promise<SupplierEvaluationRequestDetails | void> => {
  try {
    const details: SupplierEvaluationRequestDetails = {
      id,  
      requestDate: '2025-03-11',
      contract: '2025-007',
      step: 'step 1',
      purchaseRequestNumber: '250087',
      supplier: 'شركة الحلول المتميزة',
      projectName: 'maprobation',
      contractStartDate: '2025-02-13',
      contractEndDate: '2025-02-22',
      startDate: '',
      endDate: '',
      confirmationSerialNumber: '',
      confirmationProjectName: '',
      confirmationContractNumber: '',
      status: 'إعتماد',
      reason: 'test reason',
    };
    return details;
  } catch (error) {
    console.error('Error in getWorkDocumentDetails:', error);
    return;
  }
};
