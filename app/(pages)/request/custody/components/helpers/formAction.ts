'use server';

import { z } from 'zod';
import { CreateErrorSchema } from '../../../../../../api-schemas/CreateErrorSchema';
import { CreateSuccessSchema } from '../../../../../../api-schemas/CreateSuccessSchema';
import { getFetchHeaders } from '../../../../../server/getFetchHeaders';
import { requestBodySchema } from './requestBodySchema';
import { State } from './State';

export const formAction = async (formData: FormData): Promise<State> => {
  // ! ==================================
  // ! VARIABLES
  // ! ==================================
  const endpointUrl = 'api/po/hr/custody/create';
  const rootUrl = process.env.API_ROOT_URL;
  const { headers: detailsHeaders } = await getFetchHeaders();

  const requestBody = Object.fromEntries(formData.entries());
  const fetchUrl = `${rootUrl}/${endpointUrl}`;

  const headers = new Headers();
  headers.append('Authorization', detailsHeaders.Authorization);
  headers.append('x-api-key', detailsHeaders['x-api-key']);

  // ! ==================================
  // ! VALIDATION
  // ! ==================================
  const validation = requestBodySchema.safeParse(requestBody);
  const { success, data: validatedRequestBody, error } = validation;
  if (!success) {
    const validationErrors = error.format();

    const validationErrorsEntries = Object.entries(validationErrors);
    validationErrorsEntries.forEach(([key, value]) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        '_errors' in value &&
        Array.isArray((value as { _errors: unknown })._errors)
      ) {
        const errors = value._errors;
        const firstError: string = (errors as string[])[0];
        console.log({ key, error: firstError });
        return { success: false, errors, id: null };
      }
    });
  }

  // ! ==================================
  // ! FETCH
  // ! ==================================
  const fetchFormData = new FormData();
  type RequestBody = z.infer<typeof requestBodySchema>;

  const validatedRequestBodyEntries = Object.entries(
    validatedRequestBody as RequestBody
  );

  validatedRequestBodyEntries.forEach(([key, value]) => {
    fetchFormData.append(key, value as string | File);
  });

  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers,
    body: fetchFormData,
  });

  const responseJson = await response.json();
  const responseObject = responseJson.at(0);

  const isBadRequest = response.status === 400;
  if (isBadRequest) {
    const validatedResponseObject = CreateErrorSchema.parse(responseObject);
    const { error, status } = validatedResponseObject;
    console.log({ status });

    return {
      success: false,
      errors: [error],
      id: null,
    };
  }

  const validatedResponseObject = CreateSuccessSchema.parse(responseObject);
  const { data, message, status } = validatedResponseObject;
  console.log({ message, status });

  return { success: true, errors: null, id: data.id };
};
