"use client"

import {
  CheckboxField,
  DateField,
  FormHeader,
  InputField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

export const RemoteWorkForm = () => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())
  const [duration, setDuration] = useState("1")
  const [description, setDescription] = useState("")

  const handleDateFromChange = (value: Date | undefined) => {
    setDateFrom(value || new Date())
  }

  const handleDatToChange = (value: Date | undefined) => {
    setDateTo(value || new Date())
  }

  useEffect(() => {
    if (dateFrom && dateTo) {
      const start = new Date(dateFrom)
      const end = new Date(dateTo)

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      setDuration(diffDays > 0 ? `${diffDays.toString()} يوم` : "1 يوم")
    }
  }, [dateFrom, dateTo])

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors?.[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "remote-work-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("remote-work-form-pending")
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
    <form
      action={action}
      className="bg-white rounded-lg text-black text-lg p-4 space-y-4"
    >
      <FormHeader label="نموذج طلب العمل عن بعد" path={paths.remoteWork.href} />
      {/* <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value="1711"
        className="hidden"
      /> */}
      <div className="py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateField
            name="date_from"
            label="تاريخ البداية"
            date={dateFrom}
            onChange={
              handleDateFromChange as (date: Date | null | undefined) => void
            }
            required
          />
          <DateField
            name="date_to"
            label="تاريخ الانتهاء"
            date={dateTo}
            onChange={
              handleDatToChange as (date: Date | null | undefined) => void
            }
            required
          />
          <InputField
            label="المدة"
            name="duration"
            disabled
            value={duration}
            placeholder=""
          />
        </div>
        <TextareaField
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="المهام التي سيتم العمل عليها"
          placeholder="المهام التي سيتم العمل عليها..."
          required
        />
        <div className="space-y-2 bg-cloudGray rounded-md p-4">
          <ol className="list-decimal list-inside pl-6 text-foreground">
            <li>
              يعد يوم العمل عن بعد يوم عمل رسمي بحيث يلتزم الموظف بساعات العمل
              الرسمية. ويلتزم الموظف بتقديم التقارير والإثباتات اللازمة عما تم
              إنجازه خلال العمل عن بعد متى ما طلب منه ذلك.
            </li>
            <li>
              على الموظف أن يكون متاحا للتواصل من خلال الهاتف النقال المعتمد لدى
              منشئات والبريد الإلكتروني الرسمي خلال ساعات العمل الرسمية.
            </li>
            <li>
              يعد كل رئيس مباشر مسؤول عن التزام مرؤوسيه بساعات العمل والإنجاز،
              والتنسيق مع الإدارة العامة للموارد البشرية في حال عدم التزام أي من
              مرؤوسيه بالسياسة.
            </li>
          </ol>
          <CheckboxField
            name="approved"
            label="تم الاطلاع والموافقة"
            className="gap-x-4"
            labelStyle="text-lg text-black"
            checkboxStyle="-order-1 border-black"
            required
          />
        </div>
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
