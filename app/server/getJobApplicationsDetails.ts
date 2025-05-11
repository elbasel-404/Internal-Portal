'use server';

import type { JobApplicationsDetails } from '@types';

export const getJobApplicationsDetails = async (
  id: string
): Promise<JobApplicationsDetails | void> => {
  const jobApplicationsDetails: JobApplicationsDetails = {
    id: '1',
    requestDate: '2021-09-01',
    requestType: 'جديد',
    applicant: '(1762) عساف بن رشود الصاعدي',
    sector: 'ريادة الاعمال',
    generalAdministration: 'ريادة الاعمال / الإبتكار',
    department: 'ريادة الاعمال / الإبتكار / الإبتكار / الإبتكار',
    management: 'ريادة الاعمال / الإبتكار / الإبتكار / الإبتكار',
  };
  return { ...jobApplicationsDetails, id };
};
