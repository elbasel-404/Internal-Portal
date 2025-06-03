"use client"

import { batchAmount, createFileHandler } from "@atoms"
import { Table } from "@components"
import {
  AttachmentsField,
  DateField,
  InputField,
  TextareaField,
} from "@components/form"
import { CheckIcon, CirclePlusIcon, RiyalCurrencyIcon, XMarkIcon } from "@icons"
import { removeBatchProduct } from "@server"
import { BatchProduct, FileWithId } from "@types"
import { Button } from "@ui"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { ModalLink } from "../ModalLink"
import { batchsFormAction } from "./BatchsFormAction"

interface BatchsProps {
  batchProducts: BatchProduct[]
}

const tableHeaders = [
  { label: "المنتج" },
  { label: "الوصف" },
  { label: "الكمية" },
  { label: "الكمية المنجزة" },
  { label: "المبلغ المنجز" },
  { label: "الكمية تحت المنجزة" },
  { label: "المبلغ تحت المنجزة" },
  { label: "الكمية المتبقية" },
  { label: "المبلغ المتبقى" },
  { label: "سعر الوحدة" },
  { label: "سعر الوحدة بعد الضريبة" },
  { label: "الاجمالي الفرعى" },
  { label: "الإجراءات" },
]

export const BatchsForm = ({ batchProducts }: BatchsProps) => {
  const router = useRouter()
  const [files, setFiles] = useState<FileWithId[]>([])
  const [batchName, setBatchName] = useState("")
  const [batchNumber, setBatchNumber] = useState("")
  const [paymentDate, setPaymentDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [, setTotalBatchAmount] = useAtom(batchAmount)

  const batchProductsData = batchProducts.map((batchProductDetails, index) => {
    return {
      ...batchProductDetails,
      id: index + "id",
    }
  })

  const totalAmount = batchProductsData.reduce(
    (acc, curr) => acc + Number(curr.subtotal),
    0,
  )

  const handleBatchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchName(e.target.value)
  }

  const handleBatchNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchNumber(e.target.value)
  }

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  const handleRemoveBatchProducts = async (id: number) => {
    await removeBatchProduct(id)
  }

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = () => {
    closeModal()
  }

  useEffect(() => {
    setTotalBatchAmount(totalAmount)
  }, [totalAmount])

  return (
    <form
      action={batchsFormAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="رقم الدفعة"
          name="batchNumber"
          placeholder=""
          required
          value={batchNumber}
          onChange={handleBatchNumberChange}
        />
        <InputField
          label="اسم الدفعة"
          name="batchName"
          placeholder=""
          required
          value={batchName}
          onChange={handleBatchNameChange}
        />
      </div>

      <DateField
        label="تاريخ السداد"
        name="paymentDate"
        date={paymentDate}
        onChange={(value) => setPaymentDate(value || new Date())}
        required={false}
      />

      <AttachmentsField
        files={files}
        handleFileUpload={fileHandler.upload}
        handleRemoveFile={(index: number) =>
          fileHandler.remove(files[index].id)
        }
      />

      <TextareaField
        name="notes"
        label="ملاحظات"
        placeholder=""
        required={false}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="bg-white pt-4 pb-4 rounded-lg space-y-3">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
          <h2 className="text-darkBlue font-bold text-xl">
            المنتجات<span className="text-red-500">*</span>
          </h2>
          <ModalLink
            name="BatchProductsModal"
            className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
          >
            <CirclePlusIcon className="fill-white group-hover:fill-primary" />
            إضافة عنصر
          </ModalLink>
        </div>

        {batchProductsData.length > 0 && (
          <>
            <Table
              tableClassName="h-fit"
              columns={tableHeaders}
              rows={batchProductsData}
              toggleId={false}
              toggleDelete
              onRemove={handleRemoveBatchProducts}
            />
            <div className="p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-10">
              <p className="text-foreground font-medium">الإجمالي مع الضريبة</p>
              <span className="flex items-center gap-2 text-foreground font-medium text-xl">
                {totalAmount}
                <RiyalCurrencyIcon />
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end mb-2 gap-2">
        <Button
          onClick={closeModal}
          type="button"
          className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
        >
          <XMarkIcon className="fill-stormGray w-0 h-0" />
          إغلاق
        </Button>

        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <CheckIcon className="fill-primary group-hover:fill-white" />
          إضافة
        </Button>
      </div>
    </form>
  )
}
