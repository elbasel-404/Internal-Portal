import { TelescopeIcon } from "@icons"

interface GoalsFormHeaderProps {
  title: string
}

export const GoalsFormHeader = ({ title }: GoalsFormHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-cloudGray">
      <TelescopeIcon width={24} height={24} fill="#11274A" />
      <p className="text-lg font-bold text-foreground">{title}</p>
    </div>
  )
}
