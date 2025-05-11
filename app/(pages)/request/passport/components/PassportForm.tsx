'use client';

import {
    AttachmentsField,
    DateField,
    FormHeader,
    InputField,
    SubmitButton,
} from '@components/form';
import { paths } from '@lib';
import { useState } from 'react';

export const PassportForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [passportExpirationDate, setPassportExpirationDate] = useState<Date>(
    new Date()
  );

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(
        (file) => new File([file], file.name)
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <form className='bg-white rounded-md'>
      <FormHeader label='نموذج طلب بيانات الجواز' path={paths.passports.href} />
      <div className='p-4 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField
            name='passportNumber'
            label='رقم جواز السفر'
            placeholder=''
            required
          />
          <DateField
            date={passportExpirationDate}
            onChange={(value) => setPassportExpirationDate(value || new Date())}
            label='تاريخ انتهاء جواز السفر'
            name='passportExpirationDate'
            required
          />
        </div>

        <AttachmentsField
          label='صورة جواز السفر'
          files={files}
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          required
        />

        <SubmitButton />
      </div>
    </form>
  );
};
