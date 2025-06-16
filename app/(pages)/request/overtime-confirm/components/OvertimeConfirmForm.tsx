"use client"

import {
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { getStateAction } from "./helpers/getStateAction"
import { initialState } from "./helpers/initialState"
import { State } from "./helpers/State"
import { useEffect, useActionState, useState } from "react"

const assignmentNumbers = [
  { id: 1, name: "5256" },
  { id: 2, name: "5445" },
  { id: 3, name: "7865" },
  { id: 4, name: "9452" },
  { id: 5, name: "2125" },
]
const stateAction = getStateAction<State>(formAction)
interface OvertimeConfirmFormProps {
  employeeId: string | undefined
}

export const OvertimeConfirmForm = ({
  employeeId,
}: OvertimeConfirmFormProps) => {
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [form, setForm] = useState({
    overtime_assignment_id: "",
    nb_extras_time: "",
  })
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
      <FormHeader
        label="نموذج طلب تكليف لعمل اضافي"
        path={paths.overtimeConfirm.href}
      />
      <div className="p-4 space-y-6">
        <input
          type="text"
          name="employee_id"
          id="employee_id"
          hidden
          aria-hidden
          readOnly
          value={employeeId}
          className="hidden"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="رقم طلب التكليف"
            name="overtime_assignment_id"
            placeholder=""
            types={assignmentNumbers}
            value={form.overtime_assignment_id}
            onChange={(value) =>
              setForm({ ...form, overtime_assignment_id: value })
            }
          />
          <InputField
            label="مدة الوقت الإضافي"
            name="nb_extras_time"
            placeholder=""
            required
            value={form.nb_extras_time}
            onChange={(e) =>
              setForm({ ...form, nb_extras_time: e.target.value })
            }
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}
