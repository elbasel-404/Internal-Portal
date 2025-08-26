"use client"

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from "@ui"

interface SelectProps<T extends Record<string, string | number>> {
  name: string
  options: T[]
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  valueKey?: string
  labelKey?: string
  className?: string
}

export const Select = <T extends Record<string, string | number>>({
  options,
  label,
  placeholder,
  value,
  onChange,
  name,
  valueKey = "id",
  labelKey = "name",
  className,
}: SelectProps<T>) => {
  return (
    <UISelect dir="rtl" value={value} onValueChange={onChange}>
      <input
        title={placeholder}
        type="text"
        value={value}
        name={name}
        className="hidden"
        readOnly
      />
      <SelectGroup className="space-y-1">
        <SelectLabel className="text-foreground font-medium text-sm p-0">
          {label}
        </SelectLabel>
        <SelectTrigger
          className={`w-full shadow-none text-black data-[placeholder]:text-black font-medium rounded-sm py-6 bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="text-right font-medium">
          {options.map((option) => (
            <SelectItem
              key={option[valueKey]}
              value={option[valueKey].toString()}
            >
              {option[labelKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </UISelect>
  )
}
