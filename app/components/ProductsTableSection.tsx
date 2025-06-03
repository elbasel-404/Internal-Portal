"use client"

import { Table } from "@components"
import { RiyalCurrencyIcon } from "@icons"
import { PurchaseProduct } from "@types"

const productTableHeaders = [
  { label: "المنتج" },
  { label: "الوصف" },
  { label: "الكمية" },
  { label: "الكمية المنجزة" },
  { label: "المبلغ المنجز" },
  { label: "الكمية تحت المنجزة" },
  { label: "الكمية المتبقية" },
  { label: "المبلغ المتبقى" },
  { label: "سعر الوحدة" },
  { label: "سعر الوحدة بعد الضريبة" },
  { label: "الاجمالي الفرعى" },
  { label: "الإجمالي بعد الضريبة" },
]

interface Props {
  requestStatus?: { id: string }[]
  productsData: PurchaseProduct[]
}

export const ProductsTableSection = ({
  requestStatus,
  productsData,
}: Props) => {
  if (requestStatus) {
    if (!requestStatus?.some((step) => step.id === "6")) return null
  }

  return (
    <div className="bg-white pt-4 pb-4 px-4 rounded-lg space-y-3">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
        <h2 className="text-darkBlue font-bold text-xl">
          المنتجات<span className="text-red-500">*</span>
        </h2>
      </div>
      <>
        <Table
          tableClassName="h-fit"
          columns={productTableHeaders}
          rows={productsData}
          toggleId={false}
        />
        <div className="p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-10">
          <p className="text-foreground font-medium">الإجمالي مع الضريبة</p>
          <span className="flex items-center gap-2 text-foreground font-medium text-xl">
            {20000}
            <RiyalCurrencyIcon />
          </span>
        </div>
      </>
    </div>
  )
}
