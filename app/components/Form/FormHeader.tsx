import { ArrowLeftIcon } from "@icons"
import Link from "next/link"

interface FormHeaderProps {
  label: string
  path: string
}

export const FormHeader = ({ label, path }: FormHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-[#ECF0F480] p-4">
      <h1 className="text-2xl font-bold text-foreground">{label}</h1>
      <Link
        href={path}
        className="text-primary bg-primary-opacity font-semibold rounded-full shadow-none hover:bg-primary hover:text-white px-4 py-2 group"
      >
        <span className="flex gap-2 items-center">
          رجوع
          <ArrowLeftIcon
            width={15}
            height={15}
            className="fill-primary group-hover:fill-white"
          />
        </span>
      </Link>
    </div>
  )
}
