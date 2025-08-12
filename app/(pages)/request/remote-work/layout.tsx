import { ReactNode } from "react"

export const metadata = {
  title: "Remote Work",
  description: "Remote work data",
}
interface VacationsLayoutProps {
  children: ReactNode
}
const RemoteWorksLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default RemoteWorksLayout
