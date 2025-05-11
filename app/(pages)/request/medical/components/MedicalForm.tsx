'use client';

import { RelativeRelationElement } from '@api/schemas/relative-relation/schema';
import {
  AttachmentsField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
} from '@components/form';
import { paths } from '@lib';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { State } from './helpers/State';
import { formAction } from './helpers/formAction';
import { getStateAction } from './helpers/getStateAction';
import { initialState } from './helpers/initialState';

const types = [
  { id: 'add', name: 'إضافة' },
  { id: 'exclude', name: 'استبعاد' },
];

const stateAction = getStateAction<State>(formAction);

interface MedicalFormProps {
  relativeRelation: RelativeRelationElement[];
}

export const MedicalForm = ({ relativeRelation }: MedicalFormProps) => {
  const [state, action, pending] = useActionState(stateAction, initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [requestType, setRequestType] = useState('');
  const [relation, setRelation] = useState('');
  const [individualName, setIndividualName] = useState('');
  const [individualEnglishName, setIndividualEnglishName] = useState('');

  const handleRequestTypeChange = (value: string) => {
    setRequestType(value);
  };

  const handleRelationChange = (value: string) => {
    setRelation(value);
  };

  const handleIndividualNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndividualName(event.target.value);
  };

  const handleIndividualEnglishNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIndividualEnglishName(event.target.value);
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
        label='نموذج طلب تأمين طبي'
        path={paths.medicalInsurance.href}
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SelectField
            name='request_type'
            label='نوع الطلب'
            types={types}
            value={requestType}
            onChange={handleRequestTypeChange}
          />
          <SelectField
            name='relative_relation'
            label='صلة القرابة'
            placeholder=''
            types={relativeRelation}
            value={relation}
            onChange={handleRelationChange}
          />
        </div>
        <InputField
          name='individual_complete_name'
          label='الاسم الكامل للفرد بالعربية'
          placeholder='...'
          disabled={false}
          required
          value={individualName}
          onChange={handleIndividualNameChange}
        />
        <InputField
          name='individual_english_name'
          label='الاسم الكامل للفرد بالإنجليزية'
          placeholder='...'
          disabled={false}
          required={false}
          value={individualEnglishName}
          onChange={handleIndividualEnglishNameChange}
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
