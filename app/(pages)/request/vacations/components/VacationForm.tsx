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
import { paths } from "@lib"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
// import { getStateAction } from "./helpers/getStateAction" - removed unused import

import type { VacationType } from "@api/schemas/vacation-types/schema"
import { createFileHandler } from "@atoms"
import { FileWithId } from "@types"
import type { State } from "../../../../lib/createData"

const substituteEmployees = [
  { id: 1, name: "عاصم بن رشود العصيمي" },
  { id: 2, name: "محمد بن علي الرفاعي" },
]

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

interface VacationFormProps {
  vacationElements: VacationType[]
}
export const VacationForm = ({ vacationElements }: VacationFormProps) => {
  const [state, setState] = useState<State>(initialState)
  // const pending removed as unused
  const [, setPending] = useState(false)
  const [files, setFiles] = useState<FileWithId[]>([])
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())
  const [birthDate, setBirthDate] = useState(new Date())
  const [deathPerson, setDeathPerson] = useState("")
  const [duration, setDuration] = useState("1")
  const [vacationType, setVacationType] = useState("7")
  const [substituteEmployee, setSubstituteEmployee] = useState("1")

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  const handleVacationTypeChange = (value: string) => {
    setVacationType(value)
  }

  const handleSubstituteEmployeeChange = (value: string) => {
    setSubstituteEmployee(value)
  }

  const handleDateFromChange = (value: Date | undefined) => {
    setDateFrom(value || new Date())
  }

  const handleDatToChange = (value: Date | undefined) => {
    setDateTo(value || new Date())
  }

  const handleBirthDateChange = (value: Date | undefined) => {
    setBirthDate(value || new Date())
  }

  const handleDeathPersonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeathPerson(event.target.value)
  }

  useEffect(() => {
    if (dateFrom && dateTo) {
      const start = new Date(dateFrom)
      const end = new Date(dateTo)

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      setDuration(diffDays > 0 ? `${diffDays.toString()} يوم` : "1 يوم")
    }
  }, [dateFrom, dateTo])

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    setPending(true)
    const result = await formAction(formData)
    setState(result)
    setPending(false)
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
      <FormHeader label="نموذج طلب إجازة" path={paths.vacations.href} />
      {/* <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value="1711"
        className="hidden"
      /> */}
      <div
        className={`grid grid-cols-1 ${
          vacationType === "16" || vacationType === "18"
            ? "md:grid-cols-3"
            : "md:grid-cols-2"
        } gap-4`}
      >
        <div className="space-y-2">
          <SelectField
            label="نوع الاجازة"
            name="holiday_status_id"
            types={vacationElements
              .filter((el) => el.id !== undefined && el.name !== undefined)
              .map((el) => ({
                id: el.id as string | number,
                name: el.name as string,
                display_name: el.display_name,
              }))}
            placeholder=""
            value={vacationType}
            onChange={handleVacationTypeChange}
          />
        </div>
        {vacationType === "16" && (
          <div className="space-y-2">
            <DateField
              required
              label="تاريخ ميلاد الطفل"
              name="childbirth_date"
              date={birthDate}
              onChange={
                handleBirthDateChange as (date: Date | null | undefined) => void
              }
            />
          </div>
        )}

        {vacationType === "18" && (
          <InputField
            label="المتوفى"
            name="death_person"
            placeholder=""
            value={deathPerson}
            onChange={handleDeathPersonChange}
          />
        )}
        <div className="space-y-2">
          <SelectField
            label="الموظف البديل"
            name="substitute_employee_id"
            types={substituteEmployees}
            placeholder=""
            value={substituteEmployee}
            onChange={handleSubstituteEmployeeChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-0">
        <div className="space-y-2">
          <DateField
            required
            label="تاريخ البداية"
            name="date_from"
            date={dateFrom}
            onChange={
              handleDateFromChange as (date: Date | null | undefined) => void
            }
          />
        </div>
        <div className="space-y-2">
          <DateField
            required
            label="تاريخ النهاية"
            name="date_to"
            date={dateTo}
            onChange={
              handleDatToChange as (date: Date | null | undefined) => void
            }
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
      />

      {/* Attachments */}
      <AttachmentsField
        files={files}
        handleFileUpload={fileHandler.upload}
        handleRemoveFile={(index: number) =>
          fileHandler.remove(files[index].id)
        }
        required
        errors={
          state.errors?.filter((error) =>
            error.toLowerCase().includes("attachment"),
          ) || []
        }
      />

      <SubmitButton />
    </form>
  )
}
