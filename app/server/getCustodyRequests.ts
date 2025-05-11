'use server';

import { CustodyElementSchema } from '@api/schemas/index';
import { ResponseSchema } from '@api/schemas/responseSchema';
import type { CustodyRequest } from '@types';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getCustodyRequests = async (): Promise<CustodyRequest[]> => {
  const isDemo = await getDemo();
  if (isDemo) return CustodyDummyData;

  // ! VARIABLES
  // ! ==================================
  const url = 'api/po/hr/custody';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { employee_id: 21 };
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
  const validatedData = CustodyElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: CustodyRequest[] = validatedData.map((data) => {
    const custodyItem: CustodyRequest = {
      id: data.id.toString(),
      date: data.create_date.toISOString().split('T')[0],
      custodyAmount: data.custody_amount,
      custodyType: data.custody_type,
      status: data.state,
    };
    return custodyItem;
  });

  return returnedData;
};

const CustodyDummyData: CustodyRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'طلب',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'اعتمد',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'مدير عام الإدارة والمشتريات',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'طلب',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'مدير الإدارة المالية',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'نائب المحافظ',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    custodyAmount: 1000,
    custodyType: 'عهدة مؤقتة',
    status: 'اعتمد',
  },
];
