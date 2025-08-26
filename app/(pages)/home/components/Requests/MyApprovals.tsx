"use client"

import { useState, useMemo, useTransition } from "react"
import type { RequestType } from "@types"
import { twMerge } from "tailwind-merge"
import { CheckBox } from "./CheckBox"
import { Buttons } from "./Buttons"

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
    <div className="space-y-3">
      <div className="flex flex-col">
        <div className="flex items-center p-2 bg-slate-200">
          <div onClick={handleAllCheck}>
            <CheckBox name="selectAll" id="select-all" />
          </div>
          <h2 className="flex-1 text-center">رقم الطلب</h2>
          <h2 className="flex-1 text-center">المسمى</h2>
          <h2 className="flex-1 text-center">تاريخ الطلب</h2>
          <h2 className="flex-1 text-center">الحالة</h2>
        </div>
        {pagedRequests.map((request, index) => (
          <div
            key={request.id}
            className={twMerge(
              "flex items-center p-2",
              index % 2 !== 0 && "bg-slate-200",
            )}
          >
            <CheckBox
              name={`select-${request.id}`}
              id={`select-${request.id}`}
            />
            <p className="flex-1 text-center">{request.id}</p>
            <p className="flex-1 text-center">{request.description}</p>
            <p className="flex-1 text-center">{request.date}</p>
            <Buttons requestId={request.id} />
          </div>
        ))}
        {pagedRequests.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            لا توجد طلبات
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 select-none">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          السابق
        </button>
        {pageButtons[0] > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 rounded border"
            >
              1
            </button>
            {pageButtons[0] > 2 && <span className="px-1">...</span>}
          </>
        )}
        {pageButtons.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={twMerge(
              "px-3 py-1 rounded border",
              p === page && "bg-slate-800 text-white",
            )}
          >
            {p}
          </button>
        ))}
        {pageButtons[pageButtons.length - 1] < totalPages && (
          <>
            {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
              <span className="px-1">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 rounded border"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          التالي
        </button>
      </div>
      <div className="text-center text-xs text-gray-500">
        الصفحة {page} من {totalPages} (عدد {requests.length})
      </div>
    </div>
  )
}
