'use client';

import { BankDetail } from '@api/schemas/bank-details/schema';
import {
  AttachmentsField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from '@components/form';
import { paths } from '@lib';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formAction } from './helpers/formAction';
import { getStateAction } from './helpers/getStateAction';
import { initialState } from './helpers/initialState';
import { State } from './helpers/State';

const stateAction = getStateAction<State>(formAction);

interface BankAccountFormProps {
  bankDetails: BankDetail[];
}

export const BankAccountForm = ({ bankDetails }: BankAccountFormProps) => {
  const [state, action, pending] = useActionState(stateAction, initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [iban, setIban] = useState('');
  const [bankId, setBankId] = useState('');

  const handleIbanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIban(event.target.value);
  };

  const handleBankIdChange = (value: string) => {
    setBankId(value);
  };

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

  useEffect(() => {
    const { success, errors } = state;
    if (success) toast.success('تم انشاء الطلب بنجاح');
    if (errors) toast.error(errors);
  }, [state]);

  useEffect(() => {
    if (pending) {
      toast.loading('جاري انشاء الطلب', {
        id: 'vacation-form-loading-toast',
      });
    } else {
      toast.dismiss('vacation-form-loading-toast');
    }
  }, [pending]);

  if (state.success) {
    return (
      <div className='bg-white text-black text-lg p-4 space-y-4'>
        <p className='text-center'>تم انشاء الطلب بنجاح</p>
        <p className='text-center'>رقم الطلب: {state.id}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className='bg-white rounded-lg text-black text-lg p-4 space-y-4'
    >
      <FormHeader
        label='نموذج طلب تغيير الحساب البنكي'
        path={paths.bankAccountChange.href}
      />
      <input
        type='text'
        name='employee_id'
        id='employee_id'
        hidden
        aria-hidden
        readOnly
        value='1711'
        className='hidden'
      />
      <div className='p-4 space-y-6'>
        <InputField
          label='الحساب الحالي للموظف'
          name='bankAccount'
          placeholder='مصرف الراجحي - SA2880000387608010079237'
          disabled
        />
        <SelectField
          name='new_bank_id'
          label='اسم البنك الجديد'
          placeholder='__'
          types={bankDetails}
          value={bankId}
          onChange={handleBankIdChange}
        />
        <InputField
          name='iban'
          label='رقم الآيبان (IBAN)'
          placeholder='____________________SA03'
          required
          value={iban}
          onChange={handleIbanChange}
        />
        <InputField
          name='accountStatus'
          label='حالة الحساب البنكي'
          placeholder='مثبت'
          disabled
        />
        <AttachmentsField
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
