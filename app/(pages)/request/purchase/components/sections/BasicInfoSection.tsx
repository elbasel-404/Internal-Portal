"use client"

import { InputField, RadioField, TextareaField } from "@components/form"
import { useAtom } from "jotai"
import { ChangeEvent } from "react"

import { addressRequestAtom, descriptionAtom, purchaseTypeAtom } from "@atoms"
import { PurchaseType } from "@types"

export const BasicInformationSection = () => {
  return (
    <div className="space-y-6">
      <PurchaseTypeSelector />
      <AddressRequestField />
      <DescriptionField />
    </div>
  )
}

const PurchaseTypeSelector = () => {
  const [purchaseType, setPurchaseType] = useAtom(purchaseTypeAtom)

  return (
    <RadioField
      name="request_type"
      options={[
        { value: "material", label: "تشغيلي" },
        { value: "project", label: "الخطة الإستراتيجية" },
        { value: "direct_payment", label: "دفعة مباشرة" },
      ]}
      required={true}
      labelStyle="font-medium text-base"
      radioStyle="flex flex-col sm:flex-row gap-4 mt-3"
      className="flex-col"
      selectedValue={purchaseType}
      onChange={(selected) => setPurchaseType(selected as PurchaseType)}
    />
  )
}

const AddressRequestField = () => {
  const [addressRequest, setAddressRequest] = useAtom(addressRequestAtom)

  return (
    <InputField
      label="عنوان الطلب"
      name="request_title"
      placeholder=""
      value={addressRequest}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAddressRequest(e.target.value)
      }
    />
  )
}

const DescriptionField = () => {
  const [description, setDescription] = useAtom(descriptionAtom)

  return (
    <TextareaField
      label="الوصف"
      name="description"
      placeholder="ملاحظات حول الطلب"
      value={description}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value)
      }
      required
    />
  )
}
