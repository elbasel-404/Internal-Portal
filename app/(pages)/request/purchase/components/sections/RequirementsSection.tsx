"use client"

import {
  createFileHandler,
  cyberSecurityAtom,
  dataFilesAtom,
  dataGovernanceAtom,
  instFilesAtom,
  institutionalDiscriminationAtom,
  securityFilesAtom,
} from "@atoms"
import { AttachmentsField, RadioField } from "@components/form"
import { YesNoOption } from "@types"
import { useAtom } from "jotai"

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
  const [files, setFiles] = useAtom(instFilesAtom)

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بالتميز المؤسسي؟"
        name="institutional_discrimination"
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
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required={false}
        />
      )}
    </div>
  )
}

const SecurityRequirements = () => {
  const [value, setValue] = useAtom(cyberSecurityAtom)
  const [files, setFiles] = useAtom(securityFilesAtom)

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بالامن السيبراني؟"
        name="cyber_security"
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
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required={false}
        />
      )}
    </div>
  )
}

const DataGovernanceRequirements = () => {
  const [value, setValue] = useAtom(dataGovernanceAtom)
  const [files, setFiles] = useAtom(dataFilesAtom)

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles),
  )

  return (
    <div className="space-y-4">
      <RadioField
        label="هل يوجد متطلبات متعلقة بحوكمة البيانات؟"
        name="data_governance"
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
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required={false}
        />
      )}
    </div>
  )
}
