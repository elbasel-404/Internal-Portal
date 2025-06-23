"use server"

import type { ProfileDetails } from "@types"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { ProfileElementSchema } from "@api/schemas"
import { getData } from "./getData"

export const getProfileDetails = async (): Promise<ProfileDetails> => {
  const result = await getData<ProfileDetails>({
    url: "api/po/read/profile",
    responseSchema: ResponseSchema,
    dataSchema: ProfileElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      // * ======== contact information ========
      const mobilePhone =
        typeof typedData.mobile_number === "boolean"
          ? ""
          : String(typedData.mobile_number || "")
      const personalEmail = String(typedData.work_email || "")
      const secondMobile =
        typeof typedData.mobile_phone2 === "boolean"
          ? "none"
          : String(typedData.mobile_phone2 || "")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workPhone =
        typeof typedData.work_phone === "boolean"
          ? "none"
          : String(typedData.work_phone || "")
      const workExt =
        typeof typedData.work_mobile === "boolean"
          ? "none"
          : String(typedData.work_mobile || "")

      // * ======== date information ========
      const date = typedData.joining_date ? String(typedData.joining_date) : ""

      const nameEN = String(typedData.name_english || "")

      return [
        {
          personalData: {
            id: String(typedData.id || ""),
            nameEN,
            nationality: String(typedData.nationality || ""),
            maritalStatus: String(typedData.marital_status || ""),
            gender: String(typedData.gender || ""),
            passportNumber: String(typedData.passport_number || ""),
            bloodType: String(typedData.blood_type || ""),
            birthDate: String(typedData.birthday || ""),
          },
          workData: {
            department:
              typeof typedData.department_id === "object" &&
              Array.isArray(typedData.department_id) &&
              typedData.department_id.length > 1
                ? String(typedData.department_id[1])
                : "",
            directManager:
              typeof typedData.parent_id === "object" &&
              Array.isArray(typedData.parent_id) &&
              typedData.parent_id.length > 1
                ? String(typedData.parent_id[1])
                : "",
            appointmentDate: date,
            governmentWorkStartDate: String(
              typedData.government_work_date || "",
            ),
          },
          contactInformation: {
            mobilePhone,
            secondMobile,
            workEmail: String(typedData.work_email || ""),
            personalEmail,
            workplaceLocation: String(typedData.workplace_location || ""),
            workExtension: workExt,
          },
        },
      ]
    },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: ProfileDetails = {
  personalData: {
    id: "1",
    nameEN: "Youssef Hamad Abdullah Alqushaymit",
    nationality: "Saudi",
    maritalStatus: "Single",
    gender: "Male",
    passportNumber: "A123456",
    bloodType: "O+",
    birthDate: "1990-01-01",
  },
  workData: {
    department: "المركز السعودي للتعليم الإلكتروني",
    directManager: "يوسف بن حسين الجفري",
    appointmentDate: "15-05-2023",
    governmentWorkStartDate: "15-05-2022",
  },
  contactInformation: {
    mobilePhone: "966511122334",
    secondMobile: "966511122333",
    workEmail: "youssef@work.sa",
    personalEmail: "youssef@algoriza.sa",
    workplaceLocation: "Riyadh",
    workExtension: "1307",
  },
}
