"use client"

import { completionRequestAtom } from "@atoms"
import { ModalLink } from "@components/modals/ModalLink"
import {
  ArrowSquareIcon,
  CheckIcon,
  EyeIcon,
  FolderWithSearchIcon,
  PdfFileIcon,
  ProjectorIcon,
  RiyalCurrencyIcon,
  SandClock2Icon,
  TrashIcon,
  XMarkIcon,
} from "@icons"
import type { Row } from "@types"
import {
  Button,
  Checkbox,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui"
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"
import { ReactNode, useMemo, useState } from "react"
import { STATUS_CONFIG } from "./config"
import { getRowLink, isCurrencyField } from "./utils"

interface Column {
  label: string
}

interface TableProps {
  columns: Column[]
  rows: Row[]
  itemsPerPage?: number
  link?: string
  toggleId?: boolean
  toggleStatus?: boolean
  toggleDelete?: boolean
  showCheckBox?: boolean
  isAssignmentRequest?: boolean
  idTableHeader?: string
  tableClassName?: string
  onApprove?: (id: string) => void
  onReject?: (request: Row) => void
  onRemove?: (id: number) => void
}

export const renderStatusCell = (value: string) => {
  const config = STATUS_CONFIG[value as keyof typeof STATUS_CONFIG] || {
    label: value,
    icon: ProjectorIcon,
    className: "bg-primary-opacity text-primary",
  }

  const Icon = config.icon

  return (
    <div
      className={`flex items-center truncate gap-1 py-2 px-4 text-sm rounded-xl font-medium w-fit ${config.className}`}
    >
      {Icon && (
        <Icon
          className={
            value === "اعتمد" || value === "done" || value === "confirm"
              ? "fill-success-foreground"
              : value === "مرفوض" || value === "refuse"
                ? "fill-destructive-foreground"
                : "fill-primary"
          }
        />
      )}
      {config.label}
    </div>
  )
}

export const Table = ({
  columns,
  rows,
  itemsPerPage = 7,
  showCheckBox = false,
  link,
  idTableHeader = "رقم الطلب",
  toggleId = true,
  toggleStatus = false,
  toggleDelete = false,
  isAssignmentRequest = false,
  tableClassName = "h-[500px]",
  onApprove,
  onReject,
  onRemove,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectAll, setSelectAll] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [completionRequest] = useAtom(completionRequestAtom)

  // Use useMemo to avoid recalculating these values on every render
  const totalPages = useMemo(
    () => Math.ceil(rows.length / itemsPerPage),
    [rows.length, itemsPerPage],
  )

  const paginatedRequests = useMemo(() => {
    return rows.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    )
  }, [rows, currentPage, itemsPerPage])

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setSelectedRequests(selectAll ? [] : paginatedRequests.map((req) => req.id))
  }

  const handleSelectRequest = (id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectAll(false)
    setSelectedRequests([])
  }

  // Status cell renderer

  // Employee name cell renderer
  const renderEmployeeNameCell = (value: string) => (
    <div className="flex items-center gap-2">
      <Image
        className="w-10 h-10 rounded-full cursor-pointer"
        width={40}
        height={40}
        src="/demo-img.png"
        alt="profile-picture"
      />
      <p className="truncate">{value}</p>
    </div>
  )

  // Currency cell renderer
  const renderCurrencyCell = (
    value: string | number | ReactNode | null | undefined,
  ) => (
    <div className="flex items-center gap-3">
      <p className="truncate">{value}</p>
      {typeof value === "number" && <RiyalCurrencyIcon />}
    </div>
  )

  // Course name cell renderer
  const renderCourseNameCell = (value: string, row: Row) => (
    <Link href={getRowLink(link, row.id)}>
      <p className="text-primary">{value}</p>
    </Link>
  )

  // Batch number cell renderer
  const renderBatchNumberCell = (value: string, row: Row) => (
    <Link
      href={getRowLink(link, row.id)}
      className="flex items-center gap-2 bg-primary-opacity rounded-md w-fit p-2"
    >
      <p className="text-primary">{row.id}</p>
      <EyeIcon />
    </Link>
  )

  // Attachments cell renderer
  const renderAttachmentsCell = () => (
    <div className="bg-[#FFF4CF] p-3 rounded-md w-fit">
      <PdfFileIcon />
    </div>
  )

  // Achievement Certificate cell renderer
  const renderAchievementCertificateCell = () =>
    completionRequest ? (
      <div className="flex items-center gap-2 bg-primary-opacity rounded-md w-fit py-2 px-3">
        <SandClock2Icon />
        <p className="text-primary font-medium">تحت الإجراء</p>
      </div>
    ) : (
      <ModalLink
        name="AchievementCertificateModal"
        className="flex items-center gap-2 bg-primary-opacity rounded-md w-fit py-2 px-3"
      >
        <CheckIcon className="fill-primary" />
        <p className="text-primary font-medium">طلب إنجاز</p>
      </ModalLink>
    )

  // Recommendation cell renderer
  const renderRecommendationCell = (
    value: string | number | boolean | ReactNode | null | undefined,
  ) => {
    const stringValue =
      value !== undefined && value !== null ? String(value) : ""
    return (
      <div>
        {stringValue === "pass" && "اجتياز فترة التجربة"}
        {stringValue === "continue" && "تمديد فترة التجربة"}
        {stringValue === "fail" && "إنهاء خدمات الموظف"}
      </div>
    )
  }

  // RequestType cell renderer (employee-members-request)
  const renderRequestTypeCell = (value: string) => {
    return (
      <div>
        {value === "add" && "إضافة"}
        {value === "update" && "تحديث"}
        {value === "delete" && "حذف"}
      </div>
    )
  }

  // Relative_Relation cell renderer (employee-members-request)
  const renderRelativeRelationTypeCell = (value: string) => {
    return (
      <div>
        {value === "father" && "أب"}
        {value === "mother" && "أم"}
        {value === "son" && "إبن"}
        {value === "daughter" && "إبنة"}
        {value === "husband" && "زوج (ة)"}
      </div>
    )
  }

  // Cell content renderer based on key
  const renderCellContent = (
    key: string,
    value: string | number | boolean | ReactNode | null | undefined,
    row: Row,
  ) => {
    if (key === "status") return renderStatusCell(String(value))
    if (key === "recommendation") return renderRecommendationCell(value)
    if (key === "employeeName")
      return renderEmployeeNameCell(
        value !== undefined && value !== null ? String(value) : "",
      )
    if (isCurrencyField(key)) return renderCurrencyCell(value)
    if (key === "courseName")
      return renderCourseNameCell(
        value !== undefined && value !== null ? String(value) : "",
        row,
      )
    if (key === "batchNumber")
      return renderBatchNumberCell(
        value !== undefined && value !== null ? String(value) : "",
        row,
      )
    if (key === "attachments") return renderAttachmentsCell()
    if (key === "requestType")
      return renderRequestTypeCell(
        value !== undefined && value !== null ? String(value) : "",
      )
    if (key === "relation")
      return renderRelativeRelationTypeCell(
        value !== undefined && value !== null ? String(value) : "",
      )
    if (key === "achievementCertificate")
      return renderAchievementCertificateCell()
    return value
  }

  return (
    <>
      <UITable className={tableClassName}>
        <TableHeader className="bg-cloudGray">
          <TableRow>
            {toggleId && (
              <TableHead className="text-right text-darkBlue text-base py-4">
                <div className="flex items-center gap-2 mr-2">
                  {showCheckBox && (
                    <Checkbox
                      className="rounded-none shadow-none"
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  )}
                  <span>{idTableHeader}</span>
                </div>
              </TableHead>
            )}

            {columns.map((col, index) => (
              <TableHead
                key={index}
                className="text-right text-darkBlue text-base px-4"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length +
                  (toggleId ? 1 : 0) +
                  (toggleStatus ? 1 : 0) +
                  (toggleDelete ? 1 : 0) +
                  (isAssignmentRequest ? 1 : 0)
                }
                className="text-center py-10"
              >
                <div className="flex flex-col items-center justify-center gap-6">
                  <FolderWithSearchIcon />
                  <p className="text-grey-400 text-xl font-medium">
                    لم يعثر على أي سجلات
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginatedRequests.map((request, index) => (
              <TableRow
                className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
                key={request.id}
              >
                {toggleId && (
                  <TableCell>
                    <div className="flex items-center gap-2 mr-2">
                      {showCheckBox && (
                        <Checkbox
                          className="rounded-none shadow-none"
                          checked={selectedRequests.includes(request.id)}
                          onCheckedChange={() =>
                            handleSelectRequest(request.id)
                          }
                        />
                      )}
                      <Link href={getRowLink(link, request.id)}>
                        <span
                          className={`${link ? "underline text-primary" : ""}`}
                        >
                          {request.id}
                        </span>
                      </Link>
                    </div>
                  </TableCell>
                )}

                {Object.entries(request)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <TableCell key={key} className="py-3">
                      {renderCellContent(key, value, request)}
                    </TableCell>
                  ))}

                {!request.status && toggleStatus && (
                  <TableCell className="flex items-center gap-3">
                    <Button
                      onClick={() => onApprove && onApprove(request.id)}
                      className="flex group gap-1 items-center shadow-none hover:bg-green-600 hover:text-white justify-end text-success-foreground bg-success rounded-xl px-4 py-2.5"
                    >
                      <CheckIcon className="fill-success-foreground group-hover:fill-white" />
                      اعتمد
                    </Button>

                    <Button
                      onClick={() => onReject && onReject(request)}
                      className="flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5"
                    >
                      <XMarkIcon className="fill-destructive-foreground group-hover:fill-white" />
                      مرفوض
                    </Button>
                  </TableCell>
                )}

                {toggleDelete && (
                  <TableCell className="flex items-center gap-3">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        if (onRemove) {
                          onRemove(Number(request.id))
                        }
                      }}
                      className="flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5"
                    >
                      <TrashIcon className="fill-destructive-foreground group-hover:fill-white" />
                      حذف
                    </Button>
                  </TableCell>
                )}

                {isAssignmentRequest && (
                  <TableCell className="flex items-center gap-3">
                    <Link href={""}>
                      <Button className="flex group gap-2 items-center shadow-none hover:bg-primary-opacity hover:text-primary justify-end text-white bg-primary rounded-xl px-4 py-2.5">
                        <ArrowSquareIcon className="fill-white group-hover:fill-primary" />
                        إنشاء طلب انتداب
                      </Button>
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </UITable>

      <div className="">
        {rows.length > 0 ? (
          <div className="flex justify-between items-center mt-4 p-4">
            <p className="text-[#78787A] text-sm font-light">
              إظهار {Math.min(currentPage * itemsPerPage, rows.length)} من أصل{" "}
              {rows.length} طلب
            </p>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </>
  )
}
