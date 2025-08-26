"use client"

import {
  cyberSecurityAtom,
  dataGovernanceAtom,
  institutionalDiscriminationAtom
} from "@atoms"
import { AttachmentsField, RadioField } from "@components/form"
import { YesNoOption } from "@types"
import { useAtom } from "jotai"
import { useState } from "react"

export const RequirementsSection = () => {
  return (
    <div className="space-y-6">
      <InstitutionalRequirements />
      <SecurityRequirements />
      <DataGovernanceRequirements />
    </div>
  )
}

const InstitutionalRequirements = () => {
  const [value, setValue] = useAtom(institutionalDiscriminationAtom)
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بالتميز المؤسسي؟"
        name="is_institutional_excellence"
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" },
        ]}
        required={true}
        labelStyle="font-medium text-base"
        radioStyle="flex flex-col sm:flex-row"
        className="flex-col border-t border-cloudGray pt-2"
        selectedValue={value}
        onChange={(selected) => setValue(selected as YesNoOption)}
      />
      {value === "yes" && (
        <AttachmentsField
          name="inst_attachment_ids"
          files={files}
          onFilesChange={(fileList) => setFiles(fileList)}
          setFiles={setFiles}
          required={false}
        />
      )}
    </div>
  )
}

const SecurityRequirements = () => {
  const [value, setValue] = useAtom(cyberSecurityAtom)
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بالامن السيبراني؟"
        name="is_cyber_security"
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" },
        ]}
        required={true}
        labelStyle="font-medium text-base"
        radioStyle="flex flex-col sm:flex-row"
        className="flex-col border-t border-cloudGray pt-2"
        selectedValue={value}
        onChange={(selected) => setValue(selected as YesNoOption)}
      />
      {value === "yes" && (
        <AttachmentsField
          name="security_attachment_ids"
          files={files}
          onFilesChange={(fileList) => setFiles(fileList)}
          setFiles={setFiles}
          required={false}
        />
      )}
    </div>
  )
}

const DataGovernanceRequirements = () => {
  const [value, setValue] = useAtom(dataGovernanceAtom)
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بحوكمة البيانات؟"
        name="is_data_governance"
        options={[
          { value: "yes", label: "نعم" },
          { value: "no", label: "لا" },
        ]}
        required={true}
        labelStyle="font-medium text-base"
        radioStyle="flex flex-col sm:flex-row"
        className="flex-col border-t border-cloudGray pt-2"
        selectedValue={value}
        onChange={(selected) => setValue(selected as YesNoOption)}
      />
      {value === "yes" && (
        <AttachmentsField
          name="data_governance_ids"
          files={files}
          onFilesChange={(fileList) => setFiles(fileList)}
          setFiles={setFiles}
          required={false}
        />
      )}
    </div>
  )
}
