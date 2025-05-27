'use server';

import { ProbationEvaluationElementSchema } from '@api/schemas/index';
import { ResponseSchema } from '@api/schemas/responseSchema';
import { getDemo } from '@db/actions';
import type { ProbationPeriodRequest } from '@types';
import { getFetchHeaders } from './getFetchHeaders';

export const getProbationPeriodRequests = async (): Promise<
  ProbationPeriodRequest[]
> => {
  const isDemo = await getDemo();
  if (isDemo) return ProbationPeriodDummyData;

  // ! VARIABLES
  // ! ==================================
  const url = 'api/po/hr/probation-evaluation';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { employee_id: 1722 };
  const requestBodyString = JSON.stringify(requestBody);
  const requestUrl = `${apiRootUrl}/${url}`;

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: 'POST',
    body: requestBodyString,
  });
  const responseJson = await apiResponse.json();

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson);
  const { result } = validatedResponse;
  const { data } = result;
  const validatedData = ProbationEvaluationElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: ProbationPeriodRequest[] = validatedData.map((data) => {
    const probationItem: ProbationPeriodRequest = {
      id: data.id.toString(),
      date: data.date,
      employee: data.employee_id[1].toString(),
      jobTitle: data.number,
      recommendation: data.recommendation,
      status: data.state,
    };
    return probationItem;
  });

  return returnedData;
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
