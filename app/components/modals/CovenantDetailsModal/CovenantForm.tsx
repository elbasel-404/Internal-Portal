'use client';

import { AttachmentsField, InputField, SelectField } from '@components/form';
import { CheckIcon, XMarkIcon } from '@icons';
import { Button } from '@ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { covenantFormAction } from './CovenantFormAction';
import { products } from './config';

export const CovenantForm = () => {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((file) => file);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const closeModal = async () => {
    router.back();
  };
  return (
    <form
      onSubmit={closeModal}
      action={covenantFormAction}
      className='flex flex-col  gap-4 px-4 mt-4'
    >
      <SelectField
        label='المنتج'
        name='product'
        placeholder='___'
        types={products}
      />
      <InputField label='البيان' name='statement' placeholder='' required />
      <InputField label='المبلغ' name='amount' placeholder='' required />
      <InputField
        label='رقم الفاتورة'
        name='invoiceNumber'
        placeholder=''
        required
      />
      <AttachmentsField
        required
        files={files}
        handleFileUpload={handleFileUpload}
        handleRemoveFile={handleRemoveFile}
      />
      <div className='flex justify-end mb-2 gap-2'>
        <Button
          onClick={closeModal}
          type='button'
          className='flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4'
        >
          <XMarkIcon className='fill-stormGray w-0 h-0' />
          إغلاق
        </Button>

        <Button
          className='flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4'
          type='submit'
        >
          <CheckIcon className='fill-primary group-hover:fill-white' />
          إضافة
        </Button>
      </div>
    </form>
  );
};
