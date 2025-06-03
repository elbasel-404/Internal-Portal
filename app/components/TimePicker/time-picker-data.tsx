"use client"

import { Label } from "@ui"
import { Clock } from "lucide-react"
import * as React from "react"
import { TimePickerInput } from "./time-picker-input"

interface TimePickerDataProps {
  date: Date | undefined
  setDateAction: (date: Date | undefined) => void
}

// ! TODO:
/*
 * Props must be serializable for components in the "use client" entry file.
 * "setDate" is a function that's not a Server Action.
 * Rename "setDate" either to "action" or have its name end with "Action"
 * e.g. "setDateAction" to indicate it is a Server Action.
 * ts(71007)
 */

export function TimePickerData({ date, setDateAction }: TimePickerDataProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          الساعات
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDateAction}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          الدقائق
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDateAction}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  )
}
