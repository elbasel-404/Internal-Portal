"use server"

import type { ProfileDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"
import { getDemo } from "@db/actions"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { ProfileElementSchema } from "@api/schemas"

export const getProfileDetails = async (): Promise<ProfileDetails> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/read/profile"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = {}
  const requestBodyString = JSON.stringify(requestBody)
  const requestUrl = `${apiRootUrl}/${url}`

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  })
  const responseJson = await apiResponse.json()

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = ProfileElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  // * ======== contact information ========
  const mobilePhone =
    typeof validatedData.mobile_number === "boolean"
      ? ""
      : validatedData.mobile_number
  const personalEmail = validatedData.work_email
  const secondMobile =
    typeof validatedData.mobile_phone2 === "boolean"
      ? "none"
      : validatedData.mobile_phone2

  //* placeholder
  const workExtension = "work Extension"
  const workplaceLocation =
    typeof validatedData.work_location === "boolean"
      ? ""
      : validatedData.work_location
  const workEmail = validatedData.work_email2

  // * ======== personal data ========
  const birthDate = validatedData.birthday
  const bloodType = validatedData.blood_type
  const gender = validatedData.gender
  const id = validatedData.id.toFixed()
  const maritalStatus = validatedData.marital
  const nameEN = validatedData.english_name
  const nationality =
    typeof validatedData.birthday_location === "boolean"
      ? ""
      : validatedData.birthday_location
  const passportNumber = validatedData.passport_number

  // * ======== work data ========
  const appointmentDate =
    typeof validatedData.contract_date_from === "boolean"
      ? ""
      : validatedData.contract_date_from
  const department = validatedData.department_global_id[0].toString()
  const directManager =
    typeof validatedData.manager === "boolean" ? "" : validatedData.manager
  const governmentWorkStartDate = validatedData.begin_work_date

  const returnedData: ProfileDetails = {
    contactInformation: {
      mobilePhone,
      personalEmail,
      secondMobile,
      workEmail,
      workExtension,
      workplaceLocation,
    },
    personalData: {
      birthDate,
      bloodType,
      gender,
      id,
      maritalStatus,
      nameEN,
      nationality,
      passportNumber,
    },
    workData: {
      appointmentDate,
      department,
      directManager,
      governmentWorkStartDate,
    },
  }

  return returnedData
}

const dummyData: ProfileDetails = {
  personalData: {
    id: "1100549805",
    nameEN: "Assaf Rushud Alsaedi",
    nationality: "المملكة العربية السعودية",
    maritalStatus: "متزوج",
    gender: "ذكر",
    passportNumber: "w491150",
    bloodType: "A+",
    birthDate: "1992-07-14",
  },
  workData: {
    department:
      "خدمات المنشآت / التقنية والحلول الرقمية / تقنية المعلومات / الأنظمة الداخلية",
    directManager: "معاذ بن محمد الغرباوي",
    appointmentDate: "2023-02-12",
    governmentWorkStartDate: "2023-02-12",
  },
  contactInformation: {
    mobilePhone: "0535249447",
    secondMobile: "",
    workEmail: "mohamedshafey53@gmail.com",
    personalEmail: "iassaf.cs@gmail.com",
    workplaceLocation: "",
    workExtension: "4268",
  },
}
