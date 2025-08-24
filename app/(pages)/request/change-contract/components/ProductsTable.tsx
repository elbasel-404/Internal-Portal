"use client"

import { RiyalCurrencyIcon } from "@icons"
import { PurchaseOrderProduct } from "@types"
import { Input } from "@ui"
import { useState } from "react"

const productTableHeaders = [
  { label: "التصنيف" },
  { label: "المنتج" },
  { label: "الوصف" },
  { label: "الكمية" },
  { label: "الضريبة" },
  { label: "سعر الوحدة" },
  { label: "الإجمالي" },
  { label: "الكمية المنجزة" },
]

interface ProductsTableProps {
  productsData?: PurchaseOrderProduct[]
}

export const ProductsTable = ({ productsData = [] }: ProductsTableProps) => {
  const [products, setProducts] = useState(productsData)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p)),
    )
  }

  const totalAmount = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0,
  )

  return (
    <div className="overflow-x-auto app-scrollbar">
      <table className="w-full text-center border-collapse">
        <thead className="bg-cloudGray">
          <tr>
            {productTableHeaders.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-6 text-sm font-semibold text-foreground"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const total = product.unitPrice * product.quantity
            return (
              <tr key={product.id} className="border border-cloudGray">
                <td className="px-4 py-6 border border-cloudGray">
                  {product.category}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {product.name}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {product.description}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    className="w-24 shadow-none text-black placeholder:text-black placeholder:font-medium rounded-sm py-6 bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary"
                  />
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {product.tax}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {product.unitPrice.toLocaleString()}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {total.toLocaleString()}
                </td>
                <td className="px-4 py-6 border border-cloudGray">
                  {product.completedQuantity}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* الإجمالي */}
      <div className="p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-8 mt-4">
        <p className="text-foreground font-medium">إجمالي المنتجات</p>
        <span className="flex items-center gap-2 text-foreground font-medium">
          {totalAmount.toLocaleString()}
          <RiyalCurrencyIcon />
        </span>
      </div>

      <div className="p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-8 mt-4">
        <p className="text-foreground font-medium">
          مبلغ التعميد / العقد بعد التعديل:{" "}
        </p>
        <span className="flex items-center gap-2 text-foreground font-medium">
          {totalAmount.toLocaleString()}
          <RiyalCurrencyIcon />
        </span>
      </div>
    </div>
  )
}
