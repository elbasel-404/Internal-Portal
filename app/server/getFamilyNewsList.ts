'use server';

import { FamilyNewSchema, ResponseSchema } from '@api/schemas';
import type { NewsFamily } from '@types';
import { formatNewsDate } from '@utils';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';

export const getFamilyNewsList = async (): Promise<NewsFamily[]> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = 'api/po/read/portal-news';
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { news_type: 'family_news' };
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
  const validatedData = FamilyNewSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: NewsFamily[] = validatedData.map((data) => {
    const newsItem: NewsFamily = {
      id: data.id,
      title: data.title,
      date: formatNewsDate(data.create_date),
      image: data.image
        ? `data:image/gif;base64,${data.image}`
        : '/monshaatFamily-1.svg',
      description: data.resume,
    };
    return newsItem;
  });
  return returnedData;
};

const dummyData: NewsFamily[] = [
  {
    id: 1,
    title:
      'رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...',
    date: '01.06.2024 - 07:54 صباحاً',
    image: '/monshaatFamily-1.svg',
    description: '',
  },
  {
    id: 2,
    title:
      'رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...',
    date: '01.06.2024 - 07:54 صباحاً',
    image: '/monshaatFamily-2.svg',
    description: '',
  },
  {
    id: 3,
    title:
      'رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...',
    date: '01.06.2024 - 07:54 صباحاً',
    image: '/monshaatFamily-3.svg',
    description: '',
  },
  {
    id: 4,
    title:
      'رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...',
    date: '01.06.2024 07:54 صباحًا',
    image: '/MonshaatFamily-4.svg',
    description: '',
  },
];
