'use server';

import { DeputationRequestDetails } from '@types';

export const getDeputationRequestDetails = async (
  id: string
): Promise<DeputationRequestDetails | void> => {
  try {
    const details: DeputationRequestDetails = {
      id,
      requestDate: "",
      deputation: "",
      transportation: "",
      startDate: "",
      endDate: "",
      duration: "",
      city: "",
      deputationType: "",
      task: "",
      taskDetails: "",
      departureDatesStatus: "",
      travelDuration: "",
      travelStartDate: "",
      travelEndDate: "",
      deputationAmount: "",
      transferDate: "",
      reserved: "",
      status: "",
      reason: "",
      notes: "",
      attachments: [
        new File([''], 'نموذج طلب .pdf'),
        new File([''], 'نموذج طلب 2 .pdf'),
      ],
    };
    return details;
  } catch (error) {
    console.error('Error in getWorkDocumentDetails:', error);
    return;
  }
};
