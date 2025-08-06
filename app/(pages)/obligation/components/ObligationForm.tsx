"use client"

import {
  CheckboxField,
  InputField,
  RadioField,
  SubmitButton,
} from "@components/form"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import type { State } from "../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}
interface ObligationFormProps {
  family: {
    answer: string
    description: string
  }
  relationship: {
    answer: string
    description: string
  }
  work: {
    answer: string
    description: string
  }
}

export const ObligationForm = ({
  family,
  relationship,
  work,
}: ObligationFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    family_answer: family?.answer || "",
    family_description: family?.description || "",
    relationship_answer: relationship?.answer || "",
    relationship_description: relationship?.description || "",
    work_answer: work?.answer || "",
    work_description: work?.description || "",
    approved: false,
  })
  const handleInputFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    toast.loading("جاري انشاء الطلب", { id: "obligation-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      toast.dismiss("obligation-form-pending")
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
    <form action={action} className="space-y-4 p-4">
      <div className="space-y-4">
        <RadioField
          label="هل لديك حالات تضارب مصالح حالية أو محتملة لأجل ارتباطك في الهيئة؟"
          name="family_answer"
          options={[
            { value: "no", label: "لا، ليس لدي" },
            { value: "yes", label: "نعم، هي على النحو الآتي:" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${family?.answer !== "" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={form.family_answer}
          onChange={(value) => setForm({ ...form, family_answer: value })}
        />
        {(family?.answer === "yes" || form?.family_answer === "yes") && (
          <InputField
            name="family_description"
            disabled={family?.answer === "yes"}
            value={form.family_description}
            onChange={handleInputFieldChange}
            label=""
            placeholder="التفاصيل..."
          />
        )}

        <RadioField
          label="هل لديك أقارب حتى الدرجة (الرابعة) يعملون في الهيئة؟"
          name="relationship_answer"
          options={[
            { value: "no", label: "لا، ليس لدي أقارب يعملون في الهيئة" },
            {
              value: "yes",
              label: "نعم، لدي أقارب يعملون في الهيئة، وهم على النحو الآتي:",
            },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${relationship?.answer !== "" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={form.relationship_answer}
          onChange={(value) => setForm({ ...form, relationship_answer: value })}
        />
        {(relationship?.answer === "yes" ||
          form?.relationship_answer === "yes") && (
          <InputField
            name="relationship_description"
            disabled={relationship?.answer === "yes"}
            value={form.relationship_description}
            onChange={handleInputFieldChange}
            label=""
            placeholder="التفاصيل..."
          />
        )}
        <RadioField
          label="هل لديك أعمال غير عملك في الهيئة تقوم بها بشكل مباشر أو غير مباشر، سواء كانت بأجر أو بدون أجر، أو لديك شركات تملكها أو أنت شريك فيها، أو أنت مالك أو عضو أو شريك أو ممثل أو متعاون في أعمال أو جهات تجارية أخرى أو حكومية أو غير هادفة للربح؟"
          name="work_answer"
          options={[
            { value: "no", label: "لا، ليس لدي" },
            { value: "yes", label: "نعم، هي على النحو الآتي:" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${work?.answer !== "" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={form.work_answer}
          onChange={(value) => setForm({ ...form, work_answer: value })}
        />
        {(form?.work_answer === "yes" || work?.answer === "yes") && (
          <InputField
            name="work_description"
            disabled={work?.answer === "yes"}
            value={form.work_description}
            onChange={handleInputFieldChange}
            label=""
            placeholder="التفاصيل..."
          />
        )}

        <div className="p-2 bg-cloudGray rounded-md">
          <CheckboxField
            name="approved"
            label="أقر بأن جميع المعلومات الواردة في هذا النموذج صحيحة وأعد مسؤولا عن أي خطأ فيها، كما أقر بموافقتي على تزويد الهيئة بأي مستندات تطلبها تتعلق بهذا النموذج. كما أتعهد بإبلاغ الهيئة كتابة عن أي حالة تضارب مصالح تقع مستقبلا أو تحتمل الوقوع بعد تاريخ هذا الإفصاح."
            className="flex md:items-center gap-x-3"
            labelStyle="text-lg text-black font-medium leading-0"
            checkboxStyle="-order-1 border-black mt-1 md:mt-0"
            checked={family?.answer !== "" ? true : form.approved}
            onChange={() => setForm({ ...form, approved: !form.approved })}
            disabled={family?.answer !== ""}
          />
        </div>
      </div>
      {family?.answer === "" && (
        <SubmitButton disabled={isPending} loading={isPending} />
      )}
    </form>
  )
}
