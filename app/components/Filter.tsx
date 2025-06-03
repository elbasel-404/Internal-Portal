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
  options: { id: string; description?: string }[]
  selectLabel?: string
  selectPlaceholder?: string
  filterHeader?: string
  filterButton?: string
  isRequestDate?: boolean
  Icon?: ElementType
  onApplyFilters?: () => void
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
            <DatePicker label="التاريخ من*" />
            <DatePicker label="التاريخ إلى*" />
          </>
        )}

        <Select
          // TODO: Refactor this
          name=""
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
