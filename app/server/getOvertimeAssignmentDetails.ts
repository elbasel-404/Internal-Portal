"use server";

import { OvertimeAssignmentDetails } from "@types";
import { getDemo } from "../db/actions/getDemo";
import { getFetchHeaders } from "./getFetchHeaders";
import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas";

export const getOvertimeAssignmentDetails = async (
  id: string
): Promise<OvertimeAssignmentDetails | void> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/overtime_assignment";
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = {
    id: id,
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
  const validatedData = OvertimeAssignmentElementSchema.parse(data[0]);

  // ! PARSING
  // ! ==================================
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : "";

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : "";

  const returnedData: OvertimeAssignmentDetails = {
    id: getStringValue(validatedData.name),
    applicant: getArrayValue(validatedData.employee_id),
    fromDate: getStringValue(validatedData.date_from),
    toDate: getStringValue(validatedData.date_to),
    hours: validatedData.nb_hours?.toString() ?? "",
    assignmentDescription: getStringValue(validatedData.description),
  };
  return returnedData;
};
const dummyData: OvertimeAssignmentDetails = {
  id: "#55470",
  applicant: "خالد إبراهيم",
  fromDate: "2024-03-05 15:00",
  toDate: "2024-03-05 19:00",
  hours: "4",
  assignmentDescription: "التفاوض مع الموردين وتحديث العقود",
};
