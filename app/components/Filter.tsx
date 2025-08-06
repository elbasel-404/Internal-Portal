import { Select } from "@components"
import { FilterIcon } from "@icons"
import { Button, DatePicker } from "@ui"
import { ElementType } from "react"

interface FilterSectionProps {
  // ! TODO: Unify types
  // options:
  //   | ApprovalRequest[]
  //   | RemoteWorkRequest[]
  //   | HrLetterRequest[]
  //   | AttendanceListRequest[];
  options: { id: string; name?: string }[]
  selectLabel?: string
  selectPlaceholder?: string
  filterHeader?: string
  filterButton?: string
  isRequestDate?: boolean
  Icon?: ElementType
  onApplyFilters?: () => void
  form?: {
    start: string
    end: string
    month: string
  }
  setForm?: React.Dispatch<
    React.SetStateAction<{
      start: string
      end: string
      month: string
    }>
  >
}

export const FilterSection = ({
  options,
  selectLabel = "نوع الطلب",
  selectPlaceholder = "حدد الطلب",
  filterHeader = "الفلتر",
  filterButton = "إظهار النتائج",
  Icon = FilterIcon,
  isRequestDate = false,
  onApplyFilters,
  form,
  setForm,
}: FilterSectionProps) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-stormGray text-xl">{filterHeader}</h2>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isRequestDate ? "md:grid-cols-3" : "md:grid-cols-4"
        } gap-4`}
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
                    start: value ? new Date(value).toISOString() : "",
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
                    end: value ? new Date(value).toISOString() : "",
                  }))
                }
              }}
              label="التاريخ إلى*"
            />
          </>
        )}

        <Select
          name="month"
          value={form?.month}
          onChange={(value) => {
            if (setForm) {
              setForm((prev) => ({ ...prev, month: value }))
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
