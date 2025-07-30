"use client"

import { PurchaseField } from "@api/schemas/index"
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
import { ChangeEvent, useEffect, useState } from "react"

interface ProjectDetailsSectionProps {
  purchaseInitiative: PurchaseField[]
  purchasePaymentTypes: PurchaseField[]
  purchasePlanTypes: PurchaseField[]
  purchaseProgram: PurchaseField[]
  purchaseResourceName: PurchaseField[]
}

export const ProjectDetailsSection = ({
  purchaseInitiative,
  purchasePaymentTypes,
  purchasePlanTypes,
  purchaseProgram,
  purchaseResourceName,
}: ProjectDetailsSectionProps) => {
  const [purchaseType] = useAtom(purchaseTypeAtom)
  return (
    <div className="space-y-6">
      {purchaseType !== "direct_payment" ? (
        <>
          <RequestOutputsField />
          <PlanSelectionGroup
            purchaseInitiative={purchaseInitiative}
            purchasePlanTypes={purchasePlanTypes}
            purchaseProgram={purchaseProgram}
          />
          <ProjectDatesGroup />
        </>
      ) : (
        <BatchGroup
          purchasePaymentTypes={purchasePaymentTypes}
          purchaseResourceName={purchaseResourceName}
        />
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
      name="notes"
      placeholder="مخرجات الطلب"
      value={requestOutputs}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setRequestOutputs(e.target.value)
      }
      required
    />
  )
}

interface PlanSelectionGroupProps {
  purchaseInitiative: PurchaseField[]
  purchasePlanTypes: PurchaseField[]
  purchaseProgram: PurchaseField[]
}

const PlanSelectionGroup = ({
  purchaseInitiative,
  purchasePlanTypes,
  purchaseProgram,
}: PlanSelectionGroupProps) => {
  const [strategicPlanId, setStrategicPlanId] = useState("")
  const [purchaseInitiativeId, setPurchaseIntiativeId] = useState("")
  const [purchaseProgramId, setPurchaseProgramId] = useState("")
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <SelectField
          label="نوع الخطة"
          name="strategic_plan_type_id"
          placeholder="اختر نوع الخطة"
          types={purchasePlanTypes.map((type) => ({
            id: type.id,
            name: type.name,
          }))}
          value={strategicPlanId}
          onChange={(value) => {
            setStrategicPlanId(value)
          }}
        />
        <SelectField
          label="اسم (المبادرة/البرنامج)"
          name="purchase_initiative_id"
          placeholder="اختر اسم المبادرة/البرنامج"
          types={purchaseInitiative.map((type) => ({
            id: type.id,
            name: type.name,
          }))}
          value={purchaseInitiativeId}
          onChange={(value) => {
            setPurchaseIntiativeId(value)
          }}
        />
      </div>

      <SelectField
        label="اسم المشروع"
        name="purchase_program_id"
        placeholder="اختر اسم المشروع"
        types={purchaseProgram.map((type) => ({
          id: type.id,
          name: type.name,
        }))}
        value={purchaseProgramId}
        onChange={(value) => {
          setPurchaseProgramId(value)
        }}
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
          name="date_start_project"
          date={dateFrom}
          onChange={(date) => setDateFrom(date || new Date())}
        />
      </div>
      <div className="space-y-2">
        <DateField
          required
          label="تاريخ نهاية المشروع المتوقع"
          name="date_end_project"
          date={dateTo}
          onChange={(date) => setDateTo(date || new Date())}
        />
      </div>
      <div className="space-y-2">
        <InputField
          label="مدة المشروع"
          name="duration_project"
          disabled
          value={duration}
          placeholder=""
        />
      </div>
    </div>
  )
}

interface BatchGroupProps {
  purchasePaymentTypes: PurchaseField[]
  purchaseResourceName: PurchaseField[]
}

const BatchGroup = ({
  purchasePaymentTypes,
  purchaseResourceName,
}: BatchGroupProps) => {
  const [directPaymentTypeId, setDirectPaymentTypeId] = useState("")
  const [paymentPartnerId, setPaymentPartnerId] = useState("")
  return (
    <>
      <SelectField
        label="نوع الدفعة"
        name="direct_payment_type_id"
        placeholder="اختر نوع الدفعة"
        types={purchasePaymentTypes.map((type) => ({
          id: type.id,
          name: type.name,
        }))}
        value={directPaymentTypeId}
        onChange={(value) => {
          setDirectPaymentTypeId(value)
        }}
      />
      <SelectField
        label="اسم المورد"
        name="payment_partner_id"
        placeholder="اختر اسم المورد"
        types={purchaseResourceName.map((type) => ({
          id: type.id,
          name: type.name,
        }))}
        value={paymentPartnerId}
        onChange={(value) => {
          setPaymentPartnerId(value)
        }}
      />
    </>
  )
}

const CostsField = () => {
  const [costs, setCosts] = useAtom(costsAtom)
  const [purchaseType] = useAtom(purchaseTypeAtom)

  useEffect(() => {
    if (purchaseType !== "direct_payment") {
      setCosts(0)
    }
  }, [purchaseType, setCosts])

  return (
    <>
      <InputField
        label="التكاليف"
        name="estimated_budget"
        placeholder=""
        value={costs}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCosts(Number(e.target.value))
        }
        required
        disabled={purchaseType === "direct_payment"}
        icon={<RiyalCurrencyIcon />}
      />
    </>
  )
}
