"use client"

import { format } from "date-fns"
import { useState } from "react"
import { DayPicker, NavProps } from "react-day-picker"
import { ar } from "date-fns/locale"
import "react-day-picker/dist/style.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../ui/button"

const CalendarTestPage = () => {
  const [selected, setSelected] = useState<Date>()
  const [month, setMonth] = useState<Date>(new Date()) // Initialize with a default date to avoid undefined

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth)
  }

  const CustomNavbar = ({ onPreviousClick, onNextClick }: NavProps) => {
    const months = Array.from({ length: 12 }, (_, i) =>
      format(new Date(1, i), "MMMM", { locale: ar }),
    )
    const years = Array.from(
      { length: 101 },
      (_, i) => i + 1950, // Year range from 1950 to 2050
    )

    return (
      <div className="flex items-center justify-between ">
        <h3 className="text-2xl font-semibold text-foreground">
          الجدول الزمني
        </h3>
        <div className="flex justify-end items-end mb-4 px-4 mt-4 gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={onPreviousClick}
            className="bg-cloudGray shadow-none text-strom-gray hover:bg-primary hover:text-white rounded-lg p-1.5"
          >
            <ChevronRight />
          </Button>

          {/* Month Dropdown */}
          <select
            value={month?.getMonth() ?? new Date().getMonth()}
            onChange={(e) =>
              handleMonthChange(
                new Date(
                  month?.getFullYear() ?? new Date().getFullYear(),
                  parseInt(e.target.value),
                  1,
                ),
              )
            }
            className="text-xl font-bold bg-cloudGray text-strom-gray hover:bg-primary hover:text-white rounded-lg p-2"
          >
            {months.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={month?.getFullYear() ?? new Date().getFullYear()}
            onChange={(e: { target: { value: string } }) =>
              handleMonthChange(
                new Date(
                  parseInt(e.target.value),
                  month?.getMonth() ?? new Date().getMonth(),
                  1,
                ),
              )
            }
            className="text-xl font-bold bg-cloudGray text-strom-gray hover:bg-primary hover:text-white rounded-lg p-2"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Button
            variant="default"
            size="sm"
            onClick={onNextClick}
            className="bg-cloudGray shadow-none text-strom-gray hover:bg-primary hover:text-white rounded-lg p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center bg-white rounded-lg px-4 py-2.5">
      <DayPicker
        locale={ar}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={month}
        onMonthChange={handleMonthChange}
        startMonth={new Date(1950, 1)}
        endMonth={new Date(2050, 9)}
        components={{
          Nav: CustomNavbar,
        }}
        classNames={{
          months: "space-y-6",
          month_caption: "hidden",
          month_grid: "w-full",
          weekday: "text-center text-foreground text-sm border-b-2 pb-2",
          day: "h-20 w-40 text-center font-normal aria-selected:opacity-100",
          selected:
            "bg-primary-opacity text-primary hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
          today: "bg-gray-100 text-primary rounded-full",
          outside: "opacity-50",
          disabled: "opacity-50",
          hidden: "invisible",
          day_button: "px-4 py-2 rounded-full",
        }}
      />
    </div>
  )
}

export default CalendarTestPage
