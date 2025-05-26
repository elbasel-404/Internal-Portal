"use server";

import { VacationDetails } from "@types";
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas";
import { getDemo } from "../db/actions/getDemo";
import { getFetchHeaders } from "./getFetchHeaders";

export const getVacationDetails = async (
  id: string
): Promise<VacationDetails> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/holidays/request";
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { id: id };
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
  const validatedData = HolidayElementSchema.parse(data[0]);

  // ! PARSING
  // ! ==================================

  const returnedData: VacationDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.date,
    type: validatedData.holiday_status_id[1].toString(),
    vacationDate: `من ${validatedData.date_from} الي  ${validatedData.date_to}`,
    duration: validatedData.duration.toString(),
    alternativeEmployee: validatedData.substitute_employee_id[1].toString(),
    notes: validatedData.notes,
    attachments: validatedData.attachment_ids.map(
      (file) => new File([""], file.toString())
    ),
  };

  return returnedData;
};

const dummyData: VacationDetails = {
  id: "1",
  requestDate: "2021-09-01",
  type: "اجازة مرضية",
  vacationDate: "من 17-04-2024 الى 18-04-2024",
  duration: "1 يوم",
  alternativeEmployee: "عساف بن رشود الصاعدي (1725)",
  notes:
    "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
};
