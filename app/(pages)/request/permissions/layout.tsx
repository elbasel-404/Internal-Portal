import { ReactNode } from "react"

export const metadata = {
  title: "Permissions",
  description: "Permissions data",
}
interface PermissionssLayoutProps {
  children: ReactNode
}
const PermissionLayout = ({ children }: PermissionssLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default PermissionLayout
