import { Textarea } from "@ui"
import { ChangeEvent } from "react"

interface TextareaFFieldProps {
  label: string
  name: string
  placeholder?: string
  required: boolean
  value?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextareaField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required,
}: TextareaFFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-foreground">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Textarea
        className="text-right resize-none w-full shadow-none text-black placeholder:text-secondary-foreground rounded-sm bg-cloudGray border-b-2 border-b-[#BCCADC] hover:bg-primary-opacity hover:border-b-primary"
        rows={3}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
