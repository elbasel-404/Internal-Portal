'use server';

import type { JobApplicationsRequest } from '@types';

export const getJobApplicationsRequests = async (): Promise<
JobApplicationsRequest[]
> => {
  return JobApplicationsDummyData;
};

const JobApplicationsDummyData: JobApplicationsRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    description: 'جديد',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'الموظف',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    description: 'بديل مستقيل',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    description: 'جديد',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'اعتمد',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    description: 'نقل داخلي',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'طلب',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    description: 'بديل مستقيل',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'اعتمد',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    description: 'جديد',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    description: 'بديل مستقيل',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'طلب',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    description: 'نقل داخلي',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    status: 'اعتمد',
  },
];
