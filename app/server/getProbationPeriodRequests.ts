'use server';

import type { ProbationPeriodRequest } from '@types';

export const getProbationPeriodRequests = async (): Promise<
  ProbationPeriodRequest[]
> => {
  return ProbationPeriodDummyData;
};

const ProbationPeriodDummyData: ProbationPeriodRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    employee: 'عبدالله بن حسين جفري [1651]',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    recommendation: 'اجتياز فترة التجربة',
    status: 'الموظف',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    employee: 'سعود محمد القحطاني [1652]',
    jobTitle: 'محلل نظم موارد بشرية',
    recommendation: 'تمديد فترة التجربة',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    employee: 'نورة عبدالله البلوشي [1653]',
    jobTitle: 'أخصائي توظيف',
    recommendation: 'اجتياز فترة التجربة',
    status: 'اعتمد',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    employee: 'فيصل علي الدوسري [1654]',
    jobTitle: 'مدير مشاريع',
    recommendation: 'إنهاء خدمات الموظف',
    status: 'الموظف',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    employee: 'ريم صالح الزهراني [1655]',
    jobTitle: 'مستشار قانوني',
    recommendation: 'اجتياز فترة التجربة',
    status: 'اعتمد',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    employee: 'عبدالعزيز فهد العتيبي [1656]',
    jobTitle: 'مهندس برمجيات',
    recommendation: 'تمديد فترة التجربة',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    employee: 'فاطمة خالد الشمراني [1657]',
    jobTitle: 'أخصائي تدريب وتطوير',
    recommendation: 'اجتياز فترة التجربة',
    status: 'الموظف',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    employee: 'محمد عبدالعزيز الحربي [1658]',
    jobTitle: 'محاسب',
    recommendation: 'إنهاء خدمات الموظف',
    status: 'اعتمد',
  },
];
