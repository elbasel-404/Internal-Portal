"use client"

import { RelativeRelationElement } from "@api/schemas/relative-relation/schema"
import { createFileHandler } from "@atoms"
import {
  AttachmentsField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { FileWithId } from "@types"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { State } from "./helpers/State"
import { formAction } from "./helpers/formAction"

const types = [
  { id: "add", name: "إضافة" },
  { id: "exclude", name: "استبعاد" },
]

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

interface MedicalFormProps {
  relativeRelation: RelativeRelationElement[]
}

export const MedicalForm = ({ relativeRelation }: MedicalFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pending = isPending || isSubmitting
  const [files, setFiles] = useState<FileWithId[]>([])
  const [requestType, setRequestType] = useState("")
  const [relation, setRelation] = useState("")
  const [individualName, setIndividualName] = useState("")
  const [individualEnglishName, setIndividualEnglishName] = useState("")

  const handleRequestTypeChange = (value: string) => {
    setRequestType(value)
  }

  const handleRelationChange = (value: string) => {
    setRelation(value)
  }

  const handleIndividualNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndividualName(event.target.value)
  }

  const handleIndividualEnglishNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setIndividualEnglishName(event.target.value)
  }

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors)
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "medical-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("medical-form-pending")
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
      <FormHeader
        label="نموذج طلب تأمين طبي"
        path={paths.medicalInsurance.href}
      />
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
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            name="request_type"
            label="نوع الطلب"
            types={types}
            value={requestType}
            onChange={handleRequestTypeChange}
            required
          />
          <SelectField
            name="relative_relation"
            label="صلة القرابة"
            placeholder=""
            types={relativeRelation.map((r) => ({
              id: r.id ?? "",
              name: r.name ?? "",
            }))}
            value={relation}
            onChange={handleRelationChange}
            required
          />
        </div>
        <InputField
          name="individual_complete_name"
          label="الاسم الكامل للفرد بالعربية"
          placeholder="..."
          disabled={false}
          required
          value={individualName}
          onChange={handleIndividualNameChange}
        />
        <InputField
          name="individual_english_name"
          label="الاسم الكامل للفرد بالإنجليزية"
          placeholder="..."
          disabled={false}
          required={false}
          value={individualEnglishName}
          onChange={handleIndividualEnglishNameChange}
        />
        <input
          type="text"
          name="insurance_amount"
          hidden
          aria-hidden
          readOnly
          value="12"
          className="hidden"
        />
        <AttachmentsField
          files={files}
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required
        />
        <SubmitButton loading={pending} />
      </div>
    </form>
  )
}
