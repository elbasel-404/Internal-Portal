"use client"

import {
  AttachmentsField,
  CheckboxListField,
  DateField,
  FormHeader,
  InputField,
  RadioField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { ModalLink } from "@components/modals/ModalLink"
import { CirclePlusIcon } from "@icons"
import { paths } from "@lib"
import { PurchaseOrderProduct } from "@types"
import { useEffect, useState } from "react"
import { ProductsTable } from "./ProductsTable"

interface ChangeContractFormProps {
  productsData?: PurchaseOrderProduct[] // Replace 'any' with the actual type if available
}

export const ChangeContractForm = ({
  productsData,
}: ChangeContractFormProps) => {
  // Checkbox state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Textarea states
  const [changeDescription, setChangeDescription] = useState("")
  const [changeJustification, setChangeJustification] = useState("")

  // Input field states
  const [completionPercentage, setCompletionPercentage] = useState("")
  const [awardAmount, setAwardAmount] = useState("")
  const [decreaseAmount, setDecreaseAmount] = useState("")
  const [increaseAmount, setIncreaseAmount] = useState("")
  const [totalDecreasePercentage, setTotalDecreasePercentage] = useState("")
  const [totalIncreasePercentage, setTotalIncreasePercentage] = useState("")

  // Radio button states
  const [newClause, setNewClause] = useState("")
  const [periodExtension, setPeriodExtension] = useState("")

  // Date state
  const [requestedDate, setRequestedDate] = useState<Date | undefined>(
    undefined,
  )

  // File attachment states
  const [technicalReportFiles, setTechnicalReportFiles] = useState<File[]>([])
  const [additionalAttachmentFiles, setAdditionalAttachmentFiles] = useState<
    File[]
  >([])

  // Effect to automatically check selectedTypes based on radio selections
  useEffect(() => {
    const updatedTypes = [...selectedTypes]

    // When newClause is 'yes', check the first option (increaseRequest)
    if (newClause === "yes") {
      if (!updatedTypes.includes("increaseRequest")) {
        updatedTypes.push("increaseRequest")
      }
    } else if (newClause === "no") {
      // Remove increaseRequest when newClause is 'no'
      const index = updatedTypes.indexOf("increaseRequest")
      if (index > -1) {
        updatedTypes.splice(index, 1)
      }
    }

    // When periodExtension is 'yes', check the last option (periodChangeRequest)
    if (periodExtension === "yes") {
      if (!updatedTypes.includes("periodChangeRequest")) {
        updatedTypes.push("periodChangeRequest")
      }
    } else if (periodExtension === "no") {
      // Remove periodChangeRequest when periodExtension is 'no'
      const index = updatedTypes.indexOf("periodChangeRequest")
      if (index > -1) {
        updatedTypes.splice(index, 1)
      }
    }

    // Update selectedTypes if there are changes
    if (
      JSON.stringify(updatedTypes.sort()) !==
      JSON.stringify(selectedTypes.sort())
    ) {
      setSelectedTypes(updatedTypes)
    }
  }, [newClause, periodExtension]) // Remove selectedTypes from dependencies to avoid infinite loop

  // File upload handlers
  const handleTechnicalReportUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setTechnicalReportFiles((prev) => [...prev, ...fileArray])
    }
  }

  const handleTechnicalReportRemove = (index: number) => {
    setTechnicalReportFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAdditionalAttachmentUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setAdditionalAttachmentFiles((prev) => [...prev, ...fileArray])
    }
  }

  const handleAdditionalAttachmentRemove = (index: number) => {
    setAdditionalAttachmentFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form className="bg-white rounded-lg text-black text-lg p-4 space-y-4">
      <FormHeader
        label="نموذج طلب تغيير أمر شراء / عقد"
        path={paths.changeContract.href}
      />

      <CheckboxListField
        label="نوع التغيير"
        name="change_types_ids"
        options={[
          { value: "increaseRequest", label: "طلب زيادة" },
          { value: "decreaseRequest", label: "طلب تخفيض" },
          { value: "periodChangeRequest", label: "طلب تغيير المدة" },
        ]}
        selectedValues={selectedTypes}
        onChange={setSelectedTypes}
        className="space-y-2"
        labelStyle="font-medium text-foreground"
        checkboxlayoutClass="bg-gray-100 p-2 rounded-md"
        disabled
      />

      <TextareaField
        required
        name="change_description"
        label="وصف التغييرات المقترحة"
        placeholder=""
        value={changeDescription}
        onChange={(e) => setChangeDescription(e.target.value)}
      />

      <TextareaField
        required
        name="change_justification"
        label="تبرير التغيير"
        placeholder=""
        value={changeJustification}
        onChange={(e) => setChangeJustification(e.target.value)}
      />

      <InputField
        name="completion_percentage"
        label="نسبة الإنجاز"
        placeholder=""
        required
        value={completionPercentage}
        onChange={(e) => setCompletionPercentage(e.target.value)}
      />

      <RadioField
        label="هل طلب التغيير يتطلب بند مستحدث؟"
        name="new_clause"
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" },
        ]}
        required
        selectedValue={newClause}
        onChange={setNewClause}
        radioStyle="flex-row gap-6"
        className="flex-col mb-4 border-t border-cloudGray pt-3"
        labelStyle="mb-2"
      />

      <RadioField
        label="هل يتطلب تمديد المدة أو تخفيض المدة؟"
        name="period_extension"
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" },
        ]}
        required
        selectedValue={periodExtension}
        onChange={setPeriodExtension}
        radioStyle="flex-row gap-6"
        className="flex-col mb-4 border-t border-cloudGray pt-3"
        labelStyle="mb-2"
      />

      {periodExtension === "yes" && (
        <>
          <DateField
            name="requested_date"
            label="تاريخ انتهاء العقد الجديد"
            required
            date={requestedDate}
            onChange={(date) => setRequestedDate(date ?? undefined)}
          />

          <AttachmentsField
            label="التقرير الفني"
            name="technical_report_attachment_ids"
            files={technicalReportFiles}
            handleFileUpload={handleTechnicalReportUpload}
            handleRemoveFile={handleTechnicalReportRemove}
            required
          />
        </>
      )}

      <InputField
        name="award_amount"
        label="مبلغ الترسية"
        placeholder=""
        disabled
        value={awardAmount}
        onChange={(e) => setAwardAmount(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="decrease_amount"
          label="مبلغ التخفيض في الطلب الحالي"
          placeholder=""
          disabled
          value={decreaseAmount}
          onChange={(e) => setDecreaseAmount(e.target.value)}
        />
        <InputField
          name="increase_amount"
          label="مبلغ الزيادة في الطلب الحالي"
          placeholder=""
          disabled
          value={increaseAmount}
          onChange={(e) => setIncreaseAmount(e.target.value)}
        />
        <InputField
          name="total_decrease_percentage"
          label="مجموع النسب المئوية للتخفيض في المشروع"
          placeholder=""
          disabled
          value={totalDecreasePercentage}
          onChange={(e) => setTotalDecreasePercentage(e.target.value)}
        />
        <InputField
          name="total_increase_percentage"
          label="مجموع النسب المئوية للزيادة في المشروع"
          placeholder=""
          disabled
          value={totalIncreasePercentage}
          onChange={(e) => setTotalIncreasePercentage(e.target.value)}
        />
      </div>

      <AttachmentsField
        label="المرفقات (إرفاق عرض السعر للبنود المستحدثة)"
        name="additional_attachment_ids"
        files={additionalAttachmentFiles}
        handleFileUpload={handleAdditionalAttachmentUpload}
        handleRemoveFile={handleAdditionalAttachmentRemove}
        required
      />

      <>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between py-6">
          <div className="flex flex-col">
            <h2 className="text-darkBlue font-semibold text-2xl">المنتجات</h2>
            <p className="text-red-600 text-sm">
              في حال التخفيض يرجي التأكد ان المنتجات المخفضة لم يتم اعداد دفعة
              لها
            </p>
          </div>

          {newClause === "yes" && (
            <ModalLink
              name="PurchaseOrderProductsModal"
              className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
            >
              <CirclePlusIcon className="fill-white group-hover:fill-primary" />
              إضافة عنصر
            </ModalLink>
          )}
        </div>
      </>

      <ProductsTable productsData={productsData} />

      <SubmitButton />
    </form>
  )
}
