"use client"

import { FolderWithSearchIcon } from "@icons"
import type { RequestType } from "@types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState, useTransition } from "react"
import { twMerge } from "tailwind-merge"
import { Buttons } from "./Buttons"
import { CheckBox } from "./CheckBox"

interface MyRequestsProps {
  requests: RequestType[]
}

const PAGE_SIZE = 10

export const MyApprovals = ({ requests }: MyRequestsProps) => {
  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const totalPages = Math.max(1, Math.ceil(requests.length / PAGE_SIZE))

  const pagedRequests = useMemo(
    () =>
      requests.slice(
        (page - 1) * PAGE_SIZE,
        (page - 1) * PAGE_SIZE + PAGE_SIZE,
      ),
    [requests, page],
  )

  const handleAllCheck = () => {
    const labels = document.querySelectorAll(
      ".approval-request-label",
    ) as NodeListOf<HTMLLabelElement>
    labels.forEach((label) => label.click())
    const event = new Event("click", { bubbles: false })
    labels.forEach((label) => label.dispatchEvent(event))
  }

  const goToPage = (p: number) => {
    startTransition(() => {
      setTimeout(() => {
        const selectAllLabel =
          document.querySelector<HTMLLabelElement>(".label-select-all")
        const labelDataSet = selectAllLabel?.dataset
        const isChecked = labelDataSet?.isChecked === "true"
        if (isChecked) {
          selectAllLabel?.click()
        }
      }, 500)
    })
    if (p < 1 || p > totalPages) return
    setPage(p)
  }

  const pageButtons = (() => {
    const pages: number[] = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + 4)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  })()

  return (
    <div className="space-y-4 bg-white">
      {/* Table Container with UI Table styling */}
      <div className="min-h-[400px] w-full overflow-auto border">
        <table className="w-full caption-bottom text-sm">
          {/* Header with same styling as UI Table */}
          <thead className="bg-cloudGray">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-right align-start font-medium text-darkBlue text-base [&:has([role=checkbox])]:pr-0">
                <div
                  className="flex items-center gap-2 mr-2"
                  onClick={handleAllCheck}
                >
                  <CheckBox name="selectAll" id="select-all" />
                  <span>رقم الطلب</span>
                </div>
              </th>
              <th className="h-12 px-4 text-right align-start font-medium text-darkBlue text-base [&:has([role=checkbox])]:pr-0">
                المسمى
              </th>
              <th className="h-12 px-4 text-right align-start font-medium text-darkBlue text-base [&:has([role=checkbox])]:pr-0">
                تاريخ الطلب
              </th>
              <th className="h-12 px-4 text-right align-start font-medium text-darkBlue text-base [&:has([role=checkbox])]:pr-0">
                الحالة
              </th>
            </tr>
          </thead>

          <tbody className="[&_tr:last-child]:border-0">
            {requests.length === 0 ? (
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td
                  colSpan={4}
                  className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center py-10"
                >
                  <div className="flex flex-col items-center justify-center gap-6">
                    <FolderWithSearchIcon />
                    <p className="text-grey-400 text-xl font-medium">
                      لم يعثر على أي سجلات
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              pagedRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className={twMerge(
                    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                    index % 2 !== 0 ? "bg-cloudGray" : "bg-white",
                  )}
                >
                  <td className="p-4 [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2 mr-2">
                      <CheckBox
                        name={`select-${request.id}`}
                        id={`select-${request.id}`}
                      />
                      <span className="text-foreground">{request.id}</span>
                    </div>
                  </td>
                  <td className="p-4 [&:has([role=checkbox])]:pr-0 py-3">
                    {request.description}
                  </td>
                  <td className="p-4 [&:has([role=checkbox])]:pr-0 py-3">
                    {request.date}
                  </td>
                  <td className="p-4 [&:has([role=checkbox])]:pr-0 py-3">
                    <Buttons requestId={request.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="">
        {requests.length > 0 ? (
          <div className="flex justify-between items-center mt-4 p-4">
            <p className="text-[#78787A] text-sm font-light">
              إظهار {Math.min(page * PAGE_SIZE, requests.length)} من أصل{" "}
              {requests.length} طلب
            </p>
            {totalPages > 1 && (
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="bg-white shadow-none text-strom-gray hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded"
                >
                  <ChevronRight size={16} />
                </button>

                {pageButtons[0] > 1 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="bg-white shadow-none px-3 rounded-none text-strom-gray hover:bg-[#F6F8FA]"
                    >
                      1
                    </button>
                    {pageButtons[0] > 2 && (
                      <span className="flex items-center px-3 text-gray-500">
                        ...
                      </span>
                    )}
                  </>
                )}

                {pageButtons.map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`bg-white shadow-none px-3 rounded-none text-strom-gray hover:bg-[#F6F8FA] ${
                      page === p ? "bg-[#F6F8FA] text-[#007C9E]" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {pageButtons[pageButtons.length - 1] < totalPages && (
                  <>
                    {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
                      <span className="flex items-center px-3 text-gray-500">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="bg-white shadow-none px-3 rounded-none text-strom-gray hover:bg-[#F6F8FA]"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="bg-white shadow-none text-strom-gray hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </div>
  )
}
