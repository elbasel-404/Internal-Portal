import type { ReactNode } from "react"

interface UserInfoCardProps {
  title: string
  icon: ReactNode
  content: ReactNode
}
export const UserInfoCard = ({ title, icon, content }: UserInfoCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-cloudGray rounded-lg px-6 py-4 flex-1">
      <div>{icon}</div>
      <div>
        <h2 className="text-stormGray text-lg">{title}</h2>
        <p className="text-lg font-medium">{content}</p>
      </div>
    </div>
  )
}
