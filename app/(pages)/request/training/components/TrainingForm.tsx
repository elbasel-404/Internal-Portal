"use client"

import { SubstituteEmployees, TrainingField } from "@api/schemas/index"
import {
  createFileHandler,
  dateFromAtom,
  dateToAtom,
  durationAtom,
  trainingMethodAtom,
} from "@atoms"
import { FormHeader, SubmitButton } from "@components/form"
import { paths } from "@lib"
import { FileWithId, TrainingCourse } from "@types"
import { useAtom } from "jotai"
import { ChangeEvent, useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import {
  AdditionalInfoSection,
  AttachmentsSection,
  DateDurationSection,
  ExtendedTrainingSection,
  TrainingCenterSection,
  TrainingDetailsSection,
  TrainingLocationSection,
  TrainingTypeSection,
} from "./FormSections"
import { FileHandlerType, SectionProps } from "./FormTypes/types"
import { formAction } from "./helpers/formAction"
import { getStateAction } from "./helpers/getStateAction"
import { initialState } from "./helpers/initialState"
import { State } from "./helpers/State"

interface TrainingFormProps {
  trainingCourses: TrainingCourse[]
  trainingCenterFields: TrainingField[]
  trainingTravelDaysSettingsFields: TrainingField[]
  trainingTypeFields: TrainingField[]
  trainingCountryFields: TrainingField[]
  trainingCityFields: TrainingField[]
  substituteEmployees: SubstituteEmployees[]
}

const stateAction = getStateAction<State>(formAction)

export const TrainingForm = ({
  trainingCourses,
  trainingCenterFields,
  trainingCityFields,
  trainingCountryFields,
  trainingTravelDaysSettingsFields,
  trainingTypeFields,
  substituteEmployees,
}: TrainingFormProps) => {
  // State definitions
  const [state, action, pending] = useActionState(stateAction, initialState)
  const [files, setFiles] = useState<FileWithId[]>([])
  const [trainingName, setTrainingName] = useState<string>("")
  const [trainingType, setTrainingType] = useState<string>("")
  const [trainingCenter, setTrainingCenter] = useState<string>("")
  const [isOtherTrainingCenter, setIsOtherTrainingCenter] =
    useState<boolean>(false)
  const [extendedTraining, setExtendedTraining] = useState<boolean>(false)
  const [trainingCenterName, setTrainingCenterName] = useState<string>("")
  const [trainingNature, setTrainingNature] = useState<string[]>([])
  const [trainingProgram, setTrainingProgram] = useState<string>("")
  const [trainingCountry, setTrainingCountry] = useState<string>("")
  const [trainingCity, setTrainingCity] = useState<string>("")
  const [trainingCityId, setTrainingCityId] = useState<string>("")
  const [travelDays, setTravelDays] = useState<string>("1")
  const [trainingAssignment, setTrainingAssignment] = useState<string>("")
  const [substituteEmployee, setSubstituteEmployee] = useState<string>("")
  const [dateFrom, setDateFrom] = useAtom(dateFromAtom)
  const [dateTo, setDateTo] = useAtom(dateToAtom)
  const [duration] = useAtom(durationAtom)
  const [trainingMethod, setTrainingMethod] = useAtom(trainingMethodAtom)

  // Handlers
  const fileHandler: FileHandlerType = createFileHandler(
    () => files,
    (newFiles: FileWithId[]) => setFiles(newFiles),
  )

  const handleTrainingNameChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setTrainingName(event.target.value)
  }

  const handleTrainingCenterNameChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setTrainingCenterName(event.target.value)
  }

  const handleTrainingProgramChangeValue = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTrainingProgram(event.target.value)
  }

  const handleTravelDaysChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setTravelDays(event.target.value)
  }

  // Form sections
  const sections: SectionProps[] = [
    {
      component: (
        <TrainingTypeSection
          trainingType={trainingType}
          setTrainingType={setTrainingType}
          trainingNature={trainingNature}
          setTrainingNature={setTrainingNature}
          trainingTypeFields={trainingTypeFields}
        />
      ),
    },
    {
      component: (
        <TrainingDetailsSection
          trainingName={trainingName}
          handleTrainingNameChangeValue={handleTrainingNameChangeValue}
          trainingMethod={trainingMethod}
          setTrainingMethod={setTrainingMethod}
        />
      ),
    },
    ...(!extendedTraining
      ? [
          {
            component: (
              <DateDurationSection
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                duration={duration}
              />
            ),
          },
        ]
      : []),
    {
      component: (
        <TrainingCenterSection
          isOtherTrainingCenter={isOtherTrainingCenter}
          setIsOtherTrainingCenter={setIsOtherTrainingCenter}
          trainingCenter={trainingCenter}
          setTrainingCenter={setTrainingCenter}
          trainingCenterName={trainingCenterName}
          handleTrainingCenterNameChangeValue={
            handleTrainingCenterNameChangeValue
          }
          trainingCentersField={trainingCenterFields}
        />
      ),
    },
    {
      component: (
        <TrainingLocationSection
          trainingCountry={trainingCountry}
          setTrainingCountry={setTrainingCountry}
          trainingCity={trainingCity}
          setTrainingCity={setTrainingCity}
          trainingCityId={trainingCityId}
          setTrainingCityId={setTrainingCityId}
          travelDays={travelDays}
          trainingAssignment={trainingAssignment}
          setTrainingAssignment={setTrainingAssignment}
          trainingMethod={trainingMethod}
          handleTravelDaysChangeValue={handleTravelDaysChangeValue}
          trainingCitiesField={trainingCityFields}
          trainingCountriesField={trainingCountryFields}
          trainingTravelDaysSettingsFields={trainingTravelDaysSettingsFields}
          extendedTraining={extendedTraining}
        />
      ),
    },
    {
      component: (
        <AdditionalInfoSection
          substituteEmployee={substituteEmployee}
          setSubstituteEmployee={setSubstituteEmployee}
          trainingProgram={trainingProgram}
          handleTrainingProgramChangeValue={handleTrainingProgramChangeValue}
          substituteEmployees={substituteEmployees}
        />
      ),
    },
    {
      component: <AttachmentsSection files={files} fileHandler={fileHandler} />,
    },
    {
      component: (
        <ExtendedTrainingSection
          extendedTraining={extendedTraining}
          setExtendedTraining={setExtendedTraining}
          trainingCourses={trainingCourses}
        />
      ),
    },
  ]

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
    <form
      action={action}
      className="bg-white rounded-lg text-black text-lg p-4 space-y-4"
    >
      <FormHeader label="نموذج طلب دورة تدريبية" path={paths.training.href} />
      {/* <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value="1351"
        className="hidden"
      /> */}
      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          {section.component}
        </div>
      ))}

      <SubmitButton />
    </form>
  )
}
