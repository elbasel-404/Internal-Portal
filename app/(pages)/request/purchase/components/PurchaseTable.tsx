"use client"

import { Table } from "@components"
import { CirclePlusIcon, SearchIcon } from "@icons"
import { Input, Tabs } from "@ui"
import { ChangeEvent, useState } from "react"

import { paths } from "@lib"
import { PurchaseRequest } from "@types"
import Link from "next/link"

interface PurchaseProps {
  data: PurchaseRequest[]
}

const tableHeaders = [
  { label: "تاريخ الطلب" },
  { label: "الوصف" },
  { label: "التكاليف (التكلفة الاجمالية للمشروع)" },
  { label: "آلية الطرح" },
  { label: "الحالة" },
]

const tabs = [
  { name: "طلب شراء", filter: "purchaseRequest" },
  { name: "أمر عمل منبثق من اتفاقية اطارية", filter: "workOrder" },
]

export const PurchaseTable = ({ data }: PurchaseProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<string>("purchaseRequest")
  //   const [isFilterVisible, setIsFilterVisible] = useState(false);

  //   const toggleFilter = () => {
  //     setIsFilterVisible((prev) => !prev);
  //   };

  if (!data) return

  //   const filteredRequests = data.filter((request) =>
  //     request.id.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
    setCurrentPage(1)
  }

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
          <h2 className="text-foreground font-bold text-2xl">الطلبات</h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="البحث في الطلبات"
              icon={<SearchIcon />}
              className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabClassName="p-4 bg-lightGray h-[68px] rounded-tl-lg rounded-tr-lg border-b-2 border-[#A6B4BE] hover:border-primary font-medium"
            activeTabClassName="font-medium text-primary bg-primary-opacity border-primary"
            tabSectionClassName="gap-4"
          />
          <Link
            href={paths.purchaseNew.href}
            className="flex group font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            أضف جديد
          </Link>
        </div>

        {/* {isFilterVisible && (
          <FilterSection options={data} onApplyFilters={() => {}} />
        )} */}

        <Table
          columns={tableHeaders}
          rows={data}
          link={paths.purchaseDetails.href}
        />
      </div>
    </>
  )
}
