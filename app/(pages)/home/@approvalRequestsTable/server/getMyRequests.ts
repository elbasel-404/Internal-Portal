"use server"

import { getDemo } from "@db/actions"
import { RequestType } from "@types"
import { getStoredEmployeeId } from "@auth"
import z from "zod"

type GetApprovalRequestsParams = {
  limit?: number
  cursor?: Date
}

export const getMyRequests = async ({
  cursor = new Date("2025-08-17 09:40:25"),
  limit = 20,
}: GetApprovalRequestsParams): Promise<RequestType[]> => {
  const demo = await getDemo()
  if (demo) return dummyData

  const employeeId = await getStoredEmployeeId()

  const fetchOptions = {
    method: "POST",
    headers: {
      cookie: "session_id=098a867e1d251b394882c6d2271d9ec24d024bac",
      Accept: "application/json",
      Authorization: "Bearer tXbNnglm6WdQk2UcZjeDK5CmJvW66b",
      "x-api-key": "85ced9c9-b64b-4d76-85a5-ae3b869b044d",
    },
    cache: "force-cache" as const,
    next: { revalidate: 60 * 60 * 24 },
  }

  console.info("Fetching /retrieve_all_new")
  const json = await fetch(
    `https://apis.monshaat.gov.sa/ERP/TaskService/api/mo/v2/retrieve_all_new?employee_id=${employeeId}&limit_per_request=${limit}&cursor=${encodeURIComponent(cursor.toISOString())}`,
    fetchOptions,
  ).then((res) => res.json())
  const { success, data, error } = responseSchema.safeParse(json)

  if (!success) {
    console.error(error)
    return [
      {
        id: "VALIDATION_ERROR",
        description: "VALIDATION_ERROR",
        date: "VALIDATION_ERROR",
      },
    ]
  }

  const records = data[0].data.all_records
  const parsedData = records.map(({ id, date, holiday_status_id }) => {
    const holidayType = holiday_status_id?.at(1) ?? "N/A"
    return {
      description: holidayType ?? "N/A",
      date: date ?? "N/A",
      id: id?.toString() ?? "N/A",
    }
  })

  return parsedData
}

const resModelSchema = z.enum([
  "hr.holidays",
  "hr.deputation",
  "hr.job.request",
  "hr.authorization",
  "change.bank.account",
  "change.bank.account.request",
  "hr.medical.insurance",
  "salary.identification.request",
  "helpdesk.ticket",
  "hr.distance.work",
  "purchase.request",
  "purchase.requisition",
  "purchase.contract",
  "contractor.request",
  "hr.relation.supplier.evaluation",
  "work.order",
  "hr.payslip",
  "hr.payslip.run",
  "hr.training.request",
  "payment.order",
  "purchase.order",
  "purchase.add.budget",
  "certificate.achievement",
  "hr.training.public",
  "hr.resignation",
  "manage.financial.custody",
  "manage.financial.custody.close",
  "hr.employee.members",
  "hr.passport.request",
  "hr.probation.evaluation",
  "hr.performance.planning",
  "hr.performance.flow",
  "hr.overtime.assignment",
  "hr.performance.evaluation",
  "hr.overtime.request",
  "helpdesk.service",
])
const tupleSchema = z.tuple([z.number(), z.string()]).or(z.any()) // [2025, "[1894] خالد بن عبدالله العمري"]

const recordSchema = z.object({
  res_model: resModelSchema.or(z.any()),
  attachment_ids: tupleSchema.or(z.any()), // can be "false": bool
  holiday_status_id: tupleSchema.or(z.any()), // [ إجازة سنوية", 1 ]
  employee_id: tupleSchema.or(z.any()), // [2025, "[1894] خالد بن عبدالله العمري"]
  department_global_id: tupleSchema.or(z.any()), // unsure of data type
  sector_id: tupleSchema.or(z.any()), // unsure of data type
  id: z.number().or(z.any()), // number
  create_date: z.string().or(z.any()), // string date iso "2025-08-17 08:54:11"
  duration: z.number().or(z.any()), // number
  date_from: z.string().or(z.any()), // string "2025-08-19"
  date_to: z.string().or(z.any()), // string "2025-08-19"
  notes: z.string().or(z.boolean()).or(z.any()), // can be "false": bool
  death_person: z.string().or(z.boolean()).or(z.any()), // can be "false": bool
  substitute_employee_id: z
    .array(z.string().or(z.number().or(z.any())))
    .or(z.any()), // [ عبد الله بن محمد الزهراني", 1722 ]
  refuse_reason: z.string().or(z.boolean()).or(z.any()), // can be "false": bool
  childbirth_date: z.string().or(z.boolean()).or(z.any()), // can be "false": bool
  name: z.string().or(z.any()),
  date: z.string().or(z.any()),
  state: z.string().or(z.any()),
  cancel_reason: z.string().or(z.boolean()).or(z.any()), // can be "false": bool
})

