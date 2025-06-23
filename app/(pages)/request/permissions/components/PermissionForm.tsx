"use client"

import { createFileHandler } from "@atoms"
import {
  AttachmentsField,
  CheckboxField,
  DateField,
  FormHeader,
  SelectField,
  SubmitButton,
  TextareaField,
  TimeField,
} from "@components/form"
import { paths } from "@lib"
import { FileWithId } from "@types"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

const PermissionTypes = [
  { id: 1, name: "الاستئذان لعمل" },
  { id: 2, name: "الاستئذان شخصى" },
]

export const PermissionForm = () => {
  const [state, setState] = useState<State>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pending = isPending || isSubmitting
  const [files, setFiles] = useState<FileWithId[]>([])
  const [isMultipleDays, setIsMultipleDays] = useState(false)
  const [permissionTypeValue, setPermissionTypeValue] = useState<string>("")
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date())
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  const handlePermissionTypeChange = (value: string) => {
    setPermissionTypeValue(value) // Update the permission type value
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "permission-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("permission-form-pending")
    })
  }

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
      <FormHeader label="نموذج طلب استئذان" path={paths.permissions.href} />
      {/* <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value="1722"
        className="hidden"
      /> */}
      <div className="py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            name="type_id"
            label="نوع الإستئذان"
            types={PermissionTypes}
            value={permissionTypeValue}
            onChange={handlePermissionTypeChange}
          />
          {permissionTypeValue === "1" && (
            <CheckboxField
              name="more_one_day"
              label="أكثر من يوم"
              required={false}
              checked={isMultipleDays}
              onChange={(value) => setIsMultipleDays(value)}
              className="flex justify-between md:justify-start items-center md:gap-x-36 mt-2"
            />
          )}

          {isMultipleDays ? (
            <>
              <DateField
                date={startDate}
                onChange={(value) => setStartDate(value || new Date())}
                name="date_from"
                label="تاريخ البداية"
                required
              />
              <DateField
                date={endDate}
                onChange={(value) => setEndDate(value || new Date())}
                name="date_to"
                label="تاريخ النهاية"
                required
              />
            </>
          ) : (
            <div
            // className={`${permissionTypeValue === '1' && 'col-span-full'}`}
            >
              <DateField
                date={startDate}
                onChange={(value) => setStartDate(value || new Date())}
                name="date_from"
                label="التاريخ"
                required
              />
            </div>
          )}

          {/* {!isMultipleDays && ( */}
          <>
            <TimeField
              time={startTime}
              onChange={(value) => setStartTime(value || new Date())}
              name="hour_from"
              label="من الساعة"
              required
            />
            <TimeField
              time={endTime}
              onChange={(value) => setEndTime(value || new Date())}
              name="hour_to"
              label="إلى الساعة"
              required
            />
          </>
          {/* )} */}
        </div>
        <TextareaField
          name="description"
          label="سبب الاستئذان"
          required={false}
        />
        {permissionTypeValue === "1" && (
          <AttachmentsField
            files={files}
            handleFileUpload={fileHandler.upload}
            handleRemoveFile={(index: number) =>
              fileHandler.remove(files[index].id)
            }
            errors={
              state.errors?.filter((error) =>
                error.toLowerCase().includes("attachment"),
              ) || []
            }
          />
        )}
        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
