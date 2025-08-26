"use client"

import { batchAmount } from "@atoms"
import { Table } from "@components"
import {
  AttachmentsField,
  DateField,
  InputField,
  TextareaField,
} from "@components/form"
import { CheckIcon, CirclePlusIcon, RiyalCurrencyIcon, XMarkIcon } from "@icons"
import { removeBatchProduct } from "@server"
import { BatchProduct } from "@types"
import { Button } from "@ui"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { ModalLink } from "../ModalLink"
import { formAction } from "./helpers/formAction"
import { State } from "./helpers/State"

interface BatchsProps {
  batchProducts: BatchProduct[]
}

const initialState: State = {
  success: false,
  errors: null,
  id: null,
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
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pending = isPending || isSubmitting
  const [files, setFiles] = useState<File[]>([])
  const [batchName, setBatchName] = useState("")
  const [batchNumber, setBatchNumber] = useState("")
  const [paymentDate, setPaymentDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [deductionAmount, setDeductionAmount] = useState(0)
  const [amountBeforeDeduction, setAmountBeforeDeduction] = useState(0)
  const [, setTotalBatchAmount] = useAtom(batchAmount)

  const batchProductsData = batchProducts.map((batchProductDetails) => {
    return {
      ...batchProductDetails,
      id: batchProductDetails.id ?? "",
    }
  })

  const totalAmount = batchProductsData.reduce(
    (acc, curr) => acc + Number(curr.subtotal),
    0,
  )

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  // Prepare payments array in the required format
  const paymentsData = [
    {
      name: batchName,
      number: parseInt(batchNumber) || 0,
      date: formatDate(paymentDate),
      amount: totalAmount,
      amount_before_deduction: amountBeforeDeduction,
      deduction_amount: deductionAmount,
      notes: notes,
      products: batchProductsData.map((product) => ({ id: product.id })),
    },
  ]

  const handleBatchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchName(e.target.value)
  }

  const handleBatchNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchNumber(e.target.value)
  }

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
  }, [totalAmount, setTotalBatchAmount])

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "vacation-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("vacation-form-pending")
    })
  }

  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 mt-4"
    >
      {/* Hidden input for request ID */}
      <input
        type="text"
        name="request_id"
        hidden
        aria-hidden
        readOnly
        value={localStorage.getItem("requestId") || ""}
        className="hidden"
      />

      {/* Hidden input for payments data in the required format */}
      <input
        type="text"
        name="payments"
        hidden
        aria-hidden
        readOnly
        value={JSON.stringify(paymentsData)}
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="رقم الدفعة"
          name=""
          placeholder=""
          required
          value={batchNumber}
          onChange={handleBatchNumberChange}
        />
        <InputField
          label="اسم الدفعة"
          name=""
          placeholder=""
          required
          value={batchName}
          onChange={handleBatchNameChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="مبلغ الخصم"
          name=""
          placeholder="0"
          value={deductionAmount.toString()}
          onChange={(e) => setDeductionAmount(Number(e.target.value))}
        />
        <InputField
          label="المبلغ قبل الخصم"
          name=""
          placeholder="0"
          value={amountBeforeDeduction.toString()}
          onChange={(e) => setAmountBeforeDeduction(Number(e.target.value))}
        />
      </div>

      <DateField
        label="تاريخ السداد"
        name=""
        date={paymentDate}
        onChange={(value) => setPaymentDate(value || new Date())}
        required={false}
      />

      <AttachmentsField
        files={files}
        onFilesChange={(fileList) => setFiles(fileList)}
        setFiles={setFiles}
      />

      <TextareaField
        name=""
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
          disabled={pending}
        >
          <CheckIcon className="fill-primary group-hover:fill-white" />
          إضافة
        </Button>
      </div>
    </form>
  )
}
