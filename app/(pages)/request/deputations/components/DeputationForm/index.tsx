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
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { State } from "../../../../../lib/createData"
import {
  Cities,
  RequestTypes,
  TrainingRequests,
  TransportationTypes,
  TravelDaysSetting,
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
  deputationLocation: { country_id: string; city_name: string }[]
}

export const DeputationForm = ({
  deputationType,
  substituteEmployees,
  deputationLocation,
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
  const [distance, setDistance] = useState(0)
  const [travelDays, setTravelDays] = useState(0)
  const [travelDaysSetting, setTravelDaysSetting] = useState("")
  const [duration, setDeputationDuration] = useState<number>(0)
  const [isInternal, setIsInternal] = useState<boolean>(false)
  const [issueVisa, setIssueVisa] = useState<boolean>(false)
  const [substituteEmployee, setSubstituteEmployee] = useState<string>("")
  const [showTrainingRequestNumber, setTrainingRequestNumber] =
    useState<boolean>(false)

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
            required={false}
            inline={false}
            onChange={handleTransportationTypeChange}
          />
          {showKilometers && (
            <InputField
              label="عدد الكليلومترات"
              name="distance"
              placeholder=""
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
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
            required
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
              data={deputationLocation}
              issueVisa={issueVisa}
              onChangeIssueVisa={(value) => setIssueVisa(value)}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="أيام السفر"
              name="travel_days"
              disabled
              value={travelDays}
              onChange={(e) => setTravelDays(Number(e.target.value))}
            />

            <SelectField
              label="إعدادات تواريخ السفر"
              name="travel_days_setting"
              placeholder=""
              types={TravelDaysSetting}
              value={travelDaysSetting}
              onChange={(value) => setTravelDaysSetting(value)}
            />
          </div>

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
          onFilesChange={(fileList) => setFiles(fileList)}
          setFiles={setFiles}
        />

        <SubmitButton disabled={pending} loading={pending} />
      </div>
    </form>
  )
}
