// import { allEndpoints } from "@monshaat/portal-api";
// import { z } from "zod";
// import { post, PostResponse } from "./post";

// export type Endpoint = keyof typeof allEndpoints;
// export type Operation = "list" | "details" | "create";
// export const getFormAction = (endpoint: Endpoint, operation: Operation) => {
//   // const { details, list, create } = allEndpoints[endpoint];
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
//       throw new Error("requestSchemaInvalid operation");
//   }

//   type RequestBody = z.infer<typeof requestSchema>;
//   type ResponseBody = z.infer<typeof responseSchema>;

//   const validateRequestBody = (body: unknown): RequestBody => {
//     const validatedBody = requestSchema.parse(body);
//     return validatedBody;
//   };

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

//   type FormActionReturn = {
//     data: ResponseBody | null;
//     metaData: PostResponse | null;
//     error: string | null;
//     operation: string;
//     endpoint: string;
//     validationError: string | null;
//   };

//   const formAction = async (formData: FormData): Promise<FormActionReturn> => {
//     const body = Object.fromEntries(formData);

//     const formActionReturn: FormActionReturn = {
//       endpoint,
//       operation,
//       data: null,
//       error: null,
//       validationError: null,
//       metaData: null,
//     };

//     let metaData: PostResponse | null = null;
//     let validResponseBody: ResponseBody;
//     let validRequestBody: RequestBody;

//     try {
//       let id: number | string = body.id?.toString();
//       let employee_id: number | string = body.employee_id?.toString();

//       if (id) {
//         id = parseInt(id);
//       }

//       if (employee_id) {
//         employee_id = parseInt(employee_id);
//       }

//       validRequestBody = validateRequestBody({ ...body, id, employee_id });
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (e: unknown) {
//       formActionReturn.error = "Error in validateRequestBody";
//       formActionReturn.validationError =
//         e instanceof Error ? e.message : "Error in vaidateResponseBody";
//       return formActionReturn;
//     }

//     try {
//       metaData = await postFunction(validRequestBody);
//       formActionReturn.metaData = metaData;
//       const postFunctionError = metaData?.response.error;
//       if (postFunctionError) {
//         formActionReturn.error = postFunctionError;
//         return formActionReturn;
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (e: unknown) {
//       formActionReturn.error = "Errorin postFunction";
//       formActionReturn.validationError =
//         e instanceof Error ? e.message : "Error in vaidateResponseBody";
//       return formActionReturn;
//     }

//     try {
//       const { response } = metaData;
//       const { responseData: responseJson } = response;
//       validResponseBody = vaidateResponseBody(responseJson);
//       formActionReturn.data = validResponseBody;
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (e: unknown) {
//       formActionReturn.error = metaData.response.error;
//       formActionReturn.validationError =
//         e instanceof Error ? e.message : "Error in vaidateResponseBody";
//       return formActionReturn;
//     }
//     return formActionReturn;
//   };

//   return formAction;
// };
