"use client"

import { AttachmentsField, InputField } from "@components/form"
import { CheckIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

export const EditPerformanceForm = () => {
  const [files, setFiles] = useState<File[]>([])
  const [reason, setReason] = useState("")
  const router = useRouter()

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((file) => file)
      setFiles([...files, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value)
  }

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 mt-4">
      <InputField
        label="السبب"
        name="reason"
        placeholder="الرجاء ذكر سبب التعديل"
        value={reason}
        onChange={handleReasonChange}
        required
      />
      <AttachmentsField
        required
        files={files}
        handleFileUpload={handleFileUpload}
        handleRemoveFile={handleRemoveFile}
      />
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
          تأكيد
        </Button>
      </div>
    </form>
  )
}
