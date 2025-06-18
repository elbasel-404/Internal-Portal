"use client"

import React, { useState, useMemo, type ChangeEvent } from "react"
import { FilterSection } from "@components"
import { Input } from "@ui"
import {
  Table as UITable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Pagination,
} from "@ui"
import { FilterIcon, SearchIcon, FolderWithSearchIcon } from "@icons"
import type { TransactionRequest } from "@types"
import { paths } from "@lib"

const requests = [
  { id: "1", description: "العمل عن بعد" },
  { id: "2", description: "خطابات الموارد البشرية" },
  { id: "3", description: "الإجازات" },
  { id: "4", description: "الإستئذانات" },
]

const tableHeaders = [
  { label: "رقم الطلب" },
  { label: "المسمى" },
  { label: "تاريخ الطلب" },
  { label: "الحالة" },
]

interface Column {
  label: string
}

interface TransactionTableProps {
  columns: Column[]
  rows: TransactionRequest[]
  itemsPerPage?: number
}

interface TransactionListTableProps {
  data: TransactionRequest[]
}

export const TransactionListTable = ({ data }: TransactionListTableProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = data.filter((req) =>
    typeof req.name === "string"
      ? req.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false,
  )

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-border-[#ECF0F480] p-4">
        <h2 className="text-foreground font-bold text-2xl">قائمة المعاملات</h2>
        <div className="flex gap-4 items-center relative">
          <Input
            placeholder="البحث في الطلبات"
            icon={<SearchIcon width={13} height={13} />}
            className="text-sm text-darkBlue placeholder:text-foreground bg-cloudGray pr-10 rounded-full shadow-none border-none"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
      </div>

      <FilterSection
        options={requests}
        selectLabel="نوع الطلب"
        selectPlaceholder="حدد نوع الطلب"
        filterHeader="فرز الطلبات"
        filterButton="إظهار النتائج"
        Icon={FilterIcon}
        isRequestDate={true}
        onApplyFilters={() => {}}
      />

      <TransactionTable columns={tableHeaders} rows={filtered} />
    </div>
  )
}

const TransactionTable = ({
  columns,
  rows,
  itemsPerPage = 7,
}: TransactionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = useMemo(
    () => Math.ceil(rows.length / itemsPerPage),
    [rows.length, itemsPerPage],
  )
  const paginated = useMemo(
    () =>
      rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [rows, currentPage, itemsPerPage],
  )

  const handlePageChange = (page: number) => setCurrentPage(page)

  return (
    <>
      <UITable>
        <TableHeader className="bg-cloudGray">
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className="text-right text-darkBlue text-base px-4"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10">
                <FolderWithSearchIcon />
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((row, idx) => (
              <TableRow
                key={row.id}
                className={idx % 2 !== 0 ? "bg-cloudGray" : "bg-white"}
              >
                {columns.map((col, i) => {
                  let value = ""
                  switch (col.label) {
                    case "رقم الطلب":
                      value = row.id
                      break
                    case "المسمى":
                      value = row.name
                      break
                    case "تاريخ الطلب":
                      value = row.date
                      break
                    case "الحالة":
                      value = row.status
                      break
                  }
                  return (
                    <TableCell key={i} className="py-3 text-right">
                      {value}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </UITable>

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
    </>
  )
}
