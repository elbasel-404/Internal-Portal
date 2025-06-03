import { ModalName } from "@types"
import Link from "next/link"
import type { ReactNode } from "react"

interface ModalLinkProps {
  children: ReactNode
  name: ModalName
  className?: string
}

export const ModalLink = ({ children, name, className }: ModalLinkProps) => {
  return (
    <Link className={className} href={`/modal/${name}`}>
      {children}
    </Link>
  )
}
