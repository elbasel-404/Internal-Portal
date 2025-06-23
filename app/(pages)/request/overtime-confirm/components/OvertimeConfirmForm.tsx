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
import { State } from "../../../../lib/createData"
import { ChangeEvent, useEffect, useState, useTransition } from "react"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}
interface OvertimeConfirmFormProps {
  assignmentNumbers: { id: number; name: string }[]
}

export const OvertimeConfirmForm = ({
  assignmentNumbers,
}: OvertimeConfirmFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [form, setForm] = useState({
    overtime_assignment_id: "",
    nb_extras_time: "",
  })
  useEffect(() => {
    if (state.success) {
      toast.success("تم انشاء الطلب بنجاح")
    }
    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((message) => toast.error(message))
    }
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "overtime-confirm-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("overtime-confirm-form-pending")
    })
  }

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
        label="نموذج طلب تأكيد تكليف لعمل اضافي"
        path={paths.overtimeConfirm.href}
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="رقم طلب التكليف"
            name="overtime_assignment_id"
            placeholder=""
            types={assignmentNumbers}
            value={form.overtime_assignment_id}
            onChange={(value: string) =>
              setForm({ ...form, overtime_assignment_id: value })
            }
          />
          <InputField
            label="مدة الوقت الإضافي"
            name="nb_extras_time"
            placeholder=""
            required
            value={form.nb_extras_time}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, nb_extras_time: e.target.value })
            }
          />
        </div>
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
