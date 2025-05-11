'use client';

import {
  FormHeader,
  RadioField,
  SubmitButton,
  TextareaField,
} from '@components/form';
import { paths } from '@lib';
import { useState } from 'react';
import { Option1Form, Option2Form, Option3Form } from './options';

export const JobApplicationsForm = () => {
  const [requestType, setRequestType] = useState('option1');

  const handleRequestTypeChangeValue = (value: string) => {
    setRequestType(value);
  };

  return (
    <form className='bg-white rounded-md'>
      <FormHeader label='نموذج طلب توظيف' path={paths.jobApplications.href} />
      <div className='p-4 space-y-6'>
        <RadioField
          label='نوع الطلب'
          name='requestType'
          options={[
            { value: 'option1', label: 'جديد' },
            { value: 'option2', label: 'نقل داخلي' },
            { value: 'option3', label: 'بديل مستقيل' },
          ]}
          required={true}
          labelStyle='font-medium text-base'
          radioStyle='flex-col md:flex-row'
          className='flex-col md:flex-row md:items-center'
          selectedValue={requestType}
          onChange={handleRequestTypeChangeValue}
        />
        {requestType === 'option1' && <Option1Form />}
        {requestType === 'option2' && <Option2Form />}
        {requestType === 'option3' && <Option3Form />}
        <TextareaField
          name='requestJustifications'
          label='مبررات الطلب'
          placeholder='ملاحظات حول الطلب'
          required
        />
        <SubmitButton />
      </div>
    </form>
  );
};
