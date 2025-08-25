"use client"

import { InputField, SelectField } from "@components/form"
import { CheckIcon, RiyalCurrencyIcon, XMarkIcon } from "@icons"
import { PurchaseProduct } from "@types"
import { Button } from "@ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { batchProductsFormAction } from "./BatchProductsFormAction"

interface BatchProductsFormProps {
  productsDataRequest: PurchaseProduct[]
}

export const BatchProductsForm = ({
  productsDataRequest,
}: BatchProductsFormProps) => {
  const router = useRouter()
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    quantity: "",
    completedQuantity: "",
    completedCost: "",
    underCompletedQauntity: "",
    underCompletedCost: "",
    remainingQuantity: "",
    remainingCost: "",
    unitPrice: "",
    unitPriceWithTax: "",
    subtotal: "",
  })

  const handleProductsChange = (value: string) => {
    const selectedProduct = productsDataRequest.find((p) => p.id === value)
    if (selectedProduct) {
      setProduct((prev) => ({
        ...prev,
        id: selectedProduct.id,
        name: selectedProduct.product,
        description: selectedProduct.description || "",
        quantity: selectedProduct.quantity || "",
        completedQuantity: selectedProduct.completedQuantity || "",
        completedCost: selectedProduct.completedCost || "",
        underCompletedQauntity: selectedProduct.underCompletedQauntity || "",
        underCompletedCost: selectedProduct.completedCost || "",
        remainingQuantity: selectedProduct.remainingQuantity || "",
        remainingCost: selectedProduct.remainingCost || "",
        unitPrice: selectedProduct.unitPrice || "",
        unitPriceWithTax: selectedProduct.unitPriceWithTax || "",
        subtotal: selectedProduct.subtotal || "",
      }))
    }
  }

  const closeModal = () => router.back()

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form
      action={batchProductsFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <input
        type="text"
        name="name"
        hidden
        aria-hidden
        readOnly
        value={product.name}
        className="hidden"
      />
      <SelectField
        label="المنتج"
        name="id"
        placeholder=""
        value={product.id}
        onChange={handleProductsChange}
        types={productsDataRequest.map((p) => ({
          id: p.id,
          name: p.product ?? "",
        }))}
      />

      <InputField
        label="الوصف"
        name="description"
        value={product.description}
        readOnly
        required
      />
      <InputField
        label="الكمية"
        name="quantity"
        value={product.quantity}
        readOnly
        required
      />
      <InputField
        label="الكمية المنجزة"
        name="completedQuantity"
        value={product.completedQuantity}
        readOnly
      />
      <InputField
        label="المبلغ المنجز"
        name="completedCost"
        icon={<RiyalCurrencyIcon />}
        value={product.completedCost}
        readOnly
      />
      <InputField
        label="الكمية تحت الإنجاز"
        name="underCompletedQauntity"
        value={product.underCompletedQauntity}
        readOnly
      />
      <InputField
        label="المبلغ تحت الإنجاز"
        name="underCompletedCost"
        icon={<RiyalCurrencyIcon />}
        value={product.underCompletedCost}
        readOnly
      />
      <InputField
        label="الكمية المتبقية"
        name="remainingQuantity"
        value={product.remainingQuantity}
        readOnly
      />
      <InputField
        label="المبلغ المتبقي"
        name="remainingCost"
        icon={<RiyalCurrencyIcon />}
        value={product.remainingCost}
        readOnly
      />
      <InputField
        label="سعر الوحدة"
        name="unitPrice"
        icon={<RiyalCurrencyIcon />}
        value={product.unitPrice}
        readOnly
        required
      />
      <InputField
        label="سعر الوحدة بعد الضريبة"
        name="unitPriceWithTax"
        icon={<RiyalCurrencyIcon />}
        value={product.unitPriceWithTax}
        readOnly
        required
      />
      <InputField
        label="الإجمالي"
        name="subtotal"
        icon={<RiyalCurrencyIcon />}
        value={product.subtotal}
        readOnly
        required
      />

      <div className="flex justify-end mb-2 gap-2">
        <Button
          onClick={closeModal}
          type="button"
          className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
        >
          <XMarkIcon className="fill-stormGray w-0 h-0" />
          إغلاق
        </Button>

        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <CheckIcon className="fill-primary group-hover:fill-white" />
          إضافة
        </Button>
      </div>
    </form>
  )
}
