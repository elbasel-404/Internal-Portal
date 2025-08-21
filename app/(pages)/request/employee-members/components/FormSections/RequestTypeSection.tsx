import { EmployeeMembersField } from "@api/schemas/index"
import { SelectField } from "@components/form"

interface RequestTypeSectionProps {
  requestTypeField: EmployeeMembersField[]
  memberField: EmployeeMembersField[]
  requestTypeValue: string
  member: string
  required?: boolean
  onRequestTypeChange: (value: string) => void
  onMemberChange: (value: string) => void
}

export const RequestTypeSection = ({
  requestTypeField,
  memberField,
  requestTypeValue,
  member,
  onRequestTypeChange,
  onMemberChange,
  required,
}: RequestTypeSectionProps) => {
  return (
    <>
      <SelectField
        name="type"
        label="نوع الطلب"
        types={requestTypeField.map((item) => ({
          id: item.id,
          name: item.name ?? "",
        }))}
        value={requestTypeValue}
        onChange={onRequestTypeChange}
        required={required}
      />
      {requestTypeValue !== "add" && (
        <SelectField
          name="member"
          label="اختيار الفرد"
          types={memberField.map((item) => ({
            id: item.id,
            name: item.individual_complete_name ?? "",
          }))}
          value={member}
          placeholder="__"
          onChange={onMemberChange}
          required={required}
        />
      )}
    </>
  )
}
