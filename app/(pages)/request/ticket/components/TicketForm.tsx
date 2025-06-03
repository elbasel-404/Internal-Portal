"use client"

import { createFileHandler } from "@atoms"
import {
  AttachmentsField,
  FormHeader,
  RadioField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { FileWithId } from "@types"
import { useState } from "react"
import {
  NonTechnicalRequest,
  TechnicalReport,
  TechnicalRequest,
} from "./options"

export const TicketForm = () => {
  const [ticketType, setTicketType] = useState("technical")
  const [techTicketType, setTechTicketType] = useState("reportProblem")
  const [nonTechTicketType, setNonTechTicketType] = useState("request")
  const [files, setFiles] = useState<FileWithId[]>([])

  const handleTicketTypeChangeValue = (value: string) => {
    setTicketType(value)
  }

  const handleTechTicketTypeChangeValue = (value: string) => {
    setTechTicketType(value)
  }

  const handleNonTechTicketTypeChangeValue = (value: string) => {
    setNonTechTicketType(value)
  }

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <form className="bg-white rounded-md">
      <FormHeader label="إنشاء تذكرة جديدة" path={paths.tickets.href} />
      <div className="p-4 space-y-6">
        <RadioField
          label="الرجاء اختيار نوع التذكرة"
          name="ticketType"
          options={[
            { value: "technical", label: "تقني" },
            { value: "nonTechnical", label: "غير تقني" },
          ]}
          required={true}
          labelStyle="font-medium text-base text-grey-500"
          radioStyle="flex-col md:flex-row"
          className="flex-col"
          onChange={handleTicketTypeChangeValue}
          selectedValue={ticketType}
        />
        {ticketType === "technical" && (
          <RadioField
            label="الرجاء اختيار نوع تذكرة التقنية"
            name="technicalTicketType"
            options={[
              { value: "reportProblem", label: "الابلاغ عن مشكلة" },
              { value: "request", label: "طلب خدمة" },
            ]}
            required={true}
            labelStyle="font-medium text-base text-grey-500"
            radioStyle="flex-col md:flex-row"
            className="flex-col"
            onChange={handleTechTicketTypeChangeValue}
            selectedValue={techTicketType}
          />
        )}
        {ticketType === "nonTechnical" && (
          <RadioField
            label="الرجاء اختيار نوع تذكرة الغير تقنية"
            name="nonTechnicalTicketType"
            options={[{ value: "request", label: "طلب خدمة" }]}
            required={true}
            labelStyle="font-medium text-base text-grey-500"
            radioStyle="flex-col md:flex-row"
            className="flex-col"
            onChange={handleNonTechTicketTypeChangeValue}
            selectedValue={nonTechTicketType}
          />
        )}
        {ticketType === "nonTechnical" && nonTechTicketType === "request" && (
          <NonTechnicalRequest />
        )}
        {ticketType === "technical" && techTicketType === "request" && (
          <TechnicalRequest />
        )}
        {ticketType === "technical" && techTicketType === "reportProblem" && (
          <TechnicalReport />
        )}
        <TextareaField
          name="description"
          label={
            ticketType === "technical" && techTicketType === "reportProblem"
              ? "وصف الإبلاغ"
              : "وصف الطلب"
          }
          placeholder={
            ticketType === "technical" && techTicketType === "reportProblem"
              ? "اكتب عن وصف الإبلاغ"
              : "اكتب عن وصف الطلب"
          }
          required
        />
        <AttachmentsField
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          files={files}
        />
        <SubmitButton />
      </div>
    </form>
  )
}
