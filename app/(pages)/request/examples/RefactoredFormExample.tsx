"use client"

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { useFormAction } from "@hooks"
import { paths } from "@lib"
import { ChangeEvent, useEffect, useState } from "react"
import { formAction } from "./helpers/formAction"

// Example options for the form
const selectOptions = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
]

export const RefactoredFormExample = () => {
  // Use the unified form hook
  const { state, action /* pending */ } = useFormAction(
    formAction,
    "example-form-toast",
  )

  // Form state variables
  const [files, setFiles] = useState<File[]>([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [duration, setDuration] = useState("1")
  const [selectedOption, setSelectedOption] = useState("1")
  const [notes, setNotes] = useState("")

  // Calculate duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      setDuration(diffDays > 0 ? `${diffDays.toString()} يوم` : "1 يوم")
    }
  }, [startDate, endDate])

  // Success component
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
      className="bg-white rounded-lg text-black text-lg p-4 space-y-4"
    >
      <FormHeader label="نموذج طلب مثال" path={paths.home.href} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <SelectField
            label="الخيار"
            name="option_id"
            types={selectOptions}
            placeholder=""
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          />
        </div>
        <div className="space-y-2">
          <DateField
            required
            label="تاريخ البداية"
            name="date_from"
            date={startDate}
            onChange={(value) => setStartDate(value || new Date())}
          />
        </div>
        <div className="space-y-2">
          <DateField
            required
            label="تاريخ النهاية"
            name="date_to"
            date={endDate}
            onChange={(value) => setEndDate(value || new Date())}
          />
        </div>
        <div className="space-y-2">
          <InputField
            label="المدة"
            name="duration"
            disabled
            value={duration}
            placeholder=""
          />
        </div>
      </div>

      {/* Notes */}
      <TextareaField
        name="notes"
        label="ملاحظات"
        placeholder="ملاحظات حول الطلب"
        required
        value={notes}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setNotes(e.target.value)
        }
      />

      {/* Display filtered errors (example) */}
      {state.errors
        ?.filter((error) => !error.toLowerCase().includes("attachment"))
        .map((error, index) => (
          <p key={index} className="text-red-500 text-sm">
            {error}
          </p>
        ))}

      {/* Attachments */}
      <AttachmentsField
        files={files}
        onFilesChange={(fileList) => setFiles(fileList)}
        setFiles={setFiles}
        required
      />

      <SubmitButton />
    </form>
  )
}