const dataSchema = z.object({
  is_manager: z.string().or(z.any()),
  cursor: z.string().or(z.any()), // "2025-08-05 08:04:30"
  all_records: z.array(recordSchema),
})

const responseSchema = z.array(
  z.object({
    status: z.any(),
    message: z.any(),
    data: dataSchema,
  }),
)

const dummyData: RequestType[] = [
  {
    id: "#55965",
    description: "طلب تنفيذ",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55964",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55963",
    description: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55962",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55961",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55960",
    description: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55959",
    description: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55958",
    description: "طلب إجازة مرضية",
    date: "2024-05-04 - 14:30:00",
  },
  {
    id: "#55957",
    description: "طلب ترقية",
    date: "2024-05-04 - 10:15:00",
  },
  {
    id: "#55956",
    description: "طلب تدريب داخلي",
    date: "2024-05-03 - 09:45:00",
  },
  {
    id: "#55955",
    description: "طلب تنفيذ",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55954",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55953",
    description: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55952",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55951",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55950",
    description: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55949",
    description: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55948",
    description: "طلب إجازة مرضية",
    date: "2024-05-04 - 14:30:00",
  },
  {
    id: "#55947",
    description: "طلب ترقية",
    date: "2024-05-04 - 10:15:00",
  },
  {
    id: "#55946",
    description: "طلب تدريب داخلي",
    date: "2024-05-03 - 09:45:00",
  },
]

