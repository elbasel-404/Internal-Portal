"use client"

import { FilterSection, Table } from "@components"
import { FilterIcon, SearchIcon } from "@icons"
import { Button, Input } from "@ui"
import { useState, type ChangeEvent } from "react"

import { paths } from "@lib"
import type { InternalCoursesRequest } from "@types"

interface InternalCoursesProps {
  data: InternalCoursesRequest[]
}

const tableHeaders = [
  { label: "مسمي الدورة" },
  { label: "من تاريخ" },
  { label: "إلى تاريخ" },
  { label: "مدتها (باليوم)" },
  { label: "النوع" },
  { label: "مركز التدريب" },
  { label: "الحالة" },
]

export const InternalCoursesTable = ({ data }: InternalCoursesProps) => {
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
            قائمة الدورات الداخلية
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
          </div>
        </div>

        {isFilterVisible && (
          <FilterSection options={data} onApplyFilters={() => {}} />
        )}

        <Table
          columns={tableHeaders}
          rows={filteredRequests}
          link={paths.internalCoursesDetails.href}
          toggleId={false}
        />
      </div>
    </>
  )
}
