"use client"

import { EmployeeMembersField } from "@api/schemas/index"
import {
  AttachmentsField,
  FormHeader,
  SubmitButton,
} from "@components/form"
import { paths } from "@lib"
import { AdditionalInfoSection } from "./FormSections/AdditionalInfoSection"
import { PersonalInfoSection } from "./FormSections/PersonalInfoSection"
import { RequestTypeSection } from "./FormSections/RequestTypeSection"
import { SuccessMessage } from "./FormSections/SuccessMessage"
import { useEmployeeMembersForm } from "./hooks/useEmployeeMembersForm"

interface EmployeeMembersFormProps {
  employeeId: string | undefined
  memberField: EmployeeMembersField[]
  requestTypeField: EmployeeMembersField[]
  relativeRelationField: EmployeeMembersField[]
}

export const EmployeeMembersForm = ({
  employeeId,
  memberField,
  relativeRelationField,
  requestTypeField,
}: EmployeeMembersFormProps) => {
  const {
    files,
    state,
    requestTypeValue,
    relationTypeValue,
    member,
    birthDate,
    formData,
    action,
    fileHandler,
    handleRequestTypeChange,
    handleRelationTypeChange,
    handleMemberChange,
    handleInputChange,
    setBirthDate,
  } = useEmployeeMembersForm(memberField)

  if (state.success) {
    return <SuccessMessage requestId={state.id} />
  }

  return (
    <form action={action} className="bg-white rounded-md">
      <FormHeader
        label="نموذج طلب تحديث أفراد الأسرة"
        path={paths.employeeMembers.href}
      />
      <input
        type="text"
        name="employee_id"
        id="employee_id"
        hidden
        aria-hidden
        readOnly
        value={employeeId}
        className="hidden"
      />
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RequestTypeSection
            requestTypeField={requestTypeField}
            memberField={memberField}
            requestTypeValue={requestTypeValue}
            member={member}
            onRequestTypeChange={handleRequestTypeChange}
            onMemberChange={handleMemberChange}
          />
          
          <PersonalInfoSection
            formData={formData}
            requestTypeValue={requestTypeValue}
            onInputChange={handleInputChange}
          />
          
          <AdditionalInfoSection
            birthDate={birthDate}
            relationTypeValue={relationTypeValue}
            relativeRelationField={relativeRelationField}
            onBirthDateChange={setBirthDate}
            onRelationTypeChange={handleRelationTypeChange}
          />
        </div>

        <AttachmentsField
          files={files}
          name="attachment_ids"
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required
        />

        <SubmitButton />
      </div>
    </form>
  )
}