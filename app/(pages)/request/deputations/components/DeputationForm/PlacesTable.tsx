"use client"

import { DeputationPlace } from "@types"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
  Button,
} from "@ui"
import { CirclePlusIcon, TrashIcon } from "@icons"
import { CheckboxField } from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"

interface DeputationPlacesProps {
  //TODO: DeputationPlace Type
  data: DeputationPlace[]
  issueVisa: boolean
  onChangeIssueVisa: (value: boolean) => void
  onRemove?: (id: string) => void
  onAdd?: () => void
}

const tableHeaders = [
  { label: "البلاد" },
  { label: "المدينة" },
  { label: "الاجراءات" },
]

export const PlacesTable = ({
  data,
  issueVisa,
  onChangeIssueVisa,
  onRemove,
}: DeputationPlacesProps) => {
  function changeIssueVisa(value: boolean): void {
    throw new Error("Function not implemented.")
  }

  return (
    <>
      <div className="bg-white rounded-lg m-6">
        <div className="flex border-r-4 items-center bg-[#007C9E24] border-[#007497] py-3 px-2 mb-2">
          <div className="flex gap-2 slotHandle p-4 flex-1">
            <h2 className="text-2xl font-bold">
              مكان الانتداب <span className="text-red-500">*</span>
            </h2>
          </div>
          <div>
            <ModalLink
              name="DeputationPlacesModal"
              className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
            >
              <CirclePlusIcon className="fill-white group-hover:fill-primary" />
              اضافة مكان الانتداب
            </ModalLink>
          </div>
        </div>
        <UITable>
          <TableHeader className="bg-cloudGray">
            <TableRow>
              {tableHeaders.map((col, index) => (
                <TableHead
                  key={index}
                  className={"text-right text-darkBlue text-lg w-1/12"}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                className={`${index % 2 !== 0 ? "bg-cloudGray" : "bg-white"}`}
              >
                {Object.entries(item)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <TableCell key={key} className="w-1/12">
                      {value}
                    </TableCell>
                  ))}
                <TableCell className="w-1/12">
                  <Button
                    className="flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5"
                    onClick={(e) => {
                      e.preventDefault()
                      onRemove && onRemove(item.id)
                    }}
                  >
                    <TrashIcon className="fill-destructive-foreground group-hover:fill-white" />
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
        <div className="my-10">
          <CheckboxField
            name="issueVisa"
            label="ارغب في اصدار تأشيرة سفر من قبل منشآت  "
            className="flex md:items-center gap-x-3"
            labelStyle="text-lg text-black font-medium leading-0"
            checkboxStyle="mt-1 md:mt-0"
            checked={issueVisa}
            onChange={(value) => onChangeIssueVisa(value)}
          />
        </div>
      </div>
    </>
  )
}
