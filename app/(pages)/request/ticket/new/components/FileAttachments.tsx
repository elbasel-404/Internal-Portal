"use client"
import { OutboxIcon, PdfFileIcon, TrashIcon } from "@icons"
import { Button } from "@ui"
import { ChangeEvent, useState, useRef } from "react"

export const FileAttachment = ({}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateInputFiles = (fileList: File[]) => {
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      fileList.forEach(file => dt.items.add(file))
      fileInputRef.current.files = dt.files
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      updateInputFiles(updatedFiles)
    }
  }

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove)
    setFiles(updatedFiles)
    updateInputFiles(updatedFiles)
  }

  return (
    <>
      <div>
        <label className="font-medium text-foreground">
          المرفقات<span className="text-red-500">*</span>
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
          ref={fileInputRef}
          onChange={handleFileChange}
          name="attachment_ids"
          id="attachment_ids_input"
          type="file"
          multiple
          className="hidden"
        />
      </div>
      {/* File List */}
      <div>
        {files.map(({ name }, index) => (
          <div key={name + index} className="bg-cloudGray px-4 py-3 rounded-xl">
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
