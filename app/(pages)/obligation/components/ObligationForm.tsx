"use client"

import { CheckboxField, InputField, RadioField } from "@components/form"
import { useState } from "react"

export const ObligationForm = () => {
  const [conflictOfInterest, setConflictOfInterest] = useState<string>("")
  const [relatives, setRelatives] = useState("")
  const [workOutside, setWorkOutside] = useState<string>("")

  const handleConflictOfInterestChange = (value: string) => {
    setConflictOfInterest(value)
  }
  const handleRelativesChange = (value: string) => {
    setRelatives(value)
  }
  const handleWorkOutsideChange = (value: string) => {
    setWorkOutside(value)
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
          radioStyle="grid grid-cols-1 md:grid-cols-2 mt-3"
          className="flex-col"
          selectedValue={conflictOfInterest}
          onChange={handleConflictOfInterestChange}
        />
        {conflictOfInterest === "yes" && (
          <InputField
            name="conflict_of_interest_details"
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
          radioStyle="grid grid-cols-1 md:grid-cols-2 mt-3"
          className="flex-col"
          selectedValue={relatives}
          onChange={handleRelativesChange}
        />
        {relatives === "yes" && (
          <InputField
            name="relatives_details"
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
          radioStyle="grid grid-cols-1 md:grid-cols-2 mt-3"
          className="flex-col"
          selectedValue={workOutside}
          onChange={handleWorkOutsideChange}
        />
        {workOutside === "yes" && (
          <InputField
            name="work_outside_details"
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
          />
        </div>
      </div>
    </form>
  )
}
