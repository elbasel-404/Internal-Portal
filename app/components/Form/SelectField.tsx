"use client"

import { Select } from "@components";
import { cn } from "@utils";

interface SelectProps {
  types: { id: number | string; name: string; display_name?: string }[]
  label: string
  name: string
  placeholder?: string
  className?: string
  required?: boolean
  value?: string
  labelStyle?: string
  labelKey?: string
  valueKey?: string
  onChange?: (value: string) => void
}

export const SelectField = ({
  types,
  label,
  name,
  placeholder = "اختر النوع",
  required = false,
  className,
  value,
  labelStyle,
  valueKey = "id",
  labelKey = "name",
  onChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className={cn("font-medium text-foreground", labelStyle)}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        name={name}
        options={types}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        labelKey={labelKey}
        valueKey={valueKey}
      />
    </div>
  )
}
