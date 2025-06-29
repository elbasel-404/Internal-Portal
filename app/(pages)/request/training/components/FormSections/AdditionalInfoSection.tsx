import { SelectField, TextareaField } from "@components/form"
import { AdditionalInfoSectionProps } from "../FormTypes/types"

export const AdditionalInfoSection = ({
  substituteEmployee,
  setSubstituteEmployee,
  trainingProgram,
  handleTrainingProgramChangeValue,
  substituteEmployees,
}: AdditionalInfoSectionProps) => (
  <div className="space-y-6">
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

    <TextareaField
      label="برنامج الدورة"
      name="programme_session"
      placeholder=""
      required
      value={trainingProgram}
      onChange={handleTrainingProgramChangeValue}
    />
  </div>
)
