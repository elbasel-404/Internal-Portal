"use client"

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { getStateAction } from "./helpers/getStateAction"
import { initialState } from "./helpers/initialState"
import { State } from "./helpers/State"

const stateAction = getStateAction<State>(formAction)

export const PassportForm = () => {
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [files, setFiles] = useState<File[]>([])
  const [passportExpirationDate, setPassportExpirationDate] = useState<Date>(
    new Date(),
  )
  const [passportNumber, setPassportNumber] = useState("")

  const handlePassportNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassportNumber(event.target.value)
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors)
  }, [state])

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", {
        id: "vacation-form-loading-toast",
      })
    } else {
      toast.dismiss("vacation-form-loading-toast")
    }
  }, [pending])

  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }
  return (
    <form action={action} className="bg-white rounded-md">
      <FormHeader label="نموذج طلب بيانات الجواز" path={paths.passports.href} />
      <div className="p-4 space-y-6">
        {/* <input
          type="text"
          name="employee_id"
          id="employee_id"
          hidden
          aria-hidden
          readOnly
          value="1722"
          className="hidden"
        /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="new_passport"
            label="رقم جواز السفر"
            placeholder=""
            value={passportNumber}
            required
            onChange={handlePassportNumberChange}
          />
          <DateField
            date={passportExpirationDate}
            onChange={(value) => setPassportExpirationDate(value || new Date())}
            label="تاريخ انتهاء جواز السفر"
            name="passport_end_date"
            required
          />
        </div>

        <AttachmentsField
          name="attachment_ids"
          label="صورة جواز السفر"
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
