"use server";

import type { VacationRequest } from "@types";
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas";
import { getDemo } from "../db/actions/getDemo";
import { getFetchHeaders } from "./getFetchHeaders";

export const getVacationRequests = async (): Promise<VacationRequest[]> => {
  const isDemo = await getDemo();
  if (isDemo) return dummyData;

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/holidays/request";
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const { headers } = await getFetchHeaders();
  const requestBody = { employee_id: 1711 };
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
  const validatedData = HolidayElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  const returnedData: VacationRequest[] = validatedData.map((data) => {
    const vacationItem: VacationRequest = {
      id: data.id.toString(),
      date: data.date,
      description: data.holiday_status_id[1].toString(),
      startDate: data.date_from,
      endDate: data.date_to,
      durationInDays: data.duration,
      approvalDate: data.done_date,
      status: data.state,
    };
    return vacationItem;
  });

  return returnedData;
};
const dummyData: VacationRequest[] = [
  {
    id: "#55965",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "طلب",
  },
  {
    id: "#55964",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "المدير المباشر",
  },
  {
    id: "#55963",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "اعتمد",
  },
  {
    id: "#55961",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "طلب",
  },
  {
    id: "#55960",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-04-10",
    endDate: "2024-05-03",
    durationInDays: 24,
    approvalDate: new Date(),
    status: "المدير المباشر",
  },
  {
    id: "#55959",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55958",
    date: "2024-05-04 - 14:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-02",
    endDate: "2024-05-03",
    durationInDays: 2,
    approvalDate: new Date(),
    status: "طلب",
  },
  {
    id: "#55957",
    date: "2024-05-04 - 10:15:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-02",
    durationInDays: 2,
    approvalDate: new Date(),
    status: "اعتمد",
  },
  {
    id: "#55956",
    date: "2024-05-03 - 09:45:00",
    description: "إجازة سنوية",
    startDate: "2024-04-29",
    endDate: "2024-05-01",
    durationInDays: 3,
    approvalDate: new Date(),
    status: "عمليات الموارد البشرية",
  },
];

// let approvalDate = j.done_date as string;
// const typeOfApprovalData = typeof approvalDate;
// if (typeOfApprovalData !== "string") {
//   approvalDate = "";
// }
// const item: VacationRequest = {
//   id: String(j.id),
//   date: j.date,
//   description: j.display_name,
//   startDate: j.date_from,
//   endDate: j.date_to,
//   approvalDate,
//   durationInDays: j.duration,
//   status: j.state,
// };
// return item;
