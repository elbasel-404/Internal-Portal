'use server';

import { FamilyNewSchema, ResponseSchema } from '@api/schemas';
import type { NewsFamily } from '@types';
import { formatNewsDate } from '@utils';
import { getDemo } from '../db/actions/getDemo';
import { getFetchHeaders } from './getFetchHeaders';
import {formatDate} from "@utils"

export const getFamilyNewsDetails = async (
  id: string
): Promise<NewsFamily | void> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/portal-news";
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = {
    news_type: "family_news",
    news_id: id,
  };
  const requestBodyString = JSON.stringify(requestBody);
  const requestUrl = `${apiRootUrl}/${url}`;

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  });
  const responseJson = await apiResponse.json();

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson);
  const { result } = validatedResponse;
  const { data } = result;
  const validatedData = FamilyNewSchema.parse(data[0]);

  // ! PARSING
  // ! ==================================

  const returnedData: NewsFamily = {
    id: validatedData.id,
    title: validatedData.title,
    date: formatDate(validatedData.create_date),
    image: validatedData.image
    ? `data:image/gif;base64,${validatedData.image}`
    : "/monshaatFamily-1.svg",
    description: validatedData.resume,
  };
  return returnedData;
};
const dummyData: NewsFamily = {
        id: 1,
        title:
          "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
        date: "01.06.2024 - 07:54 صباحاً",
        image: "/monshaatFamily-1.svg",
        description: "",
  };
