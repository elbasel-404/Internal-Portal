import {
  RelativeRelationElementSchema,
  type RelativeRelationElement,
} from '@api/schemas/relative-relation/schema';
import { ResponseSchema } from '@api/schemas/responseSchema';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getRelativeRelations = async (): Promise<
  RelativeRelationElement[]
> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/hr/medical/insurance/relative-relation';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = {};
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
  console.log({ responseJson });

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson);
  const { result } = validatedResponse;
  const { data } = result;
  const validatedData = RelativeRelationElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================

  const returnedData: RelativeRelationElement[] = validatedData.map((data) => {
    const relationItem: RelativeRelationElement = {
      id: data.id,
      name: data.name,
    };
    return relationItem;
  });

  return returnedData;
};

const dummyData: RelativeRelationElement[] = [
  {
    id: 'son',
    name: 'إبن',
  },
  {
    id: 'daughter',
    name: 'إبنة',
  },
  {
    id: 'husband',
    name: 'زوج (ة)',
  },
  {
    id: 'father',
    name: 'أب',
  },
  {
    id: 'mother',
    name: 'أم',
  },
];
