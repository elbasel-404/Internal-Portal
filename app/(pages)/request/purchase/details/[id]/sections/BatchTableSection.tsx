"use client"

import { batchAmount, completionRequestAtom } from "@atoms"
import { Table } from "@components"
import { ModalLink } from "@components/modals/ModalLink"
import { CheckIcon, CirclePlusIcon } from "@icons"
import { paths } from "@lib"
import { removeBatch } from "@server"
import { BatchItem } from "@types"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

const batchTableHeader = [
  { label: "رقم الدفعة" },
  { label: "مسمى الدفعة" },
  { label: "نوع الدفعة" },
  { label: "قيمة الدفعة قبل الخصم" },
  { label: "نسبة الخصم" },
  { label: "قيمة الدفعة" },
  { label: "شهادة الإنجاز" },
  { label: "أمر صرف" },
  { label: "الإجراءات" },
]

interface Props {
  requestStatus: { id: string }[]
  batchs: BatchItem[]
}

export const BatchTableSection = ({ requestStatus, batchs }: Props) => {
  if (!requestStatus.some((step) => step.id === "6")) return null

  const [completionRequest] = useAtom(completionRequestAtom)
  const [totalBatchAmount] = useAtom(batchAmount)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(5)

  useEffect(() => {
    if (completionRequest) {
      setShowSuccess(true)
      setCountdown(5) // Reset countdown

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval)
            setShowSuccess(false)
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval) // Cleanup on unmount
    }
  }, [completionRequest])

  const batchData = batchs.map((batch, index) => ({
    ...batch,
    id: index.toString(),
    batchType: "مبلغ",
    batchAmountWithoutDiscount: totalBatchAmount,
    discount: "0",
    batchAmount: totalBatchAmount,
    achievementCertificate: "",
    disbursementOrder: "",
  }))

  const handleRemoveBatch = (id: number) => {
    void removeBatch(id)
    localStorage.removeItem("batchAmount")
  }

  return (
    <div className="bg-white pt-4 pb-4 px-4 rounded-lg space-y-3">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
        <h2 className="text-darkBlue font-bold text-xl">
          قائمة الدفعات<span className="text-red-500">*</span>
        </h2>
        <ModalLink
          name="BatchsModal"
          className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
        >
          <CirclePlusIcon className="fill-white group-hover:fill-primary" />
          إضافة عنصر
        </ModalLink>
      </div>
      {showSuccess && (
        <div className="flex items-center justify-between gap-4 text-sm bg-[#04AA6D] p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-white fill-[#04AA6D]" />
            </div>
            <span className="text-white font-medium text-xl">
              تم إرسال الطلب بنجاح
            </span>
          </div>
          <span className="text-white font-semibold">
            يختفي خلال {countdown} ثانية
          </span>
        </div>
      )}

      {batchData.length > 0 && (
        <Table
          tableClassName="h-fit"
          columns={batchTableHeader}
          rows={batchData}
          link={paths.batchDetails.href}
          toggleId={false}
          toggleDelete
          onRemove={handleRemoveBatch}
        />
      )}
    </div>
  )
}
