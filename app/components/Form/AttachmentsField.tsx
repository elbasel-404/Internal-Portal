import { OutboxIcon, PdfFileIcon, TrashIcon } from "@icons"
import { Button } from "@ui"
import type { ChangeEvent } from "react"

interface FileAttachmentFieldProps {
  files: File[]
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onFilesChange?: (files: File[]) => void
  handleFileUpload: (files: FileList | null) => void
  handleRemoveFile: (index: number) => void
  label?: string
  subLabel?: string
  required?: boolean
  errors?: string[] | null
  name?: string
}

export const FileAttachmentField = ({
  files,
  handleFileChange,
  onFilesChange,
  handleFileUpload,
  handleRemoveFile: handleRemoveFileProp,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label = "المرفقات",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subLabel = "sublabel",
  required = false,
  name,
}: FileAttachmentFieldProps) => {
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    if (onFilesChange) {
      onFilesChange(updatedFiles)
    }
    handleRemoveFileProp(index)
  }

  return (
    <>
      <div>
        <label className="font-medium text-foreground">
          {label ?? "المرفقات"}<span className="text-red-500">*</span>
        </label>
      </div>

      {/* Upload Box */}
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
        <label
          className="rounded-lg px-4 py-2 cursor-pointer flex flex-col justify-center items-center"
          htmlFor="attachment_ids_input"
        >
          <OutboxIcon />
          <p className="text-primary hover:underline">انقر هنا لإضافة ملف</p>
          <p className="text-stormGray">
            تنسقات الملفات المدعومة (PDF ، JPG ، DOC ، PNG, XLX)
          </p>
        </label>
        <input
          required={required}
          onChange={(e) => {
            handleFileChange?.(e)
            handleFileUpload(e.target.files)
          }}
          name={name ?? "attachment_ids"}
          id="attachment_ids_input"
          type="file"
          multiple
          className="hidden"
        />
      </div>

      {/* File List */}
      <div>
        {files.map(({ name }, index) => (
          <div key={name} className="bg-cloudGray px-4 py-3 rounded-xl">
            <div className="flex items-center justify-between p-2 rounded mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#FFF4CF] p-3 rounded-md">
                  <PdfFileIcon width={20} height={20} />
                </span>
                <span>{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="bg-primary-opacity p-2.5 rounded-sm shadow-none hover:bg-primary-opacity"
                  onClick={() => handleRemoveFile(index)}
                >
                  <TrashIcon width={18} height={18} className="fill-primary" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
