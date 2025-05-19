"use server";

import type { NewsFamily } from "@types";
import { getDemo } from "../db/actions/getDemo";
import { getFetchHeaders } from "./getFetchHeaders";
import { FamilyNewSchema, ResponseSchema } from "@api/schemas";

export const getFamilyNewsList = async (): Promise<NewsFamily[]> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/portal-news";
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { news_type: "family_news" };
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
  const validatedData = FamilyNewSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: NewsFamily[] = validatedData.map((data) => {
    const newsItem: NewsFamily = {
      id: data.id,
      title: data.title,
      date: (() => {
        const date = new Date(data.create_date);
        const day = date.toLocaleString("en-US", { day: "2-digit" });
        const month = date.toLocaleString("en-US", { month: "2-digit" });
        const year = date.toLocaleString("en-US", { year: "numeric" });
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const period = hours < 12 ? "صباحًا" : "مساءً";
        hours = hours % 12 || 12;
        const hourString = hours.toString().padStart(2, "0");
        return `${day}.${month}.${year} - ${hourString}:${minutes} ${period}`;
      })(),
      image: data.image
        ? `data:image/gif;base64,${data.image}`
        : "/monshaatFamily-1.svg",
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
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحاً",
    image: "/monshaatFamily-1.svg",
    description: "",
  },
  {
    id: 2,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحاً",
    image: "/monshaatFamily-2.svg",
    description: "",
  },
  {
    id: 3,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحاً",
    image: "/monshaatFamily-3.svg",
    description: "",
  },
  {
    id: 4,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 07:54 صباحًا",
    image: "/MonshaatFamily-4.svg",
    description: "",
  },
];
