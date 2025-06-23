"use client"

import {
  costsAtom,
  dateFromAtom,
  dateToAtom,
  durationAtom,
  purchaseTypeAtom,
  requestOutputsAtom,
} from "@atoms"
import {
  DateField,
  InputField,
  SelectField,
  TextareaField,
} from "@components/form"
import { RiyalCurrencyIcon } from "@icons"
import { useAtom } from "jotai"
import { ChangeEvent, useEffect } from "react"

export const ProjectDetailsSection = () => {
  const [purchaseType] = useAtom(purchaseTypeAtom)
  return (
    <div className="space-y-6">
      {purchaseType !== "directPayment" ? (
        <>
          <RequestOutputsField />
          <PlanSelectionGroup />
          <ProjectDatesGroup />
        </>
      ) : (
        <BatchGroup />
      )}
      <CostsField />
    </div>
  )
}

const RequestOutputsField = () => {
  const [requestOutputs, setRequestOutputs] = useAtom(requestOutputsAtom)

  return (
    <TextareaField
      label="مخرجات الطلب"
      name="request_outputs"
      placeholder="مخرجات الطلب"
      value={requestOutputs}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setRequestOutputs(e.target.value)
      }
      required
    />
  )
}

const PlanSelectionGroup = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <SelectField
          label="نوع الخطة"
          name="planType"
          placeholder="اختر نوع الخطة"
          types={[]}
        />
        <SelectField
          label="اسم (المبادرة/البرنامج)"
          name="programName"
          placeholder="اختر اسم المبادرة/البرنامج"
          types={[]}
        />
      </div>

      <SelectField
        label="اسم المشروع"
        name="projectName"
        placeholder="اختر اسم المشروع"
        types={[]}
      />
    </>
  )
}

const ProjectDatesGroup = () => {
  const [dateFrom, setDateFrom] = useAtom(dateFromAtom)
  const [dateTo, setDateTo] = useAtom(dateToAtom)
  const [duration] = useAtom(durationAtom)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-0">
      <div className="space-y-2">
        <DateField
          required
          label="تاريخ بداية المشروع المتوقع"
          name="date_from"
          date={dateFrom}
          onChange={(date) => setDateFrom(date || new Date())}
        />
      </div>
      <div className="space-y-2">
        <DateField
          required
          label="تاريخ نهاية المشروع المتوقع"
          name="date_to"
          date={dateTo}
          onChange={(date) => setDateTo(date || new Date())}
        />
      </div>
      <div className="space-y-2">
        <InputField
          label="مدة المشروع"
          name="duration"
          disabled
          value={duration}
          placeholder=""
        />
      </div>
    </div>
  )
}
const BatchGroup = () => {
  return (
    <>
      <SelectField
        label="نوع الدفعة"
        name="BatchType"
        placeholder="اختر نوع الدفعة"
        types={[]}
      />
      <SelectField
        label="اسم المورد"
        name="resourceName"
        placeholder="اختر اسم المورد"
        types={[]}
      />
    </>
  )
}

const CostsField = () => {
  const [costs, setCosts] = useAtom(costsAtom)
  const [purchaseType] = useAtom(purchaseTypeAtom)

  useEffect(() => {
    if (purchaseType !== "directPayment") {
      setCosts(0)
    }
  }, [purchaseType, setCosts])

  return (
    <InputField
      label="التكاليف"
      name="costs"
      placeholder=""
      value={costs}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setCosts(Number(e.target.value))
      }
      required
      disabled={purchaseType === "directPayment"}
      icon={<RiyalCurrencyIcon />}
    />
  )
}
