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
        typeof typedData.mobile_phone === "boolean"
          ? ""
          : String(typedData.mobile_phone || "")
      const secondMobile =
        typeof typedData.mobile_phone2 === "boolean"
          ? ""
          : String(typedData.mobile_phone2 || "")
      const workPhone =
        typeof typedData.work_phone === "boolean"
          ? "none"
          : String(typedData.work_phone || "")
      // const workExt =
      //   typeof typedData.work_mobile === "boolean"
      //     ? "none"
      //     : String(typedData.work_mobile || "")

      // * ======== date information ========
      const date = typedData.recruiter_date
        ? String(typedData.recruiter_date)
        : ""

      const nameEN = String(typedData.english_name || "")
      // Handle image safely
      const imageBase64 =
        typeof typedData.image === "string" ? typedData.image : ""

      return [
        {
          personalData: {
            id: String(typedData.identification_id || ""),
            nameEN,
            name: String(typedData.complete_name || ""),
            image: `data:image/gif;base64,${imageBase64}`,
            nationality:
              typeof typedData.country_id === "object" &&
              Array.isArray(typedData.country_id) &&
              typedData.country_id.length > 1
                ? String(typedData.country_id[1])
                : "",
            maritalStatus:
              String(typedData.marital) === "single"
                ? "اعزب"
                : String(typedData.marital) === "married"
                  ? "متزوج"
                  : "",
            gender:
              String(typedData.gender) === "male"
                ? "ذكر"
                : String(typedData.gender) === "female"
                  ? "أنثى"
                  : "",
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
            job:
              typeof typedData.job_id === "object" &&
              Array.isArray(typedData.job_id) &&
              typedData.job_id.length > 1
                ? String(typedData.job_id[1])
                : "",
            directManager:
              typeof typedData.parent_id === "object" &&
              Array.isArray(typedData.parent_id) &&
              typedData.parent_id.length > 1
                ? String(typedData.parent_id[1])
                : "",
            appointmentDate: date,
            governmentWorkStartDate: String(typedData.begin_work_date || ""),
          },
          contactInformation: {
            mobilePhone,
            secondMobile,
            workEmail: String(typedData.work_email || ""),
            personalEmail: String(typedData.work_email2 || ""),
            workplaceLocation: String(typedData.work_location || ""),
            workExtension: workPhone,
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
    name: "عساف بن رشود الصاعدي",
    image: "/profile-img.jpg",
    nationality: "Saudi",
    maritalStatus: "Single",
    gender: "Male",
    passportNumber: "A123456",
    bloodType: "O+",
    birthDate: "1990-01-01",
  },
  workData: {
    department: "المركز السعودي للتعليم الإلكتروني",
    job: "مدير الأنظمة الداخلية (مكلف)",
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
