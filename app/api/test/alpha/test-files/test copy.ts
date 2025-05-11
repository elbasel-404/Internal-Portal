// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { allEndpoints } from "@monshaat/portal-api";
// import { z } from "zod";
// import type { Endpoint, Operation } from "../../../getFormAction";
// import { PostResponse, post } from "../../../post";

// /**
//  * Generic type guard to check if an object has a specific property with a non-null value
//  * @param obj The object to check
//  * @param prop The property name to check for
//  * @returns Type predicate indicating whether the property exists and has a non-null value
//  */
// function hasProperty<T, K extends string, V>(
//   obj: T,
//   prop: K
// ): obj is T & { [P in K]: NonNullable<V> } {
//   return (
//     obj !== null &&
//     obj !== undefined &&
//     typeof obj === "object" &&
//     prop in obj &&
//     (obj as any)[prop] !== undefined &&
//     (obj as any)[prop] !== null &&
//     (obj as any)[prop] !== false
//   );
// }

// /**
//  * Specialized type guard for checking if an object has an ID-name tuple property
//  */
// function hasIdNameTuple<T, K extends string>(
//   obj: T,
//   prop: K
// ): obj is T & { [P in K]: [number, string] } {
//   return hasProperty(obj, prop);
// }

// type Args = {
//   endpoint: Endpoint;
//   operation: Operation;
// };

// export const getApiCallback = ({ endpoint, operation }: Args) => {
//   const { details, list } = allEndpoints[endpoint];
//   const {
//     requestSchema: detailsRequestSchema,
//     responseSchema: detailsResponseSchema,
//     url: detailsURl,
//   } = details;
//   const {
//     requestSchema: listRequestSchema,
//     responseSchema: listResponseSchema,
//     url: listUrl,
//   } = list;

//   let requestSchema: typeof detailsRequestSchema | typeof listRequestSchema;
//   let responseSchema: typeof detailsResponseSchema | typeof listResponseSchema;
//   let url: string;

//   switch (operation) {
//     case "details":
//       url = detailsURl;
//       requestSchema = detailsRequestSchema;
//       responseSchema = detailsResponseSchema;
//       break;
//     case "list":
//       url = listUrl;
//       requestSchema = listRequestSchema;
//       responseSchema = listResponseSchema;
//       break;
//     default:
//       throw new Error("Invalid operation");
//   }

//   const validateRequestBody = (body: unknown): RequestBody => {
//     const validatedBody = requestSchema.parse(body);
//     return validatedBody;
//   };

//   type RequestBody = z.infer<typeof requestSchema>;
//   type ResponseBody = z.infer<typeof responseSchema>;

//   const validateResponseBody = (body: unknown): ResponseBody => {
//     const validatedBody = responseSchema.parse(body);
//     return validatedBody;
//   };

//   const postFunction = async (body: RequestBody) => {
//     const response = await post({
//       url,
//       body,
//     });
//     return response;
//   };

//   type ParsedDataReturn = {
//     data: ResponseBody | null;
//     metaData: PostResponse | null;
//     error: string | null;
//     operation: string;
//     endpoint: string;
//     validationError: string | null;
//   };

//   const callback = async (requestBody: RequestBody) => {
//     const parsedDataReturn: ParsedDataReturn = {
//       endpoint,
//       operation,
//       data: null,
//       error: null,
//       validationError: null,
//       metaData: null,
//     };
//     let validatedRequestBody: RequestBody;
//     let postResponse: PostResponse;
//     let responseBody: ResponseBody | unknown;

//     try {
//       validatedRequestBody = validateRequestBody(requestBody);
//     } catch (error: unknown) {
//       console.log(error);
//       parsedDataReturn.validationError = "Invalid request body";
//       return parsedDataReturn;
//     }

//     try {
//       postResponse = await postFunction(validatedRequestBody);
//       const { response } = postResponse;
//       const { responseData: responseJson } = response;
//       responseBody = responseJson;
//       parsedDataReturn.metaData = postResponse;
//     } catch (error: unknown) {
//       console.log(error);
//       parsedDataReturn.error = "Error in post function";
//       return parsedDataReturn;
//     }

//     try {
//       const validatedResponseBody = validateResponseBody(responseBody);
//       parsedDataReturn.data = validatedResponseBody;

//       // Example of using type guards with the response data
//       if (
//         Array.isArray(validatedResponseBody) &&
//         validatedResponseBody.length > 0
//       ) {
//         const firstItem = validatedResponseBody[0];

//         // Check for state property
//         if (
//           hasProperty<typeof firstItem, "state", string>(firstItem, "state")
//         ) {
//           console.log(`State: ${firstItem.state.toLowerCase()}`);
//         }

//         // Check for holiday_status_id tuple
//         if (hasIdNameTuple(firstItem, "holiday_status_id")) {
//           const [id, name] = firstItem.holiday_status_id;
//           console.log(`Holiday status: ${name} (ID: ${id})`);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       parsedDataReturn.error = "Validation Error";
//       parsedDataReturn.validationError = `Invalid response body, ${JSON.stringify(
//         postResponse.request
//       )} \n StatusText: \n ${
//         postResponse.response.responseStatus.responseStatusText
//       } \n 
//           \n StatusOk: \n ${postResponse.response.responseStatus.ok} \n
//           \n ${JSON.stringify(postResponse.response.responseData)?.slice(0, 1)}
//       `;
//       return parsedDataReturn;
//     }

//     return parsedDataReturn;
//   };

//   // Create specific helper functions for this endpoint and operation
//   const createHelpers = (data: ResponseBody) => {
//     // Return typed helper functions specific to this response data
//     return {
//       hasState: <T extends Record<string, any>>(
//         item: T
//       ): item is T & { state: string } => {
//         return hasProperty<T, "state", string>(item, "state");
//       },
//       hasHolidayStatus: <T extends Record<string, any>>(
//         item: T
//       ): item is T & { holiday_status_id: [number, string] } => {
//         return hasIdNameTuple(item, "holiday_status_id");
//       },
//     };
//   };

//   return {
//     callback,
//     createHelpers,
//   };
// };
