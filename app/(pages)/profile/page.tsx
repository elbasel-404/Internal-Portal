import { Instructions } from "@components"
import { getProfileDetails } from "@server"
import { RequestLabel } from "@types"
import Image from "next/image"
import { ReactNode } from "react"
import { ProfileTabs } from "./components/ProfileTabsSection"

const ProfilePage = async () => {
  const { personalData, workData, contactInformation } =
    await getProfileDetails()

  const personalDataDetails: { label: RequestLabel; value: ReactNode }[] = [
    {
      label: "رقم الهوية",
      value: personalData.id,
    },
    {
      label: "الإسم بالإنجليزية",
      value: personalData.nameEN,
    },
    {
      label: "الجنسية",
      value: personalData.nationality,
    },
    {
      label: "الحالة الاجتماعية",
      value: personalData.maritalStatus,
    },
    {
      label: "الجنس",
      value: personalData.gender,
    },
    {
      label: "رقم الجواز",
      value: personalData.passportNumber,
    },
    {
      label: "فصيلة الدم",
      value: personalData.bloodType,
    },
    {
      label: "تاريخ الميلاد",
      value: personalData.birthDate,
    },
  ]
  const workDataDetails: { label: RequestLabel; value: ReactNode }[] = [
    {
      label: "القسم",
      value: workData.department,
    },
    {
      label: "المدير المباشر",
      value: workData.directManager,
    },
    {
      label: "تاريخ التعيين بالجهة",
      value: workData.appointmentDate,
    },
    {
      label: "تاريخ بداية العمل الحكومي",
      value: workData.governmentWorkStartDate,
    },
  ]

  const contactInformationDetails: { label: RequestLabel; value: ReactNode }[] =
    [
      {
        label: "الهاتف الجوال",
        value: contactInformation.mobilePhone,
      },
      {
        label: "الجوال الثاني",
        value: contactInformation.secondMobile,
      },
      {
        label: "البريد الإلكتروني للعمل",
        value: contactInformation.workEmail,
      },
      {
        label: "البريد الإلكتروني الشخصي",
        value: contactInformation.personalEmail,
      },
      {
        label: "مكان العمل",
        value: contactInformation.workplaceLocation,
      },
      {
        label: "تحويلة العمل",
        value: contactInformation.workExtension,
      },
    ]

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl flex gap-4 flex-col md:flex-row">
        <div className="md:w-0-1/4 bg-primary-opacity rounded-xl p-4 h-fit">
          <Image
            src={personalData.image}
            alt="profile"
            width={100}
            height={100}
            className="w-full h-fit md:h-[340px] object-cover rounded-md"
          />
          <div className="flex flex-col mt-2">
            <h2 className="font-medium text-foreground text-2xl">
              {personalData.name}
            </h2>
            <p className="font-medium text-grey-600">{workData.job}</p>
          </div>
        </div>
        <div className="md:w-3/4 ">
          <ProfileTabs
            personalDataDetails={personalDataDetails}
            workDataDetails={workDataDetails}
            contactInformationDetails={contactInformationDetails}
          />
        </div>
      </div>
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيه هذة الخدمة للموظفين امكانية البحث عن الموظفين بالايميل او البحث بالاسم الأول او الاسم الاخير او الاسم الانجليزي او رقم الجوالي او رقم التحويلة او الادرة او القطاع"
      />
    </section>
  )
}

export default ProfilePage
