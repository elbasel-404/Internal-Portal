"use server"

import type { ContractorDetails } from "@types"
import { getData } from "./getData"
import { ResponseSchema, ContractorListElementSchema } from "../../api-schemas"

export const getContractorDetails = async (
  id: string,
): Promise<ContractorDetails | void> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const result = await getData<ContractorDetails>({
    url: "api/po/contractor-request",
    responseSchema: ResponseSchema,
    dataSchema: ContractorListElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>
      return [
        {
          id: getStringValue(typedData.name),
          applicantName: getArrayValue(typedData.purchase_request_id),
          sector: getArrayValue(typedData.sector_id),
          department: getArrayValue(typedData.department_id),
          jobTitle: getArrayValue(typedData.job_id),
          directManager: getArrayValue(typedData.direct_manager_id),
          departmentManager: getArrayValue(typedData.department_manager_id),
          generalManager: getArrayValue(typedData.global_department_manager_id),
          sectorManager: getArrayValue(typedData.sector_manager_id),
          projectName: getStringValue(typedData.project_name),
          contractorCompany: getStringValue(typedData.contractor_company),
          contractStartDate: getStringValue(typedData.contract_date_start),
          contractEndDate: getStringValue(typedData.contract_date_end),
          contractorName: getStringValue(typedData.contractor_name),
          idNumber: getStringValue(typedData.id_number),
          nationality: getStringValue(typedData.nationality),
          jobTitleContractor: getStringValue(typedData.job_title),
          employeeNumber: getStringValue(typedData.employee_number),
          email: getStringValue(typedData.email),
          mobile: getStringValue(typedData.mobile),
          state: getArrayValue(typedData.stage_id),
          attachmentList: [
            getArrayValue(typedData.identity_attachment_ids, 0),
            getArrayValue(typedData.acceptable_use_attachment_ids, 0),
            getArrayValue(typedData.nondisclosure_attachment_ids, 0),
          ],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: ContractorDetails = {
  id: "",
  applicantName: "",
  sector: "",
  department: "",
  jobTitle: "",
  directManager: "",
  departmentManager: "",
  generalManager: "",
  sectorManager: "",
  projectName: "",
  contractorCompany: "",
  contractStartDate: "",
  contractEndDate: "",
  contractorName: "",
  idNumber: "",
  nationality: "",
  jobTitleContractor: "",
  employeeNumber: "",
  email: "",
  mobile: "",
  state: "",
  attachmentList: ["1", "2"],
}
