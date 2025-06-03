"use client"

import {
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"

const assignmentNumbers = [
  { id: 1, name: "5256" },
  { id: 2, name: "5445" },
  { id: 3, name: "7865" },
  { id: 4, name: "9452" },
  { id: 5, name: "2125" },
]

export const OvertimeConfirmForm = () => {
  return (
    <form className="bg-white rounded-md">
      <FormHeader
        label="نموذج طلب تكليف لعمل اضافي"
        path={paths.overtimeConfirm.href}
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="رقم طلب التكليف"
            name="assignmentNumber"
            placeholder=""
            types={assignmentNumbers}
          />
          <InputField
            label="مدة الوقت الإضافي"
            name="overtimeDuration"
            placeholder=""
            required
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}
