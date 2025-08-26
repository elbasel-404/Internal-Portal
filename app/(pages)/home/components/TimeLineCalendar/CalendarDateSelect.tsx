import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerProps {
  year: number
  setYear: (year: number) => void
  month: number
  setMonth: (month: number) => void
}

const today = new Date()
const todayYear = today.getFullYear()
const defaultYears = Array.from({ length: 101 }, (_, i) => todayYear - 50 + i)
const defaultMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]

export const CalendarDateSelect = ({
  year,
  setYear,
  month,
  setMonth,
}: DatePickerProps) => {
  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }
  return (
    <div className="flex lg:justify-end lg:items-end gap-2">
      <Button
        variant="default"
        onClick={goToPreviousMonth}
        className="bg-cloudGray shadow-none text-strom-gray hover:bg-primary hover:text-white rounded-md p-1.5 py-[26px]"
      >
        <ChevronRight />
      </Button>
      <Select
        dir="rtl"
        value={defaultMonths[month]}
        onValueChange={(value) => {
          const monthIndex = defaultMonths.indexOf(value)
          setMonth(monthIndex)
        }}
      >
        <SelectTrigger className="w-24 py-[26px] bg-cloudGray border-none shadow-none font-medium">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent className="text-right font-medium">
          {defaultMonths.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        dir="rtl"
        value={year.toString()}
        onValueChange={(value) => {
          const parsedYear = parseInt(value, 10)
          setYear(parsedYear)
        }}
      >
        <SelectTrigger className="w-24 py-[26px] bg-cloudGray border-none shadow-none font-medium">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent className="text-right font-medium">
          {defaultYears.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="default"
        onClick={goToNextMonth}
        className="bg-cloudGray shadow-none text-strom-gray hover:bg-primary hover:text-white rounded-md p-1.5 py-[26px]"
      >
        <ChevronLeft />
      </Button>
    </div>
  )
}
