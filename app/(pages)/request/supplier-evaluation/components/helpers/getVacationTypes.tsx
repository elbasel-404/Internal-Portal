import { getFetchHeaders } from '../../../../../server/getFetchHeaders';

const url = 'api/po/hr/holidays/status/by_gender';
const apiRootUrl = process.env.API_ROOT_URL as string;
const { headers } = await getFetchHeaders();
const requestUrl = `${apiRootUrl}/${url}`;

// ! FETCH
// ! ==================================
const apiResponse = await fetch(requestUrl, {
  headers,
  method: 'POST',
});
export const responseJson = await apiResponse.json();
