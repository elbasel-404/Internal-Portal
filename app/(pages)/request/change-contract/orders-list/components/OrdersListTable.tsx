"use client"

import { FilterSection, Table } from "@components"
import { SearchIcon } from "@icons"
import { Input } from "@ui"
import { ChangeEvent, useState } from "react"

import { RadioField } from "@components/form"
import { paths } from "@lib"
import type {
  OrdersListAgreementRequest,
  OrdersListPurchaseRequest,
} from "@types"

interface OrdersListProps {
  purchaseData: OrdersListPurchaseRequest[]
  agreementData: OrdersListAgreementRequest[]
}

const purchaseTableHeaders = [
  { label: "رقم أمر الشراء" },
  { label: "رقم العقد" },
  { label: "اسم المنافسة" },
  { label: "مبلغ الترسية" },
  { label: "طلبات التغيير الأخرى" },
  { label: "الحالة" },
]

const agreementTableHeaders = [
  { label: "رقم أمر الشراء" },
  { label: "رقم العقد" },
  { label: "اسم المنافسة" },
  { label: "مبلغ الترسية" },
  { label: "طلبات التغيير الأخرى" },
  { label: "الحالة" },
]

export const OrdersListTable = ({
  purchaseData,
  agreementData,
}: OrdersListProps) => {
  const [, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const [ordersLisStatus, setOrdersListStatus] = useState("purchase_order")
  const [isFilterVisible] = useState(false)

  // Return early if required data is not available
  if (!purchaseData && !agreementData) return

  // Determine current data and headers based on selected status
  const currentData =
    ordersLisStatus === "purchase_order" ? purchaseData : agreementData
  const currentHeaders =
    ordersLisStatus === "purchase_order"
      ? purchaseTableHeaders
      : agreementTableHeaders

  // Filter the current data based on search term
  const filteredRequests =
    currentData?.filter((request) =>
      request.id.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
    setCurrentPage(1)
  }

  const handleStatusChange = (value: string) => {
    setOrdersListStatus(value)
  }

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">
            قائمة أوامر الشراء المعتمدة
          </h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="البحث في الطلبات"
              icon={<SearchIcon />}
              className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isFilterVisible && (
          <FilterSection options={currentData} onApplyFilters={() => {}} />
        )}

        <RadioField
          name="changeContractStatus"
          options={[
            { label: "طلب تغيير على أمر شراء", value: "purchase_order" },
            {
              label: "طلب تغيير على اتفاقية إطارية",
              value: "framework_agreement",
            },
          ]}
          className="flex-col p-3"
          labelStyle="my-2"
          onChange={handleStatusChange}
          selectedValue={ordersLisStatus}
          required
        />

        <Table
          idTableHeader={
            ordersLisStatus === "purchase_order"
              ? "رقم طلب الشراء"
              : "رقم الاتفاقية الإطارية"
          }
          columns={currentHeaders}
          rows={filteredRequests}
          link={paths.purchaseOrderDetails.href}
        />
      </div>
    </>
  )
}
