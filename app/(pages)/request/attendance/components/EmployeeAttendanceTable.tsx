"use client"

import { FilterSection, Table } from "@components"
import { SearchIcon } from "@icons"
import { paths } from "@lib"
import type { EmployeeAttendanceRequest } from "@types"
import { Input } from "@ui"
import { ChangeEvent, useState } from "react"
import { employeeAttendanceTableHeaders, employees } from "./config"

interface EmployeeAttendanceRequestProps {
  data: EmployeeAttendanceRequest[]
}

export const EmployeeAttendanceTable = ({
  data,
}: EmployeeAttendanceRequestProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = data.filter((request) =>
    request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">حضور الموظفين</h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="البحث في الموظفين"
              icon={<SearchIcon width={13} height={13} />}
              className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <FilterSection
          options={employees}
          selectLabel="الموظف"
          selectPlaceholder="حدد الموظف"
          filterHeader="فرز الطلبات"
          filterButton="بحث"
          Icon={SearchIcon}
          onApplyFilters={() => {}}
        />

        <Table
          columns={employeeAttendanceTableHeaders}
          rows={filteredRequests}
          link={paths.vacationDetails.href}
          toggleId={false}
        />
      </div>
    </>
  )
}
