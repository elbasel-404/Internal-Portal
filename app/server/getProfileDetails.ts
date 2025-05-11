'use server';

import type { ProfileDetails } from '@types';

export const getProfileDetails = async (): Promise<ProfileDetails> => {
  const profileDetails: ProfileDetails = {
    personalData: {
      id: '106565654874',
      nameEN: 'Bader Amash N Alotaby',
      nationality: 'المملكة العربية السعودية',
      maritalStatus: 'أعزب',
      gender: 'ذكر',
      passportNumber: 'رقم الجواز',
      bloodType: 'O+',
      birthDate: '22-03-1985',
    },
    workData: {
      department: 'خدمة المنشآت/التقنية والحلول الرقمية',
      directManager: 'عبدالله بن سعد القحطاني',
      appointmentDate: '22-03-1985',
      governmentWorkStartDate: '22-03-1985',
    },
    contactInformation: {
      mobilePhone: '0551234567',
      secondMobile: '0551234567',
      workEmail: 'botaby@monshaat.gov.sa',
      personalEmail: 'botaby@gmail.com',
      workplaceLocation: 'المقر الرئيسي - الدور الأرضي',
      workExtension: '4298',
    },
  };
  return { ...profileDetails };
};
