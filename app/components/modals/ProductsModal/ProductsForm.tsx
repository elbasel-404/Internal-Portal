"use client"

import { InputField, SelectField, TextareaField } from "@components/form"
import { CheckIcon, RiyalCurrencyIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { productsFormAction } from "./ProductsFormAction"
import { ProductsList, TaxsList } from "./config"

export const ProductsForm = () => {
  const router = useRouter()
  const [products, setProducts] = useState("")
  const [description, setDescription] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [taxValue, setTaxValue] = useState("")

  const handleProductsChange = (value: string) => {
    setProducts(value)
  }

  const handleTaxsChange = (value: string) => {
    setTaxValue(value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value) || 0)
  }

  const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value) || 0)
  }

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form
      action={productsFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <SelectField
        label="المنتج"
        name="product"
        placeholder=""
        value={products}
        onChange={handleProductsChange}
        types={ProductsList}
      />
      <TextareaField
        label="الوصف"
        name="description"
        placeholder=""
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <InputField
        label="الكمية"
        name="quantity"
        placeholder=""
        required
        value={quantity}
        onChange={handleQuantityChange}
      />
      <InputField
        label="سعر الوحدة"
        name="unitPrice"
        placeholder=""
        required
        icon={<RiyalCurrencyIcon />}
        value={unitPrice}
        onChange={handleUnitPriceChange}
      />
      <SelectField
        label="الضريبة"
        name="tax"
        placeholder=""
        value={taxValue}
        onChange={handleTaxsChange}
        types={TaxsList}
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
