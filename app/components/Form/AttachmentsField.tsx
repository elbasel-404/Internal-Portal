import { OutboxIcon, TrashIcon } from "@icons"
import { Button } from "@ui"
import { FileText } from "lucide-react"

interface AttachmentsFieldProps {
  handleFileUpload: (files: FileList | null) => void
  handleRemoveFile: (index: number) => void
  label?: string
  subLabel?: string
  required?: boolean
  files: File[]
  name?: string
}

export const AttachmentsField = ({
  handleFileUpload,
  handleRemoveFile,
  label = "المرفقات",
  subLabel,
  required,
  files,
  name = "attachment_ids",
}: AttachmentsFieldProps) => {
  return (
    <div>
      <div>
        <label className="font-medium text-foreground">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-grey-400 text-sm">{subLabel}</p>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
          <input
            type="file"
            id="attachments"
            name={name}
            className="sr-only"
            onChange={(e) => handleFileUpload(e.target.files)}
            multiple
          />
          <label
            htmlFor="attachments"
            className="cursor-pointer flex flex-col justify-center items-center"
          >
            <OutboxIcon />
            <p className="text-primary hover:underline">انقر هنا لإضافة ملف</p>
            <p className="text-stormGray">
              تنسقات الملفات المدعومة (PDF ، JPG ، DOC ، PNG, XLX)
            </p>
          </label>
        </div>
        {files.map((file, index) => (
          <div key={index} className="bg-cloudGray px-4 py-3 rounded-xl">
            <div className="flex items-center justify-between p-2 rounded mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#FFF4CF] p-4 rounded-md">
                  <FileText className="text-[#B86B00]" />
                </span>
                <p className="text-black font-light line-clamp-1">
                  {file.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
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
    </div>
  )
}
