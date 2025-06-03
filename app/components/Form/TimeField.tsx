import { TimePicker } from "../TimePicker"

interface TimeFieldProps {
  name: string
  label: string
  required: boolean
  time: Date | undefined
  onChange: (date: Date | undefined) => void
}

export const TimeField = ({
  name,
  time,
  onChange,
  label,
  required,
}: TimeFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-foreground">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <TimePicker name={name} label="" date={time} setDateAction={onChange} />
    </div>
  )
}
