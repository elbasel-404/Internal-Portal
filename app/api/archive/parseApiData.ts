// // import { requestMaps } from "./parseMaps";
// // const { vacationsMaps } = requestMaps;
// // const { vacationsListMap } = vacationsMaps;
// // import { VacationRequestSchema } from "@schemas"; // use in validation;

// import { allEndpoints } from "@monshaat/portal-api";
// import type { Endpoint } from "./getFormAction";
// import { parseMaps } from "./parseMaps";

// type Operation = "list" | "details";
// type Args<Data> = {
//   data: Data;
//   endpoint: keyof typeof parseMaps;
//   operation: Operation;
// };
// export const parseApiData = <Data>({
//   data,
//   endpoint,
//   operation,
// }: Args<Data>) => {
//   const isArray = Array.isArray(data);
//   if (isArray) {
//     const dataArray = [...data];
//     const responseSchema = allEndpoints[endpoint][operation].responseSchema;
//     const parsedData = dataArray.map((dataItem) => {
//       const apiObject = responseSchema.parse(dataItem);
//       const appObject = parseMaps[endpoint][operation];
//       const apiObjectEnteries = Object.entries(apiObject);
//       const parsedData: Record<keyof typeof appObject, unknown> = {};
//       for (const [appDataKey, apiDataKey] of apiObjectEnteries) {
//         const value =
//           apiObject[apiDataKey as unknown as keyof typeof apiObject];
//         parsedData[appDataKey as keyof typeof appObject] = value;
//       }
//       return parsedData;
//     });
//     return parsedData;
//     // const itemProps = Object.getOwnPropertyNames(dataItem);
//   }
//   // console.log(typeof data, data);
//   // console.log(typeof data[0])
//   // return typeof data;
//   // const keys = Object.keys(data);
//   // const values = Object.values(data);
//   // const enteries = Object.entries(data);
//   // console.log({ keys, values });
//   // for (const entry in enteries) {
//   //   const [key, value] = entry;
//   //   console.log({ key, value });
//   // }
//   // get api data from the api (raw data)
//   // loop over the vacationsListMap enteries [appKey, apiDataKey]
//   // let parsedData = {}
//   // for each appKey:
//   //     const respectiveApiKey = data[apiDataKey]
//   //     const value = data[respectiveApiKey]
//   //     parsedData[appKey] = value
//   // validate the parsedData
//   // return validatedParsedData
//   //
// };
