"use client"

import { FilterSection, Table } from "@components"
import { SearchIcon } from "@icons"
import { paths } from "@lib"
import type { EmployeeAttendanceRequest } from "@types"
import { Input } from "@ui"
import { ChangeEvent, useState } from "react"
import { employeeAttendanceTableHeaders, employees } from "./config"
import Image from "next/image"

interface EmployeeAttendanceRequestProps {
  data: EmployeeAttendanceRequest[]
}

export const EmployeeAttendanceTable = ({
  data,
}: EmployeeAttendanceRequestProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showemployeeDetails, setShowEmployeeDetails] = useState(false)
  const [form, setForm] = useState({
    start: "",
    end: "",
    select: "",
  })
  const filteredRequests = data.filter((request) =>
    request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const neededHeaders = () => {
    return showemployeeDetails
      ? employeeAttendanceTableHeaders.filter(
          (header) => header.label !== "الموظف",
        )
      : employeeAttendanceTableHeaders
  }
  const neededData = () => {
    return showemployeeDetails
      ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filteredRequests.map(({ employeeName, ...rest }) => rest)
      : filteredRequests
  }
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div>
        <div className="bg-white rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
            <h2 className="text-foreground font-bold text-2xl">
              حضور الموظفين
            </h2>
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
            selectName="employee"
            filterHeader="فرز الطلبات"
            filterButton="بحث"
            Icon={SearchIcon}
            onApplyFilters={() => {
              if (form.select) {
                setShowEmployeeDetails(true)
              } else {
                setShowEmployeeDetails(false)
              }
            }}
            form={form}
            setForm={setForm}
          />
        </div>
        {showemployeeDetails && (
          <div className="flex gap-6 items-center bg-white rounded-lg my-4 p-4">
            <Image
              className="w-[90px] h-[90px] rounded-full border-2 border-cloudGray"
              width={80}
              height={80}
              src="/demo-img.png"
              alt="user"
            />
            <div className="space-y-2">
              <p className="font-bold text-xl text-[#007C9E]">
                عبدالله بن حسين جفري
              </p>
              <p className="font-medium">
                <span className="font-bold">الوظيفة</span> : قائد الانظمة
                الداخلية
              </p>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg">
          <Table
            columns={neededHeaders()}
            rows={neededData()}
            link={paths.vacationDetails.href}
            toggleId={false}
          />
        </div>
      </div>
    </>
  )
}
