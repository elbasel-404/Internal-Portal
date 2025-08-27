"use client"

import { CheckIcon, FilterIcon, SearchIcon } from "@icons"
import { Button, Input } from "@ui"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, type ChangeEvent, type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface RequestsLayoutProps {
  children: ReactNode
}

const RequestsLayout = ({ children }: RequestsLayoutProps) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const isMyRequests = tab === "my-requests"
  const isMyApprovals = tab === "my-approvals"

  const [searchTerm, setSearchTerm] = useState("")
  const [, setIsFilterVisible] = useState(false)

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] px-4 pt-4 pb-2 md:pb-0">
        <div className="flex gap-4 text-lg  pt-2">
          <Link
            className={twMerge(
              "cursor-pointer p-4 bg-lightGray font-medium h-fit rounded-tl-lg rounded-tr-lg border-b-2 border-[#A6B4BE] hover:border-primary",
              isMyApprovals && "font-semibold",
            )}
            scroll={false}
            href="/home?tab=my-approvals"
          >
            طلبات الموافقة
          </Link>
          <Link
            className={twMerge(
              "cursor-pointer p-4 bg-lightGray font-medium h-fit rounded-tl-lg rounded-tr-lg border-b-2 border-[#A6B4BE] hover:border-primary",
              isMyRequests && "font-semibold",
            )}
            scroll={false}
            href="/home?tab=my-requests"
          >
            طلباتي
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="البحث في المعاملات"
            icon={<SearchIcon />}
            className="text-sm text-darkBlue bg-cloudGray pr-10 rounded-full shadow-none border-none"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button
            onClick={toggleFilter}
            className="bg-cloudGray p-2.5 rounded-full shadow-none hover:bg-cloudGray"
          >
            <FilterIcon className="fill-primary" />
          </Button>
          {isMyApprovals && (
            <Button className="flex group items-center gap-3 bg-primary-opacity bg-opacity-15 text-primary px-4 py-2.5 rounded-full hover:bg-primary hover:text-white">
              <CheckIcon className="fill-primary group-hover:fill-white" />
              قبول الكل
            </Button>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export default RequestsLayout
