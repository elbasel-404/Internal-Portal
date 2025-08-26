"use client"

import {
  AttachmentsField,
  CheckboxField,
  DateField,
  FormHeader,
  RadioField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { useState } from "react"

const ResignationReasons = [
  { id: 1, name: "فرصة وظيفية أفضل" },
  { id: 2, name: "إكمال الدراسة" },
  { id: 3, name: "الإنتقال إلى مدينة أخرى" },
  { id: 4, name: "أسباب عائلية" },
  { id: 5, name: "ضغط العمل" },
  { id: 6, name: "خلاف مع الإدارة" },
]

export const ResignationForm = () => {
  const [files, setFiles] = useState<File[]>([])
  const [otherReasons, setOtherReasons] = useState(false)
  const [lastWorkingDate, setLastWorkingDate] = useState<Date>(new Date())
  const [requestType, setRequestType] = useState("option1")

  const handleRequestTypeChangeValue = (value: string) => {
    setRequestType(value)
  }

  return (
    <form className="bg-white rounded-lg text-black text-lg p-4 space-y-4">
      <FormHeader label="نموذج طلب انهاء خدمة" path={paths.resignation.href} />
      <div className=" space-y-6">
        <RadioField
          label="نوع الطلب"
          name="requestType"
          options={[
            { value: "option1", label: "استقالة" },
            { value: "option2", label: "عدم تجديد عقد" },
            { value: "option3", label: "تقاعد" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle="flex-col md:flex-row"
          className="flex-col"
          selectedValue={requestType}
          onChange={handleRequestTypeChangeValue}
        />
        <div
          className={`grid grid-cols-1 ${
            !otherReasons ? "md:grid-cols-2" : ""
          }  gap-4`}
        >
          <DateField
            date={lastWorkingDate}
            onChange={(value) => setLastWorkingDate(value || new Date())}
            name="lastWorkingDate"
            label="تاريخ اخر يوم عمل"
            required
          />
          {!otherReasons && (
            <SelectField
              label="أسباب إنهاء الخدمة"
              name="resignationReasons"
              types={ResignationReasons}
            />
          )}
        </div>

        <CheckboxField
          name="other-reasons"
          label="أسباب أخرى"
          required={false}
          checked={otherReasons}
          onChange={(value) => setOtherReasons(value)}
          className="flex justify-between md:justify-start items-center md:gap-x-4 mt-2"
          labelStyle="order-2 text-foreground font-medium"
          checkboxStyle="order-1"
        />

        {otherReasons && (
          <TextareaField
            label="أسباب إنهاء الخدمة"
            name="resignation-reasons"
            required
          />
        )}

        <AttachmentsField
          label="إيميل إنهاء الخدمة"
          files={files}
          onFilesChange={(fileList) => setFiles(fileList)}
          setFiles={setFiles}
          required
        />

        <SubmitButton />
      </div>
    </form>
  )
}
