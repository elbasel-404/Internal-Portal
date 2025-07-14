"use client"

import { batchAmount, completionRequestAtom } from "@atoms"
import { Table } from "@components"
import { ModalLink } from "@components/modals/ModalLink"
import { CheckIcon, CirclePlusIcon } from "@icons"
import { paths } from "@lib"
import { removeBatch } from "@server"
import { PurchasePayments } from "@types"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

const batchTableHeader = [
  { label: "رقم الدفعة" },
  { label: "مسمى الدفعة" },
  { label: "قيمة الدفعة قبل الخصم" },
  { label: "نسبة الخصم" },
  { label: "قيمة الدفعة" },
  { label: "شهادة الإنجاز" },
  { label: "أمر صرف" },
  { label: "الإجراءات" },
]

interface Props {
  requestStatus: { id: string }[]
  payments: PurchasePayments[] | undefined
}

export const BatchTableSection = ({ requestStatus, payments }: Props) => {
  const [completionRequest] = useAtom(completionRequestAtom)
  const [totalBatchAmount] = useAtom(batchAmount)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(5)

  // Moved the conditional check inside useEffect to fix React Hooks rules violation
  const isProjectCompletionStep = requestStatus.some((step) => step.id === "6")

  useEffect(() => {
    // Early return inside the effect instead of outside
    if (!isProjectCompletionStep) return

    // Rest of the effect logic
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
  }, [completionRequest, isProjectCompletionStep])

  const stateCertificateStatus = (state: string) => {
    if (state === "draft") return "طلب"
    else if (state === "sector_project_management")
      return "مشرف القطاع في إدارة المشاريع"
    else if (state === "project_management_office") return "مكتب إدارة المشاريع"
    else if (state === "sm") return "مدير القطاع"
    else if (state === "done") return "اعتمد"
    else if (state === "refuse") return "مرفوض"
    else if (state === "cancel") return "ملغي"
    else return "__"
  }

  const paymentStatus = (state: string) => {
    if (state === "progress") return "تحت الإجراء"
    else if (state === "done") return "تم الصرف"
    else return "__"
  }

  const batchData = payments?.map((payment, index) => ({
    id: index.toString(),
    number: payment.number,
    name: payment.name || "__",
    amount_before_deduction: payment.amount_before_deduction || "__",
    deduction_amount: payment.deduction_amount || "__",
    amount: payment.amount || "__",
    state_certificate:
      stateCertificateStatus(payment.state_certificate) || "__",
    payment_state: paymentStatus(payment.payment_state) || "__",
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

      {batchData?.length && (
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
