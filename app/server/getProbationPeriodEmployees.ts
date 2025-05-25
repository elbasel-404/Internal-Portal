import { ProbationEvaluationEmployeeSchema } from '@api/schemas/index';
import { ResponseSchema } from '@api/schemas/responseSchema';
import type { ProbationPeriodEmployees } from '@types';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getProbationPeriodEmployees = async (): Promise<
  ProbationPeriodEmployees[]
> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/hr/probation-evaluation/fields';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { field_name: 'employees' };
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
  const validatedData = ProbationEvaluationEmployeeSchema.array().parse(data);

  // ! PARSING
  // ! ==================================

  const returnedData: ProbationPeriodEmployees[] = validatedData.map((data) => {
    const probationPeriodEmployeesItem: ProbationPeriodEmployees = {
      id: data.id?.toString(),
      employeeName: data.complete_name?.toString(),
      jobTitle: data.job_id[1]?.toString(),
      jobNumber: data.number,
      department: data.department_id[1]?.toString(),
      appointmentDate: data.hiring_date,
      endProbationPeriodDate: data.date_probation_end,
    };
    return probationPeriodEmployeesItem;
  });

  return returnedData;
};

const dummyData: ProbationPeriodEmployees[] = [
  {
    id: '1',
    employeeName: 'عساف بن رشود الصاعدي',
    jobNumber: '12345',
    jobTitle: 'مهندس برمجيات',
    department: 'تكنولوجيا المعلومات',
    appointmentDate: '2023-01-15',
    endProbationPeriodDate: '2023-04-15',
  },
  {
    id: '2',
    employeeName: 'سارة بنت عبدالله القحطاني',
    jobNumber: '67890',
    jobTitle: 'محلل نظم',
    department: 'تكنولوجيا المعلومات',
    appointmentDate: '2023-02-20',
    endProbationPeriodDate: '2023-05-20',
  },
  {
    id: '3',
    employeeName: 'محمد بن علي العتيبي',
    jobNumber: '54321',
    jobTitle: 'مدير مشروع',
    department: 'إدارة المشاريع',
    appointmentDate: '2023-03-10',
    endProbationPeriodDate: '2023-06-10',
  },
  {
    id: '4',
    employeeName: 'نورة بنت سعيد الزهراني',
    jobNumber: '98765',
    jobTitle: 'أخصائي موارد بشرية',
    department: 'الموارد البشرية',
    appointmentDate: '2023-04-05',
    endProbationPeriodDate: '2023-07-05',
  },
  {
    id: '5',
    employeeName: 'فيصل بن عبدالله الدوسري',
    jobNumber: '11223',
    jobTitle: 'محاسب',
    department: 'المالية',
    appointmentDate: '2023-05-01',
    endProbationPeriodDate: '2023-08-01',
  },
];
