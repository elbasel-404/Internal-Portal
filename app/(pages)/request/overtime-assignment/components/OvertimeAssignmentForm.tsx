"use client"

import {
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"
import { useEffect, useState, useTransition } from "react"

import { paths } from "@lib"
import { defaultMonths } from "../../config"
import { defaultDays, defaultYears } from "./config"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

export const OvertimeAssignmentForm = () => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [form, setForm] = useState({
    year: "",
    month: "",
    day_from: "",
    day_to: "",
    nb_hours: "",
    description: "",
  })

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors?.[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", {
      id: "overtime-assignment-form-pending",
    })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("overtime-assignment-form-pending")
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
        label="نموذج طلب تكليف لعمل اضافي"
        path={paths.overtimeAssignment.href}
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField
            label="السنة"
            name="year"
            placeholder=""
            types={defaultYears}
            value={form.year}
            onChange={(value) => setForm({ ...form, year: value })}
          />
          <SelectField
            label="الشهر"
            name="month"
            placeholder=""
            types={defaultMonths}
            value={form.month}
            onChange={(value) => setForm({ ...form, month: value })}
          />
          <SelectField
            label="من يوم"
            name="day_from"
            placeholder=""
            types={defaultDays}
            value={form.day_from}
            onChange={(value) => setForm({ ...form, day_from: value })}
          />
          <SelectField
            label="الى يوم"
            name="day_to"
            placeholder=""
            types={defaultDays}
            value={form.day_to}
            onChange={(value) => setForm({ ...form, day_to: value })}
          />
          <InputField
            label="عدد الساعات"
            name="nb_hours"
            placeholder=""
            value={form.nb_hours}
            onChange={(e) => setForm({ ...form, nb_hours: e.target.value })}
          />
        </div>
        <TextareaField
          label="بيان الاعمال"
          name="description"
          placeholder=""
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
