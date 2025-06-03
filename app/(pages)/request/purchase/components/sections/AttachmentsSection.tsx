"use client"

import {
  createFileHandler,
  filesAtom,
  purchaseTypeAtom,
  selectedAttachmentTypesAtom,
} from "@atoms"
import { AttachmentsField, CheckboxListField } from "@components/form"
import { AttachmentType } from "@types"
import { useAtom } from "jotai"

/**
 * Attachments section for selecting and uploading files
 */
export const AttachmentsSection = () => {
  const [selectedTypes, setSelectedTypes] = useAtom(selectedAttachmentTypesAtom)
  const [files, setFiles] = useAtom(filesAtom)
  const [purchaseType] = useAtom(purchaseTypeAtom)

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <div className="space-y-6">
      {purchaseType === "directPayment" && (
        <CheckboxListField
          label="نوع المرفقات"
          name="attachments_type"
          options={[
            { value: "termsBooklet", label: "كراسة الشروط" },
            { value: "specifications", label: "مواصفات" },
            { value: "samples", label: "عينات" },
            { value: "other", label: "أخرى" },
          ]}
          selectedValues={selectedTypes}
          onChange={(values) => setSelectedTypes(values as AttachmentType[])}
          className="space-y-2"
          labelStyle="font-medium text-foreground"
        />
      )}

      <AttachmentsField
        files={files}
        handleFileUpload={fileHandler.upload}
        handleRemoveFile={(index: number) =>
          fileHandler.remove(files[index].id)
        }
        required
      />
    </div>
  )
}
