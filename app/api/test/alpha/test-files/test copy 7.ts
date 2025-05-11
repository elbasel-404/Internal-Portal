// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { allEndpoints } from "@monshaat/portal-api";
// import { z } from "zod";
// import type { Endpoint, Operation } from "../../../getFormAction";
// import { PostResponse, post } from "../../../post";

// /**
//  * Generic type guard to check if an object has a specific property with a non-null value
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
//     (obj as any)[prop] !== null
//     // Removed the false check as it might be a valid value
//   );
// }

// /**
//  * Specialized type guard for checking if an object has an ID-name tuple property
//  */
// function hasIdNameTuple<T, K extends string>(
//   obj: T,
//   prop: K
// ): obj is T & { [P in K]: [number, string] } {
//   return (
//     hasProperty(obj, prop) &&
//     Array.isArray((obj as any)[prop]) &&
//     (obj as any)[prop].length === 2
//   );
// }

// type ApiCallbackArgs = {
//   endpoint: Endpoint;
//   operation: Operation;
// };

// type ParsedDataReturn<T> = {
//   data: T | null;
//   metaData: PostResponse | null;
//   error: string | null;
//   operation: string;
//   endpoint: string;
//   validationError: string | null;
// };

// export const getApiCallback = ({ endpoint, operation }: ApiCallbackArgs) => {
//   const { details, list } = allEndpoints[endpoint];

//   // Select the appropriate schemas and URL based on operation
//   const { requestSchema, responseSchema, url } =
//     operation === "details" ? details : list;

//   type RequestBody = z.infer<typeof requestSchema>;
//   type ResponseBody = z.infer<typeof responseSchema>;

//   const validateRequestBody = (body: unknown): RequestBody => {
//     return requestSchema.parse(body);
//   };

//   const validateResponseBody = (body: unknown): ResponseBody => {
//     return responseSchema.parse(body);
//   };

//   const postFunction = async (body: RequestBody): Promise<PostResponse> => {
//     return await post({ url, body });
//   };

//   const callback = async (
//     requestBody: unknown
//   ): Promise<ParsedDataReturn<ResponseBody>> => {
//     const parsedDataReturn: ParsedDataReturn<ResponseBody> = {
//       endpoint,
//       operation,
//       data: null,
//       error: null,
//       validationError: null,
//       metaData: null,
//     };

//     // Validate request body
//     try {
//       const validatedRequestBody = validateRequestBody(requestBody);

//       // Make API call
//       try {
//         const postResponse = await postFunction(validatedRequestBody);
//         parsedDataReturn.metaData = postResponse;

//         const { responseData: responseJson } = postResponse.response;

//         // Validate response body
//         try {
//           parsedDataReturn.data = validateResponseBody(responseJson);
//         } catch (error) {
//           console.log(error);
//           parsedDataReturn.error = "Validation Error";
//           parsedDataReturn.validationError =
//             formatValidationError(postResponse);
//         }
//       } catch (error) {
//         console.error(error);
//         parsedDataReturn.error = "API request failed";
//       }
//     } catch (error) {
//       console.error(error);
//       parsedDataReturn.validationError = "Invalid request body";
//     }

//     return parsedDataReturn;
//   };

//   // Helper function to format validation errors
//   const formatValidationError = (postResponse: PostResponse): string => {
//     return `Invalid response body, ${JSON.stringify(postResponse.request)}\n
//       StatusText: ${postResponse.response.responseStatus.responseStatusText}\n
//       StatusOk: ${postResponse.response.responseStatus.ok}\n
//       `;
//   };

//   // Create specific helper functions for this endpoint and operation
//   const createHelpers = () => {
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
