"use client"

import { Table } from "@components"
import { SelectField } from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon } from "@icons"

const tableHeaders = [
  { label: "الهدف الفردي" },
  { label: "مؤشر الأداء" },
  { label: "وزن المؤشر" },
  { label: "خطوات الإنجاز" },
  { label: "مقياس المؤشر" },
  { label: "نوع المستهدف" },
  { label: "المستهدف (رقم - تاريخ)" },
  { label: "وزن الهدف ٪" },
]

const YearsList = Array.from({ length: 51 }, (_, i) => {
  const currentYear = new Date().getFullYear()
  const year = currentYear + i
  return { id: year, name: year.toString() }
})

export const EvaluationGoalsForm = () => {
  return (
    <form className="bg-white rounded-md">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
        <h2 className="text-foreground font-bold text-2xl">الأهداف</h2>
        <ModalLink
          name="GoalsModal"
          className="flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
        >
          <CirclePlusIcon className="fill-white group-hover:fill-primary" />
          إضافة هدف جديد
        </ModalLink>
      </div>
      <div className="p-4">
        <SelectField
          label="السنة"
          name="year"
          placeholder="--"
          types={YearsList}
          required
        />
      </div>

      <Table
        columns={tableHeaders}
        rows={[]}
        toggleId={false}
        tableClassName="h-fit"
      />

      <div className="border-t border-[#ECF0F480]"></div>

      <div className="p-4">
        <div className="flex items-center gap-4">
          <p className="text-foreground font-medium">0%</p>
          <div className="w-full rounded-full bg-cloudGray h-3">
            <div
              className="bg-[#00A65A] h-3 transition-all duration-300"
              style={{ width: `0%` }}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
