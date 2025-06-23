"use client"

import { DestinationElement, HrLetterType } from "@api/schemas/index"
import {
  FormHeader,
  SelectField,
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

interface HrLetterFormProps {
  destinationElement: DestinationElement[]
  hrLetterTypes: HrLetterType[]
}

export const HrLetterForm = ({
  destinationElement,
  hrLetterTypes,
}: HrLetterFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [destinationId, setDestinationId] = useState<string>()
  const [typeId, setTypeId] = useState<string>()
  const [notes, setNotes] = useState("")

  const handleDestinationChange = (value: string) => {
    setDestinationId(value)
  }

  const handleTypeChange = (value: string) => {
    setTypeId(value)
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors?.[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "hr-letter-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("hr-letter-form-pending")
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
        label="نموذج طلب خطاب الموارد البشرية"
        path={paths.hrLetter.href}
      />
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
      <input
        type="text"
        name="template_type_id"
        id="template_type_id"
        hidden
        aria-hidden
        readOnly
        value="176"
        className="hidden"
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            name="destination_id"
            label="مسمى الجهة الموجه لها"
            placeholder="اختر الجهة"
            types={destinationElement.map((el) => ({
              id: el.id ?? "",
              name: el.name ?? "",
            }))}
            value={destinationId}
            onChange={handleDestinationChange}
          />
          <SelectField
            name="type"
            label="النوع"
            types={hrLetterTypes.map((el) => ({
              id: el.id ?? "",
              name: el.name ?? "",
            }))}
            value={typeId}
            onChange={handleTypeChange}
          />
        </div>
        <TextareaField
          name="notes"
          label="ملاحظات"
          placeholder="ملاحظات حول الطلب"
          required={false}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
