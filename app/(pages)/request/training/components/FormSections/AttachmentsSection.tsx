import { AttachmentsField } from "@components/form"
import { AttachmentsSectionProps } from "../FormTypes/types"

export const AttachmentsSection = ({
  files,
  setFiles,
}: AttachmentsSectionProps) => (
  <div className="space-y-6">
    <AttachmentsField
      name="attachment_ids"
      files={files}
      onFilesChange={(fileList) => setFiles(fileList)}
      setFiles={setFiles}
      required
    />
  </div>
)
