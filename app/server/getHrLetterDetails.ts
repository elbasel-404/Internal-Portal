'use server';

import type { HrLetterDetails } from '@types';
import {
  ResponseSchema,
  SalaryIdentificationElementSchema,
} from '../../api-schemas';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getHrLetterDetails = async (
  id: string
): Promise<HrLetterDetails | void> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/salary/identification/request/read';
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
  const validatedData = SalaryIdentificationElementSchema.parse(data[0]);

  // ! PARSING
  // ! ==================================

  const returnedData: HrLetterDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.order_date,
    destinationAr: validatedData.destination_id[1]?.toString() || '__',
    destinationEn: validatedData.eng_destination || '__',
    type: validatedData.template_name || '__',
    notes: validatedData.notes.toString() || '__',
    attachments: validatedData.message_ids.map(
      (file: { toString: () => string; }) => new File([''], file.toString())
    ),
  };

  return returnedData;
};
const dummyData: HrLetterDetails = {
  id: '1',
  requestDate: '2021-09-01',
  destinationAr: 'لمن يهمه الأمر',
  destinationEn: 'Whom it may concern',
  type: 'خطاب تعريف بالراتب',
  notes:
    'ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ',
  attachments: [
    new File([''], 'نموذج طلب 2 .pdf'),
    new File([''], 'نموذج طلب .pdf'),
  ],
};