// !! ===================== =Dart Code ============================
// Future<Either<String, void>> acceptRequest(RequestModel model) async {
//   final groupIds = authRepo.groupIds;
//   String mAction = '';
//   switch (model.res_model) {
//     case 'hr.holidays':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptLeave(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "holiday_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.deputation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptDeputation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.job.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptJobRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.state == 'hr_master' && groupIds.contains('21')) {
//   //   mAction = 'hr_master_accept';
//   // } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//   //   mAction = 'action_vp_hr_master';
//   // } else if (model.state == 'gm_humain' && groupIds.contains('20')) {
//   //   mAction = 'action_gm_humain';
//   // } else if (model.state == 'sm' && groupIds.contains('95')) {
//   //   mAction = 'action_sm';
//   // } else if (model.state == 'audit' && groupIds.contains('19')) {
//   //   mAction = 'action_audit';
//   // }
//   // return performAcceptance(model, 'hr.deputation', mAction);
//     case 'hr.authorization':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptAuthorization(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'change.bank.account':
//     case 'change.bank.account.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptBankAccount(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.medical.insurance':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptMedicalInsurance(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "medical_insurance_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'salary.identification.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptSalaryIdentification(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "action_type": 'accept',
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'helpdesk.ticket':
//       return const Left(ApiErrors.notFound);
//     case 'hr.distance.work':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptDistanceWork(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'purchase.request':
//       if (model.state == 'authority_owner' && groupIds.contains('21')) {
//         mAction = 'action_contract_procurement';
//       } else if (model.state == 'authority_owner' && groupIds.contains('22')) {
//         mAction = 'action_contract_procurement';
//       } else if (model.state == 'sm' && groupIds.contains('95')) {
//         mAction = 'action_financial_audit';
//       } else if (model.state == 'dm' && groupIds.contains('19')) {
//         mAction = 'action_management_strategy';
//       }
//       return performAcceptance(model, 'purchase.request', mAction);
//     case 'purchase.requisition':
//       if (model.state == 'gm_financial_purchasing_department' && groupIds.contains('222')) {
//         mAction = 'action_vp_hr_master';
//       } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//         mAction = 'action_hr_master';
//       } else if (model.state == 'hr_master' && groupIds.contains('21')) {
//         mAction = 'button_confirm';
//       }
//       return performAcceptance(model, 'purchase.requisition', mAction);
//     case 'purchase.contract':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPurchaseContract(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'contractor.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptContractor(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.relation.supplier.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptRelationSupplierEvaluation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.state == 'financial_purchasing_mgr' && groupIds.contains('222')) {
//   //   mAction = 'action_financial_purchasing_mgr';
//   // } else if (model.state == 'validate' && groupIds.contains('22')) {
//   //   mAction = 'action_validate';
//   // } else if (model.state == 'authority_owner' && groupIds.contains('21')) {
//   //   mAction = 'action_authority_owner';
//   // }
//   // return performAcceptance(model, 'purchase.contract', mAction);
//     case 'work.order':
//       if (model.state == 'gm_financial_purchasing_department' && groupIds.contains('222')) {
//         mAction = 'action_requisition_gm_financial_purchasing_department';
//       } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//         mAction = 'button_requisition_confirm';
//       }
//       return performAcceptance(model, 'purchase.order', mAction);
//     case 'hr.payslip':
//       if (model.state == 'hrm') {
//         mAction = 'action_send_to_vp_hr_master';
//       } else if (model.state == 'vp_hr_master') {
//         mAction = 'action_done';
//       }
//       return performAcceptance(model, 'hr.payslip', mAction);
//     case 'hr.payslip.run':
//       if (model.state == 'hrm') {
//         mAction = 'action_send_to_vp_hr_master';
//       } else if (model.state == 'vp_hr_master') {
//         mAction = 'action_done';
//       }
//       return performAcceptance(model, 'hr.payslip.run', mAction);
//     case 'hr.training.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptTrainingRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.state == 'hr_master' && groupIds.contains('21')) {
//   //   mAction = 'hr_master_accept';
//   // } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//   //   mAction = 'action_vp_hr_master';
//   // } else if (model.state == 'gm_humain' && groupIds.contains('20')) {
//   //   mAction = 'action_gm_humain';
//   // } else if (model.state == 'sm' && groupIds.contains('95')) {
//   //   mAction = 'action_sm';
//   // } else if (model.state == 'dm' && groupIds.contains('19')) {
//   //   mAction = 'action_dm';
//   // }
//   // return performAcceptance(model, 'hr.training.request', mAction);
//     case 'payment.order':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPaymentOrder(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.state == 'gm_financial_purchasing_department' && groupIds.contains('222')) {
//   //   mAction = 'action_his_authority';
//   // } else if (model.state == 'hr_master' && groupIds.contains('21')) {
//   //   mAction = 'action_done';
//   // } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//   //   mAction = 'action_hr_master';
//   // }
//   // return performAcceptance(model, 'payment.order', mAction);
//     case 'purchase.order':
//       if (groupIds.contains('21')) {
//         mAction = 'button_confirm';
//       } else if (groupIds.contains('22')) {
//         mAction = 'action_hr_master';
//       } else if (groupIds.contains('222')) {
//         mAction = 'action_vp_hr_master';
//       }
//       return performAcceptance(model, 'purchase.order', mAction);
//     case 'purchase.add.budget':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptAddBudget(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.requestsTypeModel is PurchaseAddBudgetModel &&
//   //     (int.tryParse((model.requestsTypeModel as PurchaseAddBudgetModel).award_budget) ?? 0) > 500000 &&
//   //     groupIds.contains('21')) {
//   //   mAction = 'action_done';
//   // } else if ((int.tryParse((model.requestsTypeModel as PurchaseAddBudgetModel).award_budget) ?? 0) <= 500000 && groupIds.contains('22')) {
//   //   mAction = 'action_done';
//   // }
//   // return performAcceptance(model, 'purchase.add.budget', mAction);
//   // return const Left(ApiErrors.notFound);
//     case 'certificate.achievement':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptCertificate(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (groupIds.contains('95')) {
//   //   mAction = 'action_done';
//   // }
//   // return performAcceptance(model, 'certificate.achievement', mAction);
//     case 'hr.training.public':
//       if (groupIds.contains('95')) {
//         mAction = 'action_done';
//       }
//       return performAcceptance(model, 'hr.training.public', mAction);
//     case 'hr.resignation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptResignation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//   // if (model.state == 'disclaimer' && groupIds.contains('20')) {
//   //   mAction = 'action_disclaimer';
//   // } else if (model.state == 'hrm' && groupIds.contains('95')) {
//   //   mAction = 'action_hrm';
//   // } else if (model.state == 'sm' && groupIds.contains('19')) {
//   //   mAction = 'action_sm';
//   // }
//   // return performAcceptance(model, 'hr.resignation', mAction);
//     case 'manage.financial.custody':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptCustody(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'manage.financial.custody.close':
//       if (model.state == 'dm' && groupIds.contains('19')) {
//         mAction = 'action_dm';
//       } else if (model.state == 'vp_hr_master' && groupIds.contains('22')) {
//         mAction = 'action_vp_hr_master';
//       }
//       return performAcceptance(model, 'manage.financial.custody.close', mAction);
//     case 'hr.employee.members':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptFamily(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.passport.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPassport(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.probation.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptProbation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.performance.planning':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPerformancePlanning(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.performance.flow':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPerformanceFlow(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.overtime.assignment':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptOvertimeAssignment(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.performance.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptPerformanceEvaluation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'hr.overtime.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.acceptOvertimeRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'helpdesk.service':
//       return const Left(ApiErrors.notFound);
//   }
//   return const Left(ApiErrors.unknown);
// }

