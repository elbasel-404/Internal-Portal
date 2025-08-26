"use client"

import { completionRequestAtom, finalSettlementValueAtom } from "@atoms"
import {
  AttachmentsField,
  DateField,
  RadioField,
  TextareaField,
} from "@components/form"
import { CheckIcon, DownloadIcon, PdfFileIcon, XMarkIcon } from "@icons"
import { YesNoOption } from "@types"
import { Button } from "@ui"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const AchievementCertificateForm = () => {
  const router = useRouter()

  const [, setCompletionRequest] = useAtom(completionRequestAtom)
  const [completionDate, setCompletionDate] = useState<Date | undefined>(
    new Date(),
  )
  const [value, setValue] = useAtom(finalSettlementValueAtom)
  const [invoiceFiles, setInvoiceFiles] = useState<File[]>([])
  const [extractFiles, setExtractFiles] = useState<File[]>([])
  const [wageProtectionFiles, setWageProtectionFiles] = useState<File[]>([])
  const [regularCertificates, setRegularCertificates] = useState<File[]>([])
  const [finalSettlementFiles, setFinalSettlementFiles] = useState<File[]>([])

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCompletionRequest(true)
    closeModal()
  }

  // Handle file downloads
  const handleDownloadExtract = () => {
    // Mock functionality - in a real app would download the actual file
    const link = document.createElement("a")
    link.href = "/path/to/sample-extract.xlsx"
    link.download = "مستخلص.xlsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadInstructions = () => {
    // Mock functionality - in a real app would download the actual file
    const link = document.createElement("a")
    link.href = "/path/to/achievement-instructions.pdf"
    link.download = "تعليمات الانجاز.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 mt-4">
      {/* Sample Files Section */}
      <div className="rounded-lg gap-3 px-4 flex items-center bg-grey-50 py-3 hover:bg-black/10 transition-colors cursor-pointer">
        <div className="w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center">
          <PdfFileIcon className="w-4 h-4" />
        </div>
        {"مستخلص.xlsx"}
        <div className="mr-auto flex gap-4">
          <Button
            onClick={handleDownloadExtract}
            className="bg-primary-opacity rounded-sm hover:bg-primary-opacity w-7 h-7 p-0"
          >
            <DownloadIcon fill="#007C9E" />
          </Button>
        </div>
      </div>
      <div className="rounded-lg gap-3 px-4 flex items-center bg-grey-50 py-3 hover:bg-black/10 transition-colors cursor-pointer">
        <div className="w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center">
          <PdfFileIcon className="w-4 h-4" />
        </div>
        {"تعليمات الانجاز.pdf"}
        <div className="mr-auto flex gap-4">
          <Button
            onClick={handleDownloadInstructions}
            className="bg-primary-opacity rounded-sm hover:bg-primary-opacity w-7 h-7 p-0"
          >
            <DownloadIcon fill="#007C9E" />
          </Button>
        </div>
      </div>

      <DateField
        label="تاريخ إنجاز العمل"
        subLabel="يلزم بيان مقدار الخصم اذا كان الانجاز خارج فترة العقد"
        name="completionDate"
        date={completionDate}
        onChange={(value) => setCompletionDate(value || new Date())}
        required={false}
      />
      <TextareaField
        label="تفاصيل المخرجات و البنود المنفذة"
        name="outcomesDetails"
        placeholder="يرجى ذكر تفاصيل المخرجات بالتفصيل"
        required
      />
      <AttachmentsField
        label="الفاتورة"
        subLabel="فاتورة مختومة برقم ضريبي"
        name="invoice"
        files={invoiceFiles}
        onFilesChange={(fileList) => setInvoiceFiles(fileList)}
        setFiles={setInvoiceFiles}
        required={false}
      />
      <AttachmentsField
        label="المستخلص"
        subLabel="مدير المشروع مسؤول عن صحة المعلومات المذكورة في المستخلص"
        name="extract"
        files={extractFiles}
        onFilesChange={(fileList) => setExtractFiles(fileList)}
        setFiles={setExtractFiles}
        required={false}
      />
      <AttachmentsField
        label="حماية الأجور"
        subLabel="التأكد من صلاحيات الشهادات المرفقة"
        name="wageProtection"
        files={wageProtectionFiles}
        onFilesChange={(fileList) => setWageProtectionFiles(fileList)}
        setFiles={setWageProtectionFiles}
        required={false}
      />
      <AttachmentsField
        label="الشهادات النظامية"
        subLabel="التأكد من صلاحيات الشهادات المرفقة"
        name="regularCertificates"
        files={regularCertificates}
        onFilesChange={(fileList) => setRegularCertificates(fileList)}
        setFiles={setRegularCertificates}
        required={false}
      />

      <div className="space-y-4">
        <RadioField
          label="هل الفاتورة نهائية عن المشروع؟"
          name="finalInvoice"
          options={[
            { value: "no", label: "لا" },
            { value: "yes", label: "نعم" },
          ]}
          required={true}
          labelStyle="font-medium text-base text-grey-500"
          radioStyle="flex flex-col sm:flex-row"
          className="justify-between items-center"
          selectedValue={value}
          onChange={(selected) => setValue(selected as YesNoOption)}
        />
        {value === "yes" && (
          <AttachmentsField
            label="مخالصة نهائية"
            subLabel="يجب ارفاق المخالصة النهائية بالتنسيق مع ادارة العقود والمشتريات"
            name="finalSettlement"
            files={finalSettlementFiles}
            onFilesChange={(fileList) => setFinalSettlementFiles(fileList)}
            setFiles={setFinalSettlementFiles}
            required={false}
          />
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
          إرسال
        </Button>
      </div>
    </form>
  )
}
