"use client"

import { InputField, RadioField, TextareaField } from "@components/form"
import { useAtom } from "jotai"
import { ChangeEvent } from "react"

import { PurchaseField } from "@api/schemas/index"
import { addressRequestAtom, descriptionAtom, purchaseTypeAtom } from "@atoms"
import { PurchaseType } from "@types"

interface BasicInformationSectionProps {
  purchaseTypes: PurchaseField[]
}

export const BasicInformationSection = ({
  purchaseTypes,
}: BasicInformationSectionProps) => {
  return (
    <div className="space-y-6">
      <PurchaseTypeSelector purchaseTypes={purchaseTypes} />
      <AddressRequestField />
      <DescriptionField />
    </div>
  )
}

const PurchaseTypeSelector = ({
  purchaseTypes,
}: BasicInformationSectionProps) => {
  const [purchaseType, setPurchaseType] = useAtom(purchaseTypeAtom)

  return (
    <RadioField
      name="request_type"
      options={purchaseTypes.map((type) => ({
        value: type.key,
        label: type.value,
      }))}
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
      name=""
      placeholder="ملاحظات حول الطلب"
      value={description}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value)
      }
      required
    />
  )
}
