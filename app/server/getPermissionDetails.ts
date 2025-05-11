'use server';

import { PermissionDetails } from '@types';
import { PermissionElementSchema, ResponseSchema } from '../../api-schemas';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getPermissionDetails = async (
  id: string
): Promise<PermissionDetails | void> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/hr/authorization';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { id: id };
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
  const validatedData = PermissionElementSchema.parse(data[0]);

  // ! PARSING
  // ! ==================================

  const returnedData: PermissionDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.date,
    dateFrom: validatedData.date_from,
    dateTo: validatedData.date_to,
    reason: validatedData.reason,
    duration: validatedData.hour_number.toFixed(2),
    type: validatedData.type_id[1].toString(),
    time: `من ${validatedData.hour_from.toFixed(
      2
    )} الي  ${validatedData.hour_to.toFixed(2)}`,
    attachments: validatedData.attachment_ids.map(
      (file) => new File([''], file.toString())
    ),
  };

  return returnedData;
};

const dummyData: PermissionDetails = {
  id: '1',
  requestDate: '17-04-2024',
  type: '[01]استئذان شخصي',
  reason: 'سبب مكتوب من قبل الموظف',
  time: 'من 10:00 إلى 13:00',
  duration: '03:00 ساعة',
  dateFrom: '17-04-2024',
  dateTo: '17-04-2024',
  attachments: [
    new File([''], 'نموذج طلب 2 .pdf'),
    new File([''], 'نموذج طلب .pdf'),
  ],
};
