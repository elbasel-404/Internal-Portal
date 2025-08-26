"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface RequestsLayoutProps {
  children: ReactNode
}

const RequestsLayout = ({ children }: RequestsLayoutProps) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const isMyRequests = tab === "my-requests"
  const isMyApprovals = tab === "my-approvals"

  return (
    <>
      <div className="flex gap-2 py-4 text-lg">
        <Link className={twMerge("block cursor-pointer", isMyRequests && "font-bold border-b border-blue-500")} scroll={false} href="/home?tab=my-requests">
          طلباتي
        </Link>
        <Link className={twMerge("block cursor-pointer", isMyApprovals && "font-bold border-b border-blue-500")} scroll={false} href="/home?tab=my-approvals">
          طلبات الموافقة
        </Link>
      </div>
      {children}
    </>
  )
}

export default RequestsLayout
