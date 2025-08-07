/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { CheckboxField } from "@components/form"
// import { PdfFileIcon, PrinterIcon, TrashIcon } from "@icons"
// import { colors } from "@lib"
import type { RequestHeader } from "@types"
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@ui"
import { cn } from "@utils"
import { type ReactNode, isValidElement } from "react"
import { renderStatusCell } from "./Table/Table"
import { FileAttachment } from "./FileAttachment"
interface RequestDetailsProps {
  headers?: RequestHeader[]
  evaluationCriteria?: ReactNode
  requestDetailsLabel?: string
}

// type AttachmentList = {
//   label: "المرفقات"
//   value: File[]
// }

export const RequestDetails = ({
  headers,
  evaluationCriteria,
  requestDetailsLabel = "تفاصيل الطلب",
}: RequestDetailsProps) => {
  const covenantRequestNumber = headers?.find(
    ({ label }) => label === "رقم طلب العهدة",
  )
  const attachmentHeader = headers?.find(({ label }) => label === "المرفقات")
  const attachments = attachmentHeader?.value as number[]

  // const attachmentList: AttachmentList | undefined =
  //   attachmentHeader && Array.isArray(attachmentHeader.value)
  //     ? { label: "المرفقات", value: attachmentHeader.value }
  //     : undefined
  // console.log({ attachmentList })

  const notesHeaders = ["ملاحظات", "المهام التي سيتم العمل عليها"]

  const labelValue = (value: ReactNode | boolean, key?: string) => {
    if (typeof value === "string") {
      return (
        <div
          className="font-medium mx-3 text-darkBlue"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )
    } else if (typeof value === "boolean") {
      return (
        <div className="font-medium mx-3 text-darkBlue">
          <CheckboxField
            label={""}
            name={key || ""}
            className="rounded-[3px] shadow-none space-y-0"
            checked={Boolean(value)}
            disabled
          />
        </div>
      )
    } else if (isValidElement(value)) {
      // Handle JSX elements (React components)
      return <div className="font-medium mx-3 text-darkBlue">{value}</div>
    } else if (value !== null && value !== undefined) {
      // Handle other ReactNode types (numbers, etc.)
      return (
        <div className="font-medium mx-3 text-darkBlue">{String(value)}</div>
      )
    } else {
      // Handle null/undefined values
      return (
        <div className="font-medium mx-3 text-darkBlue text-gray-400">
          غير محدد
        </div>
      )
    }
  }

  return (
    <section className="bg-white rounded-lg py-8 px-4 mt-6">
      <h1 className="font-bold text-2xl mb-4">
        {covenantRequestNumber
          ? "بيانات استعاضة / اقفال عهدة"
          : requestDetailsLabel}
      </h1>
      <div>
        {headers
          ?.filter(({ value }) => !Array.isArray(value))
          .map(
            (
              {
                label,
                value,
                key /* tableHeaders removed to fix unused var */,
              }: RequestHeader,
              index,
            ) => {
              const isEven = index % 2 === 0
              const isNotes = notesHeaders.includes(label)

              return (
                <div key={index}>
                  {label === "رقم طلب العهدة" && (
                    <div className="text-foreground text-2xl font-bold my-3">
                      بيانات العهدة
                    </div>
                  )}
                  <div
                    key={label}
                    className={cn(
                      "py-[22px] flex flex-col md:flex-row items-center",
                      isEven && "bg-grey-50",
                      isNotes && "flex-col",
                    )}
                  >
                    <div className="mx-3 md:basis-1/4 md:flex-1 md:max-w-[15%]">
                      {label}
                    </div>
                    {label === "الحالة"
                      ? renderStatusCell(value as string)
                      : labelValue(value as ReactNode | boolean, key)}
                  </div>
                </div>
              )
            },
          )}
      </div>
      <div>{evaluationCriteria}</div>
      {headers
        ?.filter(({ value }) => {
          return (
            Array.isArray(value) &&
            value.every((v) => v instanceof Object) &&
            !value.every((v) => v instanceof File)
          )
        })
        .map(({ label, value, tableHeaders, index }: RequestHeader) => (
          <RequestDetailsHeader
            key={String(label) + String(index)}
            label={label}
            data={value as []}
            tableHeaders={tableHeaders || []}
          />
        ))}
      <div>
        {attachments.map((id) => (
          <FileAttachment key={id} fileId={id} />
        ))}
      </div>
    </section>
  )
}

interface ResultItem {
  id: string | number
  [key: string]: string | number | boolean | null | undefined
}

interface RequestDetailsHeaderProps {
  label: string
  data: ResultItem[] | ReactNode
  tableHeaders: { label: string; key: string }[]
}

const RequestDetailsHeader = ({
  label,
  data,
  tableHeaders,
}: RequestDetailsHeaderProps) => {
  return (
    <>
      <div className="border-r-4 border-[#007497] m-4">
        <div className="bg-[#007C9E24] flex gap-2 slotHandle p-4 flex-1">
          <h2 className="text-2xl font-bold">{label}</h2>
        </div>
      </div>
      <div className="mx-4 my-2">
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={String(col.label) + String(index)}
                  className={"text-right text-darkBlue text-lg w-1/12"}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) &&
              (data as ResultItem[]).map((resultItem, index) => (
                <TableRow
                  key={String(resultItem.id) + String(index)}
                  className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
                >
                  {Object.entries(resultItem)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <TableCell key={key} className="w-1/12">
                        {value}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </UITable>
      </div>
    </>
  )
}
