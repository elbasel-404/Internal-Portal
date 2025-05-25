'use server';

import type { HrLetterRequest } from '@types';
import {
  ResponseSchema,
  SalaryIdentificationElementSchema,
} from '../../api-schemas';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getHrLetterRequests = async (): Promise<HrLetterRequest[]> => {
  const isDemo = await getDemo();
  if (isDemo) return HrLetterDummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/salary/identification/request/read';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { employee_id: 447 };
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
  const validatedData = SalaryIdentificationElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: HrLetterRequest[] = validatedData.map((data) => {
    const vacationItem: HrLetterRequest = {
      id: data.id.toString(),
      date: data.order_date,
      description: data.template_name || '__',
      destination: data.destination_id[1]?.toString() || '__',
      status: data.state,
    };
    return vacationItem;
  });

  return returnedData;
};

const HrLetterDummyData: HrLetterRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'طلب',
  },
  {
    id: '#53965',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'المدير المباشر',
  },
  {
    id: '#57965',
    date: '2024-05-05',
    description: 'تثبيت راتب',
    destination: 'لمن يهمه الأمر',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#52965',
    date: '2024-05-05',
    description: 'تعريف بدون راتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#55955',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#54965',
    date: '2024-05-05',
    description: 'تثبيت راتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#55968',
    date: '2024-05-05',
    description: 'تعريف بدون راتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#55645',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'المدير المباشر',
  },
  {
    id: '#55974',
    date: '2024-05-05',
    description: 'تعريف بدون راتب',
    destination: 'لمن يهمه الأمر',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#51965',
    date: '2024-05-05',
    description: 'تثبيت راتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#54565',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#55765',
    date: '2024-05-05',
    description: 'تعريف بدون راتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
  {
    id: '#51265',
    date: '2024-05-05',
    description: 'تعريف بتفاصيل الراتب',
    destination: 'لمن يهمه الأمر',
    status: 'اعتمد',
  },
];
