// import { endpoints } from "api-schemas";
// import { z } from "zod";
// import type { Endpoint, Operation } from "./getFormAction";
// import { PostResponse, post } from "./post";

// type Args = {
//   endpoint: Endpoint;
//   operation: Operation;
// };

// export const getApiCallback = ({ endpoint, operation }: Args) => {
//   const { details, list } = endpoints[endpoint];
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
//       throw new Error("requestSchemaInvalid operation");
//   }

//   const validateRequestBody = (body: unknown): RequestBody => {
//     const validatedBody = requestSchema.parse(body);
//     return validatedBody;
//   };

//   type RequestBody = z.infer<typeof requestSchema>;
//   type ResponseBody = z.infer<typeof responseSchema>;
//   const vaidateResponseBody = (body: unknown): ResponseBody => {
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
//       const validatedResponseBody = vaidateResponseBody(responseBody);
//       parsedDataReturn.data = validatedResponseBody;
//       // const firtItem = validatedResponseBody[0];
//       // const {} = firtItem;
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
//   return callback;
// };
