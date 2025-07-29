"use client"

import {
  CheckboxField,
  InputField,
  RadioField,
  SubmitButton,
} from "@components/form"
import { useEffect, useState, useTransition } from "react"
import { ObligationFormProps } from "./ObligationFormProps"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import type { State } from "../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

export const ObligationForm = ({
  family,
  relationship,
  work,
}: ObligationFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()

  const [conflictOfInterest, setConflictOfInterest] = useState<string>("")
  const [relatives, setRelatives] = useState("")
  const [workOutside, setWorkOutside] = useState<string>("")
  const [checked, setChecked] = useState<boolean>(false)

  const handleConflictOfInterestChange = (value: string) => {
    setConflictOfInterest(value)
  }
  const handleRelativesChange = (value: string) => {
    setRelatives(value)
  }
  const handleWorkOutsideChange = (value: string) => {
    setWorkOutside(value)
  }
  const handleSelectedValue = (
    value: boolean | null | undefined,
    defaultValue: string,
  ) => {
    if (value === undefined || value === null) return defaultValue
    return value === true ? "yes" : "no"
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    toast.loading("جاري انشاء الطلب", { id: "vacation-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      toast.dismiss("vacation-form-pending")
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
          name="conflict_of_interest"
          options={[
            { value: "no", label: "لا، ليس لدي" },
            { value: "yes", label: "نعم، هي على النحو الآتي:" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${typeof family?.answer === "boolean" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={handleSelectedValue(
            family?.answer,
            conflictOfInterest,
          )}
          onChange={handleConflictOfInterestChange}
        />
        {(conflictOfInterest === "yes" || family?.answer === true) && (
          <InputField
            name="conflict_of_interest_details"
            disabled={family?.answer === true}
            value={family?.description || ""}
            label=""
            placeholder="التفاصيل..."
          />
        )}

        <RadioField
          label="هل لديك أقارب حتى الدرجة (الرابعة) يعملون في الهيئة؟"
          name="relatives"
          options={[
            { value: "no", label: "لا، ليس لدي أقارب يعملون في الهيئة" },
            {
              value: "yes",
              label: "نعم، لدي أقارب يعملون في الهيئة، وهم على النحو الآتي:",
            },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${typeof relationship?.answer === "boolean" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={handleSelectedValue(relationship?.answer, relatives)}
          onChange={handleRelativesChange}
        />
        {(relatives === "yes" || relationship?.answer === true) && (
          <InputField
            name="relatives_details"
            disabled={relationship?.answer === true}
            value={relationship?.description || ""}
            label=""
            placeholder="التفاصيل..."
          />
        )}
        <RadioField
          label="هل لديك أعمال غير عملك في الهيئة تقوم بها بشكل مباشر أو غير مباشر، سواء كانت بأجر أو بدون أجر، أو لديك شركات تملكها أو أنت شريك فيها، أو أنت مالك أو عضو أو شريك أو ممثل أو متعاون في أعمال أو جهات تجارية أخرى أو حكومية أو غير هادفة للربح؟"
          name="work_outside"
          options={[
            { value: "no", label: "لا، ليس لدي" },
            { value: "yes", label: "نعم، هي على النحو الآتي:" },
          ]}
          required={true}
          labelStyle="font-medium text-base"
          radioStyle={`grid grid-cols-1 md:grid-cols-2 mt-3 ${typeof work?.answer === "boolean" ? "opacity-50 pointer-events-none" : ""}`}
          className="flex-col"
          selectedValue={handleSelectedValue(work?.answer, workOutside)}
          onChange={handleWorkOutsideChange}
        />
        {(workOutside === "yes" || work?.answer === true) && (
          <InputField
            name="work_outside_details"
            disabled={work?.answer === true}
            value={work?.description || ""}
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
            checked={typeof family?.answer === "boolean" ? true : checked}
            onChange={() => setChecked(!checked)}
            disabled={typeof family?.answer === "boolean"}
          />
        </div>
      </div>
      {typeof family?.answer !== "boolean" && (
        <SubmitButton disabled={isPending} loading={isPending} />
      )}
    </form>
  )
}