// Future<Either<String, void>> rejectRequest(RequestModel model, String reason) async {
//   String mAction = '';
//   switch (model.res_model) {
//     case 'hr.holidays':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectLeave(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "holiday_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.deputation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectDeputation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'hr.job.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectJobRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//           "reject_reason": reason,
//         },
//       );
//   // mAction = 'button_refuse';
//   // return performRejection(model, 'hr.deputation', mAction, reason);
//     case 'hr.authorization':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectAuthorization(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'change.bank.account':
//     case 'change.bank.account.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectBankAccount(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.medical.insurance':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectMedicalInsurance(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "medical_insurance_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'salary.identification.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectSalaryIdentification(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "action_type": 'reject',
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//           "reject_reason": Uri.encodeComponent(model.id),
//         },
//       );
//     case 'helpdesk.ticket':
//       return const Left(ApiErrors.notFound);
//     case 'hr.distance.work':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectDistanceWork(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'purchase.request':
//       mAction = 'action_refuse';
//       return performRejection(model, 'purchase.request', mAction, reason);
//     case 'purchase.requisition':
//       mAction = 'action_refuse';
//       return performRejection(model, 'purchase.requisition', mAction, reason);
//     case 'purchase.contract':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPurchaseContract(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'contractor.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectContractor(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.relation.supplier.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectRelationSupplierEvaluation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//   // mAction = 'action_refuse';
//   // return performRejection(model, 'purchase.contract', mAction, reason);
//     case 'work.order':
//       mAction = 'action_refuse';
//       return performRejection(model, 'purchase.order', mAction, reason);
//     case 'hr.payslip':
//       mAction = 'button_cancel';
//       return performRejection(model, 'hr.payslip', mAction, reason);
//     case 'hr.payslip.run':
//       mAction = 'button_cancel';
//       return performRejection(model, 'hr.payslip.run', mAction, reason);
//     case 'hr.training.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectTrainingRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": Uri.encodeComponent(model.id),
//         },
//       );
//   // mAction = 'button_refuse';
//   // return performRejection(model, 'hr.training.request', mAction, reason);
//     case 'payment.order':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPaymentOrder(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//   // mAction = 'action_refuse';
//   // return performRejection(model, 'payment.order', mAction, reason);
//     case 'purchase.order':
//       mAction = 'action_refuse';
//       return performRejection(model, 'purchase.order', mAction, reason);
//     case 'purchase.add.budget':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectAddBudget(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//   // mAction = 'action_refuse';
//   // return performRejection(model, 'purchase.add.budget', mAction, reason);
//     case 'certificate.achievement':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectCertificate(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//   // mAction = 'action_refuse';
//   // return performRejection(model, 'certificate.achievement', mAction, reason);
//     case 'hr.training.public':
//       mAction = 'button_refuse';
//       return performRejection(model, 'hr.training.public', mAction, reason);
//     case 'hr.resignation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectResignation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//   // mAction = 'button_refuse';
//   // return performRejection(model, 'hr.resignation', mAction, reason);
//     case 'manage.financial.custody':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectCustody(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.employee.members':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectFamily(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'manage.financial.custody.close':
//       mAction = 'action_refuse';
//       return performRejection(model, 'manage.financial.custody.close', mAction, reason);
//     case 'hr.passport.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPassport(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.probation.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectProbation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "refuse_reason": reason,
//         },
//       );
//     case 'hr.performance.planning':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPerformancePlanning(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'hr.performance.flow':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPerformanceFlow(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'hr.overtime.assignment':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectOvertimeAssignment(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'hr.performance.evaluation':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectPerformanceEvaluation(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'hr.overtime.request':
//       return apiService.request(
//         url: AcceptRejectRequestsEndpoints.rejectOvertimeRequest(),
//         method: ApiMethod.post,
//         expectedResponse: ApiExpectedResponse.any,
//         data: {
//           "id": Uri.encodeComponent(model.id),
//           "request_id": Uri.encodeComponent(model.id),
//           "reject_reason": reason,
//         },
//       );
//     case 'helpdesk.service':
//       return const Left(ApiErrors.notFound);
//   }
//   return const Left(ApiErrors.unknown);
// }
