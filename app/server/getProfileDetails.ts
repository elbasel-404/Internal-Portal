"use server";

import type { ProfileDetails } from "@types";

export const getProfileDetails = async (): Promise<ProfileDetails> => {
  const profileDetails: ProfileDetails = {
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
  };
  return { ...profileDetails };
};
