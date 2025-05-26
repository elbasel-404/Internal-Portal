'use client';

import { createFileHandler } from '@atoms';
import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SubmitButton,
} from '@components/form';
import { paths } from '@lib';
import { FileWithId } from '@types';
import { useState } from 'react';

export const PassportForm = () => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [passportExpirationDate, setPassportExpirationDate] = useState<Date>(
    new Date()
  );

  const fileHandler = createFileHandler(
    () => files,
    (newFiles) => setFiles(newFiles)
  );

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
          handleFileUpload={fileHandler.upload}
          handleRemoveFile={(index: number) =>
            fileHandler.remove(files[index].id)
          }
          required
        />

        <SubmitButton />
      </div>
    </form>
  );
};
