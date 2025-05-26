import { ProbationEvaluationFieldsSchema } from '@api/schemas/index';
import { ResponseSchema } from '@api/schemas/responseSchema';
import type { ProbationPeriodFields } from '@types';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getProbationPeriodFields = async (
  name: string
): Promise<ProbationPeriodFields[]> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/hr/probation-evaluation/fields';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { field_name: name };
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
  const validatedData = ProbationEvaluationFieldsSchema.array().parse(data);

  // ! PARSING
  // ! ==================================

  const returnedData: ProbationPeriodFields[] = validatedData.map((data) => {
    const probationPeriodFieldItem: ProbationPeriodFields = {
      id: data.id?.toString(),
      name: data.name,
      display_name: data.display_name?.toString(),
    };
    return probationPeriodFieldItem;
  });

  return returnedData;
};

const dummyData: ProbationPeriodFields[] = [
  {
    id: '1',
    name: 'الموظفين',
    display_name: 'الموظفين',
  },
  {
    id: '2',
    name: 'الوظائف',
    display_name: 'الوظائف',
  },
  {
    id: '3',
    name: 'الإدارات',
    display_name: 'الإدارات',
  },
  {
    id: '4',
    name: 'المشرفين',
    display_name: 'المشرفين',
  },
  {
    id: '5',
    name: 'التقييمات',
    display_name: 'التقييمات',
  },
];
