import { Select } from "@components"
import { FilterIcon } from "@icons"
import { Button, DatePicker } from "@ui"
import { cn } from "@utils"
import type { Dispatch, ElementType, SetStateAction } from "react"

interface FilterSectionProps {
  options: { id: string; name?: string }[]
  selectLabel?: string
  selectPlaceholder?: string
  selectName?: string
  filterHeader?: string
  filterButton?: string
  isRequestDate?: boolean
  Icon?: ElementType
  onApplyFilters?: () => void
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
function toLocalDateString(date: Date) {
  // بيضبط التاريخ حسب timezone المحلي
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().split("T")[0] // بيرجع yyyy-mm-dd
}
export const FilterSection = ({
  options,
  selectLabel = "نوع الطلب",
  selectPlaceholder = "حدد الطلب",
  selectName = "type",
  filterHeader = "الفلتر",
  filterButton = "إظهار النتائج",
  Icon = FilterIcon,
  isRequestDate = false,
  onApplyFilters,
  form,
  setForm,
  loading,
}: FilterSectionProps) => {
  const disabled = loading
    ? "opacity-50 pointer-events-none"
    : "opacity-100 pointer-events-auto"
  const RequestDate = isRequestDate ? "md:grid-cols-3" : "md:grid-cols-4"
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-stormGray text-xl">{filterHeader}</h2>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-4",
          disabled,
          RequestDate,
        )}
      >
        {isRequestDate ? (
          <DatePicker label="تاريخ الطلب" />
        ) : (
          <>
            <DatePicker
              name="start"
              value={form?.start ? new Date(form.start) : undefined}
              onChange={(value) => {
                if (setForm) {
                  setForm((prev) => ({
                    ...prev,
                    start: value ? toLocalDateString(value) : "",
                  }))
                }
              }}
              label="التاريخ من*"
            />
            <DatePicker
              name="end"
              value={form?.end ? new Date(form.end) : undefined}
              onChange={(value) => {
                if (setForm) {
                  setForm((prev) => ({
                    ...prev,
                    end: value ? toLocalDateString(value) : "",
                  }))
                }
              }}
              label="التاريخ إلى*"
            />
          </>
        )}

        <Select
          name={selectName}
          value={form?.select}
          onChange={(value) => {
            if (setForm) {
              setForm((prev) => ({ ...prev, select: value }))
            }
          }}
          options={options}
          label={selectLabel}
          placeholder={selectPlaceholder}
        />

        {/* Submit Button */}
        <div className="flex items-end">
          <Button
            className="w-full bg-primary text-white rounded-lg px-4 py-6 hover:bg-primary shadow-none"
            onClick={onApplyFilters}
          >
            <Icon className="fill-white" />
            {filterButton}
          </Button>
        </div>
      </div>
    </div>
  )
}
