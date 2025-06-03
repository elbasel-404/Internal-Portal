import { DatePicker } from "@ui"

interface DateFieldProps {
  name: string
  label: string
  subLabel?: string
  dateInputClassName?: string
  required: boolean
  date?: Date | undefined
  onChange?: (date: Date | undefined | null) => void
}

export const DateField = ({
  name,
  date,
  onChange,
  label,
  subLabel,
  required,
  dateInputClassName,
}: DateFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <label className="font-medium text-foreground">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-grey-400 text-sm">{subLabel}</p>
      </div>
      <DatePicker
        label=""
        name={name}
        value={date}
        onChange={onChange}
        className={dateInputClassName}
      />
    </div>
  )
}
