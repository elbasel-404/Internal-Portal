"use client"

import { DeputationType, SubstituteEmployees } from "@api/schemas/index"
import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  RadioField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@components/form"
import { paths } from "@lib"
import { DeputationPlace } from "@types"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { State } from "../../../../../lib/createData"
import {
  Cities,
  DeputationPlaces,
  RequestTypes,
  TrainingRequests,
  TransportationTypes,
} from "../config"
import { formAction } from "../helpers/formAction"
import { PlacesTable } from "./PlacesTable"

const initialState: State = {
  success: false,
  errors: null,
  id: null,
}

interface DeputationFormProps {
  deputationType: DeputationType[]
  substituteEmployees: SubstituteEmployees[]
}

export const DeputationForm = ({
  deputationType,
  substituteEmployees,
}: DeputationFormProps) => {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pending = isPending || isSubmitting
  const [files, setFiles] = useState<File[]>([])
  const [requestType, setRequestType] = useState<string>("external")
  const [requestTypeCaption, setRequestTypeCaption] = useState<string>("خارج")
  const [transportationType, setTransportationType] = useState<string>("ByAir")
  const [showKilometers, setShowKilometers] = useState<boolean>(false)
  const [selectedDeputationType, setSelectedDeputationType] =
    useState<string>("")
  const [taskName, setTaskName] = useState<string>("")
  const [taskDetails, setTaskDetails] = useState<string>("")
  const [cityId, setCityId] = useState<string>("")
  const [deputationStartDate, setDeputationStartDate] = useState(new Date())
  const [deputationEndDate, setDeputationEndDate] = useState(new Date())
  const [duration, setDeputationDuration] = useState<number>(0)
  const [isInternal, setIsInternal] = useState<boolean>(false)
  const [issueVisa, setIssueVisa] = useState<boolean>(false)
  const [substituteEmployee, setSubstituteEmployee] = useState<string>("")
  const [showTrainingRequestNumber, setTrainingRequestNumber] =
    useState<boolean>(false)
  const [places, updatePlaces] = useState<DeputationPlace[]>(DeputationPlaces)

  const handleRequestTypeChange = (value: string) => {
    setRequestType(value)
    setRequestTypeCaption(value === "internal" ? "داخل" : "خارج")
    setIsInternal(value === "internal")
  }

  const handleTransportationTypeChange = (value: string) => {
    setTransportationType(value)
    setShowKilometers(value === "Overland")
  }

  const handleDeputationTypeChange = (value: string) => {
    setSelectedDeputationType(value)
    setTrainingRequestNumber(value === "7")
  }

  const handleDeputationStartDateChange = (value: Date | undefined) => {
    setDeputationStartDate(value || new Date())
  }

  const handleDeputationEndDateChange = (value: Date | undefined) => {
    setDeputationEndDate(value || new Date())
    // Calculate the difference in days between the two dates
    const startDate = new Date(deputationStartDate)
    if (value) {
      const endDate = new Date(value)
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDeputationDuration(diffDays)
    } else {
      setDeputationDuration(0)
    }
  }

  const handleRemovePlace = (id: string) => {
    const updatedPlaces = places.filter((place) => place.id !== id)
    updatePlaces(updatedPlaces)
  }
  const handleAddPlace = (newPlace: {
    id: string
    name: string
    city: string
  }) => {
    const updatedPlaces = [...places, newPlace]
    updatePlaces(updatedPlaces)
  }

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(
        (file) => new File([file], file.name),
      )
      setFiles([...files, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors[0])
  }, [state])

  const action = async (formData: FormData) => {
    setIsSubmitting(true)
    toast.loading("جاري انشاء الطلب", { id: "vacation-form-pending" })

    startTransition(async () => {
      const result = await formAction(formData)
      setState(result)
      setIsSubmitting(false)
      toast.dismiss("vacation-form-pending")
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
    <form action={action} className="bg-white rounded-md">
      <FormHeader label="نموذج طلب انتداب" path={paths.workDocument.href} />
      <div className="p-4 space-y-6">
        <div className="gird grid-cols-12 space-y-4">
          <RadioField
            label="انتداب"
            name="type"
            options={RequestTypes}
            labelStyle="text-base"
            selectedValue={requestType}
            required
            inline={false}
            onChange={handleRequestTypeChange}
          />
          <div className={`bg-primary-opacity py-4 px-4 rounded-lg`}>
            <p className={`text-primary font-medium`}>
              {requestTypeCaption} المملكة العربية السعودية
            </p>
          </div>

          <RadioField
            label="وسيلة النقل"
            name="transportation_type"
            options={TransportationTypes}
            labelStyle="text-base"
            selectedValue={transportationType}
            required
            inline={false}
            onChange={handleTransportationTypeChange}
          />
          {showKilometers && (
            <InputField
              label="عدد الكليلومترات"
              name="distance"
              placeholder=""
              required={showKilometers}
            />
          )}
          <SelectField
            name="deputation_type"
            label="نوع الانتداب"
            placeholder="__"
            types={deputationType.map((item) => ({
              id: String(item.id),
              name: String(item.name),
            }))}
            value={selectedDeputationType}
            onChange={handleDeputationTypeChange}
          />
          {showTrainingRequestNumber && (
            <SelectField
              name="training_request_id"
              label="رقم طلب التدريب"
              placeholder="__"
              types={TrainingRequests}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateField
            required
            label="تاريخ بداية الانتداب"
            name="date_from"
            date={deputationStartDate}
            onChange={
              handleDeputationStartDateChange as (
                date: Date | null | undefined,
              ) => void
            }
          />
          <DateField
            required
            name="date_to"
            label="تاريخ نهاية الانتداب"
            date={deputationEndDate}
            onChange={
              handleDeputationEndDateChange as (
                date: Date | null | undefined,
              ) => void
            }
          />
          <InputField
            label="المدة بالأيام"
            name="duration"
            placeholder=""
            value={duration}
            required
            disabled
          />
        </div>
        <div className="gird grid-cols-12 space-y-4">
          {isInternal ? (
            <SelectField
              name="city_id"
              label="المدينة"
              placeholder="__"
              types={Cities}
              required={isInternal}
              value={cityId}
              onChange={(value) => setCityId(value)}
            />
          ) : (
            <PlacesTable
              data={places}
              issueVisa={issueVisa}
              onChangeIssueVisa={(value) => setIssueVisa(value)}
              onRemove={(id) => handleRemovePlace(id)}
              onAdd={() => handleAddPlace({ id: "", name: "", city: "" })} // Add a new place
            />
          )}

          <InputField
            name="task_name"
            label="المهمة"
            placeholder=""
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <TextareaField
            label="تفاصيل المهمة"
            name="note"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            required={false}
          />

          {!isInternal && (
            <SelectField
              label="الموظف البديل"
              name="substitute_employee_id"
              types={substituteEmployees.map(({ id, complete_name }) => ({
                id: id ?? "",
                name: complete_name ?? "",
              }))}
              placeholder="___"
              value={substituteEmployee}
              onChange={(value) => setSubstituteEmployee(value)}
            />
          )}
        </div>

        <AttachmentsField
          label="المرفقات"
          files={files}
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
        />

        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
