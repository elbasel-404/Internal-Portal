import { AttachmentsField } from '@components/form';
import { AttachmentsSectionProps } from '../FormTypes/types';

export const AttachmentsSection = ({
  files,
  fileHandler,
}: AttachmentsSectionProps) => (
  <div className='space-y-6'>
    <AttachmentsField
      files={files}
      handleFileUpload={fileHandler.upload}
      handleRemoveFile={(index: number) => fileHandler.remove(files[index].id)}
      required
    />
  </div>
);
