"use client"

import { FilterSection, Table } from "@components"
import { SearchIcon } from "@icons"
import { Input } from "@ui"
import { ChangeEvent, useState } from "react"

import { RadioField } from "@components/form"
import { paths } from "@lib"
import type {
  ChangeContractAgreementRequest,
  ChangeContractPurchaseRequest,
} from "@types"

interface ChangeContractProps {
  purchaseData: ChangeContractPurchaseRequest[]
  agreementData: ChangeContractAgreementRequest[]
}

const purchaseTableHeaders = [
  { label: "رقم أمر الشراء" },
  { label: "رقم العقد" },
  { label: "اسم المنافسة" },
  { label: "ناريخ الطلب" },
  { label: "مبلغ الزيادة" },
  { label: "مبلغ التخفيض" },
  { label: "الحالة" },
]

const agreementTableHeaders = [
  { label: "رقم اتفاقية الشراء" },
  { label: "رقم العقد" },
  { label: "اسم المنافسة" },
  { label: "تاريخ الطلب" },
  { label: "مبلغ التغيير" },
  { label: "الحالة" },
]

export const ChangeContractTable = ({
  purchaseData,
  agreementData,
}: ChangeContractProps) => {
  const [, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterVisible] = useState(false)
  const [change_contractStatus, setChangeContractStatus] =
    useState("purchase_order")

  // Return early if required data is not available
  if (!purchaseData && !agreementData) return

  // Determine current data and headers based on selected status
  const currentData =
    change_contractStatus === "purchase_order" ? purchaseData : agreementData
  const currentHeaders =
    change_contractStatus === "purchase_order"
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
    setChangeContractStatus(value)
  }

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">
            قائمة طلبات تغيير العقد
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
          label="الرجاء اختيار نوع الطلب"
          options={[
            { label: "طلب تغيير على أمر شراء", value: "purchase_order" },
            {
              label: "طلب تغيير على اتفاقية إطارية",
              value: "framework_agreement",
            },
          ]}
          className="flex-col mb-4 px-4"
          labelStyle="mb-2"
          onChange={handleStatusChange}
          selectedValue={change_contractStatus}
          required
        />

        <Table
          idTableHeader={
            change_contractStatus === "purchase_order"
              ? "رقم طلب التغيير"
              : "رقم طلب التغيير"
          }
          columns={currentHeaders}
          rows={filteredRequests}
          link={paths.changeContractDetails.href}
        />
      </div>
    </>
  )
}
