'use server';

import { DeputationRequestDetails } from '@types';

export const getDeputationRequestDetails = async (
  id: string
): Promise<DeputationRequestDetails | void> => {
  try {
    const details: DeputationRequestDetails = {
      id,
      requestType: 'تحديث',
      requestDate: '2024-11-03',
      documentType: 'تعليمات وارشادات',
      documentAddress: 'pop',
      target: 'inht',
      employee: '[1762] عساف بن رشود الصاعدي',
      sector: 'خدمات المنشآت',
      management:
        'خدمات المنشآت / التقنية والحلول الرقمية / تقنية المعلومات / الأنظمة الداخلية',
      status: 'اعتمد',
      attachments: [
        new File([''], 'نموذج طلب 2 .pdf'),
        new File([''], 'نموذج طلب .pdf'),
      ],
    };
    return details;
  } catch (error) {
    console.error('Error in getWorkDocumentDetails:', error);
    return;
  }
};
