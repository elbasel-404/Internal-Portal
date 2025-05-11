import {
  BankDetailSchema,
  type BankDetail,
} from '@api/schemas/bank-details/schema';
import { ResponseSchema } from '@api/schemas/responseSchema';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getBankDetails = async (): Promise<BankDetail[]> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/hr/new-bank';
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
  const validatedData = BankDetailSchema.array().parse(data);

  // ! PARSING
  // ! ==================================

  const returnedData: BankDetail[] = validatedData.map((data) => {
    const bankItem: BankDetail = {
      id: data.id,
      name: data.name,
      display_name: data.display_name,
    };
    return bankItem;
  });

  return returnedData;
};

const dummyData: BankDetail[] = [
  {
    id: 38,
    name: 'ADCB, Alkarama Brunch, Dubai, UAE',
    display_name: 'ADCB, Alkarama Brunch, Dubai, UAE - ADCBAEAA',
  },
  {
    id: 43,
    name: 'ANZ Bank',
    display_name: 'ANZ Bank',
  },
  {
    id: 23,
    name: 'Bank of America',
    display_name: 'Bank of America - BOFAUS3N',
  },
  {
    id: 16,
    name: 'Bank of America, NA',
    display_name: 'Bank of America, NA - BOFAUS3N',
  },
  {
    id: 55,
    name: 'Bank of Ireland',
    display_name: 'Bank of Ireland - BOFIIE2D',
  },
  {
    id: 49,
    name: 'Barclays',
    display_name: 'Barclays - BUKBGB22',
  },
  {
    id: 46,
    name: 'BMO Harris Bank NA',
    display_name: 'BMO Harris Bank NA - HATRUS44',
  },
  {
    id: 33,
    name: 'BNP Paribas',
    display_name: 'BNP Paribas - BNPASARI',
  },
  {
    id: 34,
    name: 'Branch: Mashreq Bank DIC (Dubai Internet City)',
    display_name:
      'Branch: Mashreq Bank DIC (Dubai Internet City) - SWIFT: BOMLAEAD',
  },
];
