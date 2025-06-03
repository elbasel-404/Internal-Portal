"use client"

import { FilterSection, Table } from "@components"
import { CirclePlusIcon, FilterIcon, SearchIcon } from "@icons"
import { Button, Input } from "@ui"
import Link from "next/link"
import { ChangeEvent, useState } from "react"

import { paths } from "@lib"
import { MedicalInsuranceRequest } from "@types"

interface MedicalInsuranceProps {
  data: MedicalInsuranceRequest[]
}

const tableHeaders = [
  { label: "تاريخ الطلب" },
  { label: "نوع الطلب" },
  { label: "صلة القرابة" },
  { label: "الاسم بالعربية" },
  { label: "الاسم بالانجليزية" },
  { label: "الحالة" },
]

export const MedicalTable = ({ data }: MedicalInsuranceProps) => {
  const [, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev)
  }

  if (!data) return

  const filteredRequests = data.filter((request) =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
    setCurrentPage(1)
  }

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">
            قائمة طلبات التأمين الطبي
          </h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="البحث في الطلبات"
              icon={<SearchIcon />}
              className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              onClick={toggleFilter}
              className="bg-cloudGray p-2.5 rounded-full shadow-none hover:bg-cloudGray"
            >
              <FilterIcon className="fill-primary" />
            </Button>
            <Link
              href={paths.newMedicalInsurance.href}
              className="flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary hover:border-2 hover:border-primary"
            >
              <CirclePlusIcon className="fill-white group-hover:fill-primary" />
              أضف جديد
            </Link>
          </div>
        </div>

        {isFilterVisible && (
          <FilterSection options={data} onApplyFilters={() => {}} />
        )}

        <Table
          columns={tableHeaders}
          rows={filteredRequests}
          link={paths.medicalInsuranceDetails.href}
        />
      </div>
    </>
  )
}
