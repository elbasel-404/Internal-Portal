"use client"

import { CheckboxField, InputField, RadioField } from "@components/form"
import { useState } from "react"
import { ObligationFormProps } from "./ObligationFormProps"

export const ObligationForm = ({
  family,
  relationship,
  work,
}: ObligationFormProps) => {
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

  return (
    <form className="space-y-4 p-4">
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
    </form>
  )
}
