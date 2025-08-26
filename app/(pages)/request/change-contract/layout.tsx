import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Change Contract",
  description: "Change Contract Data",
}
interface ChangeContractLayoutProps {
  children: ReactNode
}
const ChangeContractLayout = ({ children }: ChangeContractLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="change_contract" />
      <section>{children}</section>
    </>
  )
}

export default ChangeContractLayout
