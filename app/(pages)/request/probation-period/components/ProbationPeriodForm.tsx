"use client"

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
import { ProbationPeriodEmployees, ProbationPeriodFields } from "@types"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { formAction } from "./helpers/formAction"
import { getStateAction } from "./helpers/getStateAction"
import { initialState } from "./helpers/initialState"
import { State } from "./helpers/State"

interface ProbationPeriodFormProps {
  probationPeriodEmployees: ProbationPeriodEmployees[]
  probationPeriodQuestions: ProbationPeriodFields[]
  probationPeriodAnswers: ProbationPeriodFields[]
  probationPeriodRecommendation: ProbationPeriodFields[]
}

const stateAction = getStateAction<State>(formAction)

export const ProbationPeriodForm = ({
  probationPeriodEmployees,
  probationPeriodQuestions,
  probationPeriodAnswers,
  probationPeriodRecommendation,
}: ProbationPeriodFormProps) => {
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [files, setFiles] = useState<File[]>([])
  const [employeeName, setEmployeeName] = useState("")
  const [jobNumber, setJobNumber] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [managment, setManagment] = useState("")
  const [appointmentDate, setAppointmentDate] = useState(new Date())
  const [probationPeriodEndDate, setProbationPeriodEndDate] = useState(
    new Date(),
  )
  const [recommendation, setRecommendation] = useState("")
  const [organizationCulture, setOrganizationCulture] = useState("")
  const [workOutputQuality, setWorkOutputQuality] = useState("")
  const [responsibility, setResponsibility] = useState("")
  const [initiative, setInitiative] = useState("")
  const [policyCompliance, setPolicyCompliance] = useState("")
  const [teamWork, setTeamWork] = useState("")
  const [communicationSkills, setCommunicationSkills] = useState("")

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

  const handleEmployeeChange = (value: string) => {
    setEmployeeName(value)

    const selected = probationPeriodEmployees.find((emp) => emp.id === value)
    if (selected) {
      setJobNumber(selected.jobNumber)
      setJobTitle(selected.jobTitle)
      setManagment(selected.department)
      setAppointmentDate(new Date(selected.appointmentDate))
      setProbationPeriodEndDate(new Date(selected.endProbationPeriodDate))
    }
  }

  useEffect(() => {
    const { success, errors } = state
    if (success) toast.success("تم انشاء الطلب بنجاح")
    if (errors) toast.error(errors)
  }, [state])

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", {
        id: "vacation-form-loading-toast",
      })
    } else {
      toast.dismiss("vacation-form-loading-toast")
    }
  }, [pending])

  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }

  return (
    <form action={action} className="bg-white rounded-md p-4">
      <FormHeader
        label="نموذج طلب تقييم فترة التجربة"
        path={paths.probationPeriod.href}
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            name="employee_id"
            label="اسم الموظف"
            placeholder="..."
            types={probationPeriodEmployees.map(({ id, employeeName }) => ({
              id,
              name: employeeName,
            }))}
            value={employeeName}
            onChange={handleEmployeeChange}
            required
          />
          <InputField
            name="jobNumber"
            label="الرقم الوظيفى"
            placeholder=""
            value={jobNumber}
            disabled
          />
          <InputField
            name="jobTitle"
            label="المسمى الوظيفى"
            placeholder=""
            value={jobTitle}
            disabled
          />
          <InputField
            name="managment"
            label="الإدارة/القطاع"
            placeholder=""
            value={managment}
            disabled
          />
          <DateField
            name="appointmentDate"
            label="تاريخ التعيين"
            date={appointmentDate}
            required={false}
          />
          <DateField
            name="probationPeriodEndDate"
            label="تاريخ انتهاء فترة التجربة"
            date={probationPeriodEndDate}
            required={false}
          />
        </div>
        <RadioField
          label="التوصية:"
          name="recommendation"
          options={probationPeriodRecommendation.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          required={true}
          selectedValue={recommendation}
          onChange={(value) => setRecommendation(value)}
          labelStyle="font-medium text-base"
          radioStyle="flex-col md:flex-row"
          className="flex-col md:flex-row md:items-center"
        />
        <div className="bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
          <h2 className="text-primary font-bold text-xl">
            معايير تقييم فترة التجربة
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {probationPeriodQuestions?.slice(0, 4).map((question, index) => (
            <div key={question.id} className="space-y-2">
              <input
                type="hidden"
                name={"question_id" + question.id}
                value={question.id}
              />
              <SelectField
                label={question.name}
                name={"answer_id" + question.id}
                placeholder=""
                types={probationPeriodAnswers ?? []}
                value={
                  {
                    0: organizationCulture,
                    1: workOutputQuality,
                    2: responsibility,
                    3: initiative,
                  }[index] || ""
                }
                onChange={(value) => {
                  switch (index) {
                    case 0:
                      setOrganizationCulture(value)
                      break
                    case 1:
                      setWorkOutputQuality(value)
                      break
                    case 2:
                      setResponsibility(value)
                      break
                    case 3:
                      setInitiative(value)
                      break
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {probationPeriodQuestions?.slice(4, 7).map((question, index) => (
            <div key={question.id} className="space-y-2">
              <input
                type="hidden"
                name={"question_id" + question.id}
                value={question.id}
              />
              <SelectField
                label={question.name}
                name={"answer_id" + question.id}
                placeholder=""
                types={probationPeriodAnswers ?? []}
                value={
                  {
                    0: policyCompliance,
                    1: teamWork,
                    2: communicationSkills,
                  }[index] || ""
                }
                onChange={(value) => {
                  switch (index) {
                    case 0:
                      setPolicyCompliance(value)
                      break
                    case 1:
                      setTeamWork(value)
                      break
                    case 2:
                      setCommunicationSkills(value)
                      break
                  }
                }}
              />
            </div>
          ))}
        </div>

        <TextareaField
          name="notes"
          label="ملاحظات"
          placeholder="ملاحظات حول الطلب"
          required={false}
        />
        <AttachmentsField
          name="attachment_ids"
          files={files}
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          required
        />
        <SubmitButton />
      </div>
    </form>
  )
}
