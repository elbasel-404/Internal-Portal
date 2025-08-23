"use client"

import { FilterSection, Table } from "@components"
import { PrinterIcon } from "@icons"
import { paths } from "@lib"
import type { AttendanceListRequest } from "@types"
import { tableHeaders } from "./config"
import { Loader } from "@components"
import type { Dispatch, SetStateAction } from "react"

interface AttendanceListRequestProps {
  data: AttendanceListRequest[]
  form?: {
    start: string
    end: string
    select: string
  }
  setForm?: Dispatch<
    SetStateAction<{
      start: string
      end: string
      select: string
    }>
  >
  loading?: boolean
}

export const defaultMonths = [
  { id: "01", name: "يناير" },
  { id: "02", name: "فبراير" },
  { id: "03", name: "مارس" },
  { id: "04", name: "أبريل" },
  { id: "05", name: "مايو" },
  { id: "06", name: "يونيو" },
  { id: "07", name: "يوليو" },
  { id: "08", name: "أغسطس" },
  { id: "09", name: "سبتمبر" },
  { id: "10", name: "أكتوبر" },
  { id: "11", name: "نوفمبر" },
  { id: "12", name: "ديسمبر" },
]

export const AttendanceTable = ({
  data,
  form,
  setForm,
  loading,
}: AttendanceListRequestProps) => {
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">
            قائمة الحضور و الإنصراف
          </h2>
        </div>

        <FilterSection
          options={defaultMonths}
          selectLabel="الشهر"
          selectPlaceholder="حدد الشهر"
          selectName="month"
          filterHeader="فرز الطلبات"
          filterButton="طباعة تقارير الحضور و الإنصراف"
          Icon={PrinterIcon}
          onApplyFilters={() => {}}
          form={form}
          setForm={setForm}
          loading={loading}
        />
        {loading ? (
          <Loader />
        ) : (
          <Table
            columns={tableHeaders}
            rows={data}
            link={paths.vacationDetails.href}
            toggleId={false}
          />
        )}
      </div>
    </>
  )
}
