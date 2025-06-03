"use client"

import { createFileHandler } from "@atoms"
import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { FileWithId } from "@types"
import { useState } from "react"
import { DocumentTypes, RequestTypes } from "./config"

export const WorkDocumentForm = () => {
  const [files, setFiles] = useState<FileWithId[]>([])
  const [requestDate, setRequsetDate] = useState<Date>(new Date())

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <form className="bg-white rounded-md">
      <FormHeader label="نموذج طلب الوثيقة" path={paths.workDocument.href} />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            name="requestType"
            label="نوع الطلب"
            placeholder=""
            types={RequestTypes}
          />
          <DateField
            date={requestDate}
            onChange={(value) => setRequsetDate(value || new Date())}
            label="تاريخ الطلب"
            name="requestDate"
            required
          />
          <SelectField
            name="documentType"
            label="نوع الوثيقة"
            placeholder="إجراءات عمل"
            types={DocumentTypes}
          />
          <InputField
            label="عنوان الوثيقة"
            name="documentAddress"
            placeholder=""
            required
          />
        </div>
        <InputField
          label="رمز الوثيقة"
          name="documentCode"
          placeholder=""
          required
        />
        <TextareaField label="الهدف" name="tagret" required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="النسخة الحالية"
            name="currentVersion"
            placeholder=""
            required
          />
          <InputField
            label="التعديلات المقترحة"
            name="proposedChanges"
            placeholder=""
            required
          />
        </div>

        <AttachmentsField
          label="المرفقات"
          files={files}
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required
        />

        <SubmitButton />
      </div>
    </form>
  )
}
