import { EmployeeMembersField } from "@api/schemas/index"
import { DateField, SelectField } from "@components/form"

interface AdditionalInfoSectionProps {
  birthDate: Date
  relationTypeValue: string
  relativeRelationField: EmployeeMembersField[]
  onBirthDateChange: (date: Date) => void
  onRelationTypeChange: (value: string) => void
}

export const AdditionalInfoSection = ({
  birthDate,
  relationTypeValue,
  relativeRelationField,
  onBirthDateChange,
  onRelationTypeChange,
}: AdditionalInfoSectionProps) => {
  return (
    <>
      <DateField
        date={birthDate}
        onChange={(value) => onBirthDateChange(value || new Date())}
        label="تاريخ الميلاد"
        name="birthday"
        required
      />
      <SelectField
        name="relative_relation"
        label="صلة القرابة"
        types={relativeRelationField.map((item) => ({
          id: item.id,
          name: item.name ?? "",
        }))}
        value={relationTypeValue}
        placeholder=""
        onChange={onRelationTypeChange}
      />
    </>
  )
}
