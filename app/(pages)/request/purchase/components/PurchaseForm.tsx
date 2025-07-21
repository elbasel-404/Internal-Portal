"use client"

import { PurchaseField } from "@api/schemas/index"
import { purchaseTypeAtom } from "@atoms"
import { SubmitButton } from "@components/form"
import { ProductSchema, ProjectCompletionSchema } from "@zodSchemas"
import { useAtom } from "jotai"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { formAction } from "./helpers/formAction"
import { State } from "./helpers/State"
import {
  AttachmentsSection,
  BasicInformationSection,
  ProductsSection,
  ProjectCompletionSection,
  ProjectDetailsSection,
  PurchaseFormHeader,
  RequirementsSection,
} from "./sections"

type ProjectCompletionData = z.infer<typeof ProjectCompletionSchema>
type ProductsData = z.infer<typeof ProductSchema>

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

interface PurchaseProps {
  projectCompletionData: ProjectCompletionData[]
  productsData: ProductsData[]
  purchaseTypes: PurchaseField[]
  purchasePlanTypes: PurchaseField[]
  purchaseInitiative: PurchaseField[]
  purchaseProgram: PurchaseField[]
  purchasePaymentTypes: PurchaseField[]
  purchaseResourceName: PurchaseField[]
}
export const PurchaseForm = ({
  projectCompletionData,
  productsData,
  purchaseTypes,
  purchaseInitiative,
  purchasePaymentTypes,
  purchasePlanTypes,
  purchaseProgram,
  purchaseResourceName,
}: PurchaseProps) => {
  const [purchaseType] = useAtom(purchaseTypeAtom)
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pending = isPending || isSubmitting

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "vacation-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
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
    <form action={action} className="bg-white rounded-md p-4">
      <PurchaseFormHeader />

      <div className="p-4 space-y-6">
        <BasicInformationSection purchaseTypes={purchaseTypes} />
        <AttachmentsSection />
        <ProjectDetailsSection
          purchaseInitiative={purchaseInitiative}
          purchasePaymentTypes={purchasePaymentTypes}
          purchasePlanTypes={purchasePlanTypes}
          purchaseProgram={purchaseProgram}
          purchaseResourceName={purchaseResourceName}
        />
        <RequirementsSection />
        {purchaseType !== "direct_payment" ? (
          <ProjectCompletionSection data={projectCompletionData} />
        ) : (
          <ProductsSection data={productsData} />
        )}
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
