"use client"

import {
  AttachmentsField,
  CheckboxField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { Dispatch, SetStateAction, useState } from "react"

const covenantNumberList = [
  { id: 1, name: "125" },
  { id: 2, name: "820" },
  { id: 3, name: "774" },
  { id: 4, name: "455" },
  { id: 5, name: "155" },
]

export const ContractorForm = () => {
  const [idFiles, setIdFiles] = useState<File[]>([])
  const [aupFiles, setAupFiles] = useState<File[]>([])
  const [ndaFiles, setNdaFiles] = useState<File[]>([])

  const handleFileUpload = (
    setter: Dispatch<SetStateAction<File[]>>,
    files: File[],
  ) => {
    setter((prev) => [...prev, ...files])
  }

  const handleRemoveFile = (
    setter: Dispatch<SetStateAction<File[]>>,
    index: number,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form className="bg-white rounded-md">
      <FormHeader label="بيانات طلب المتعاقد" path={paths.contractor.href} />
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SelectField
            name="sh"
            label="طلب الشراء (المشروع)"
            placeholder="__"
            types={covenantNumberList}
            required
          />
          <InputField
            name="projectName"
            label="اسم المشروع"
            placeholder=""
            disabled
            required
          />
          <InputField
            name="companyName"
            label="الشركة المشغلة"
            placeholder=""
            disabled
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            name="startDate"
            label="تاريخ بداية العقد"
            placeholder=""
            disabled
            required
          />
          <InputField
            name="endDate"
            label="تاريخ نهاية العقد"
            placeholder=""
            disabled
            required
          />
          <InputField name="fullName" label="الأسم" placeholder="" required />
          <InputField
            name="idNumber"
            label="رقم الهوية/الأقامة"
            placeholder=""
            required
          />
          <InputField
            name="nationality"
            label="الجنسية"
            placeholder=""
            required
          />
          <InputField
            name="jobTitle"
            label="المسمي الوظيفي فى الشركة"
            placeholder=""
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          <InputField
            name="jobIdNumber"
            label="الرقم الوظيفي فى الشركة"
            placeholder=""
            required
          />
          <InputField
            name="email"
            label="البريد الالكتروني"
            placeholder=""
            required
          />
          <InputField
            name="phoneNumber"
            label="رقم الجوال"
            placeholder=""
            required
          />
        </div>
        <div className="space-y-2">
          <AttachmentsField
            label="الهوية/الأقامة/الجواز"
            name="id"
            required
            files={idFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setIdFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setIdFiles, index)}
          />
          <AttachmentsField
            label="نموذج الأستخدام المقبول"
            name="aup"
            required
            files={aupFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setAupFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setAupFiles, index)}
          />
          <AttachmentsField
            label="نموذج سياسة عدم الأفصاح"
            required
            files={ndaFiles}
            handleFileUpload={(fileList) =>
              fileList && handleFileUpload(setNdaFiles, Array.from(fileList))
            }
            handleRemoveFile={(index) => handleRemoveFile(setNdaFiles, index)}
          />
        </div>
        <CheckboxField
          name="approved"
          label="اقر بأن المعلومات صحيحة"
          className="flex items-center gap-x-3"
          labelStyle="text-lg text-black"
          checkboxStyle="-order-1 border-black"
        />
        <SubmitButton />
      </div>
    </form>
  )
}
