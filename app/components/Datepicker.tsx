"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

import { cn } from "@utils"
import { Button } from "@ui"
import { Calendar } from "@ui"
import { Popover, PopoverContent, PopoverTrigger } from "@ui"

export const DatePicker = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "rounded-full shadow-none border-0 bg-[#EEF2F6]",
            !date && "text-muted-foreground",
          )}
        >
          {date ? (
            format(date, "MMMM yyyy", { locale: ar })
          ) : (
            <span>اختر تاريخًا</span>
          )}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ar}
        />
      </PopoverContent>
    </Popover>
  )
}
