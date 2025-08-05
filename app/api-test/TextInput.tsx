import { InputHTMLAttributes } from "react"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const TextInput = ({ name, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row items-start md:items-start">
      <input
        dir="ltr"
        name={name}
        className="bg-neutral-900 w-full block px-4 py-2 rounded-xl text-lg focus:ring-1 ring-[#1e40af]"
        type="text"
        placeholder="apiKey"
        {...props}
      />
    </div>
  )
}
