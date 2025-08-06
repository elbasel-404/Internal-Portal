"use client"

import { Select } from "@components"

interface SelectProps {
  types: { id: number | string; name: string; display_name?: string }[]
  label: string
  name: string
  placeholder?: string
  className?: string
  required?: boolean
  value?: string
  labelStyle?: string
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
  onChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className={`font-medium text-foreground ${labelStyle}`}>
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
      />
    </div>
  )
}
