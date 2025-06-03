"use client"

import { FilterSection, Table } from "@components"
import { FilterIcon, SearchIcon } from "@icons"
import { paths } from "@lib"
import type { TransactionRequest } from "@types"
import { Input } from "@ui"
import { useState, type ChangeEvent } from "react"
import { requests, tableHeaders } from "./config"

interface TransactionListRequestProps {
  data: TransactionRequest[]
}

export const TransactionListTable = ({ data }: TransactionListRequestProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = data.filter((request) => {
    if (typeof request.name !== "string") return
    return request.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">
            قائمة المعاملات
          </h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="البحث في الطلبات"
              icon={<SearchIcon width={13} height={13} />}
              className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <FilterSection
          options={requests}
          selectLabel="نوع الطلب"
          selectPlaceholder="حدد نوع الطلب"
          filterHeader="فرز الطلبات"
          filterButton="إظهار النتائج"
          Icon={FilterIcon}
          isRequestDate={true}
          onApplyFilters={() => {}}
        />

        <Table
          columns={tableHeaders}
          rows={filteredRequests}
          link={paths.home.href}
        />
      </div>
    </>
  )
}
