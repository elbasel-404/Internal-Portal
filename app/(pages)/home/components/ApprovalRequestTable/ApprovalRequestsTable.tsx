"use client"

import { FilterSection, RejectReasonDialog, Table } from "@components"
import { CheckIcon, FilterIcon, SearchIcon } from "@icons"
import type { ApprovalRequest, Row } from "@types"
import { Button, Input, Tabs } from "@ui"
import { useState, type ChangeEvent } from "react"

const tabs = [
  { name: "طلبات الموافقة", filter: "approvalRequests" },
  { name: "طلباتي", filter: "myRequests" },
]

const tableHeaders = [
  { label: "المسمى" },
  { label: "تاريخ الطلب" },
  { label: "الحالة" },
]

interface ApprovalRequestsTableProps {
  requests: ApprovalRequest[]
}

export const ApprovalRequestsTable = ({
  requests,
}: ApprovalRequestsTableProps) => {
  // Ensure all requests have a description
  const validRequests = requests.map((request) => ({
    ...request,
    description: request.description || "",
  }))
  const [activeTab, setActiveTab] = useState<string>("approvalRequests")
  const [, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentRequest, setCurrentRequest] = useState<Row | null>(null)

  const handleReject = (request: Row) => {
    setCurrentRequest(request)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setCurrentRequest(null)
  }

  const handleDialogSubmit = (/* reason: string */) => {
    // Removed unused parameter 'reason'
    // TODO: Implement approval request dialog submission
    if (currentRequest) {
      // TODO: Add implementation here when ready
    }
  }

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev)
  }

  const filteredRequests = validRequests.filter((request) =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim())
    setCurrentPage(1)
  }

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] px-4 pt-4 pb-2 md:pb-0">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabClassName="p-4 bg-lightGray h-[68px] rounded-tl-lg rounded-tr-lg border-b-2 border-[#A6B4BE] hover:border-primary"
            activeTabClassName="font-semibold"
            tabSectionClassName="gap-4"
          />
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
            <Button className="flex group items-center gap-3 bg-primary-opacity bg-opacity-15 text-primary px-4 py-2.5 rounded-full hover:bg-primary hover:text-white">
              <CheckIcon className="fill-primary group-hover:fill-white" />
              قبول الكل
            </Button>
          </div>
        </div>

        {isFilterVisible && (
          <FilterSection options={requests} onApplyFilters={() => {}} />
        )}

        {activeTab === "approvalRequests" ? (
          <Table
            columns={tableHeaders}
            rows={filteredRequests}
            showCheckBox={true}
            toggleStatus={true}
            onReject={(request) => handleReject(request)}
          />
        ) : (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-2xl font-medium">لا توجد طلبات حالياً</p>
          </div>
        )}
      </div>
      {currentRequest && (
        <RejectReasonDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
          requestTitle={currentRequest.description}
          requestDate={currentRequest.date}
          requestId={currentRequest.id}
        />
      )}
    </>
  )
}
// ? Look into sorting
// TODO: Make this a server component and move state to another child client component
