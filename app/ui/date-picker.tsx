"use client"

import { CalendarIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@ui"
import { cn, formatDate } from "@utils"

interface DatePickerProps {
  label: string
  value?: Date
  name?: string
  className?: string
  onChange?: (date: Date | undefined | null) => void
}

export function DatePicker({
  label,
  name,
  className,
  value,
  onChange,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value)
  const [isHovering, setIsHovering] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    setDate(value)
  }, [value])

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (onChange) {
      onChange(selectedDate)
    }
    setIsPopoverOpen(false)
  }

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDateChange(undefined)
  }

  return (
    <div dir="rtl" className="space-y-1">
      {label && (
        <h4 className="text-foreground font-medium text-sm">{label}</h4>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div>
            <input
              type="text"
              value={value ? formatDate(value) : ""}
              name={name}
              className="hidden"
              readOnly
            />
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                `w-full shadow-none justify-between text-right font-medium rounded-sm py-6 bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary ${className}`,
                !date && "text-black",
              )}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {date ? formatDate(date) : <span>حدد التاريخ</span>}
              {date && isHovering ? (
                <XIcon
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={handleClearDate}
                />
              ) : (
                <CalendarIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
