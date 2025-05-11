'use client';

import {
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from '@components/form';
import { paths } from '@lib';
import { defaultMonths } from '../../config';
import { defaultDays, defaultYears } from './config';

export const OvertimeAssignmentForm = () => {
  return (
    <form className='bg-white rounded-md'>
      <FormHeader
        label='نموذج طلب تكليف لعمل اضافي'
        path={paths.overtimeAssignment.href}
      />
      <div className='p-4 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <SelectField
            label='السنة'
            name='year'
            placeholder=''
            types={defaultYears}
          />
          <SelectField
            label='الشهر'
            name='month'
            placeholder=''
            types={defaultMonths}
          />
          <SelectField
            label='من يوم'
            name='fromDate'
            placeholder=''
            types={defaultDays}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SelectField
            label='إلى يوم'
            name='toDate'
            placeholder=''
            types={defaultDays}
          />
          <InputField
            label='عدد الساعات'
            name='hours'
            placeholder=''
            required
          />
        </div>
        <TextareaField
          label='وصف التكليف'
          name='assignmentDescription'
          required
        />
        <SubmitButton />
      </div>
    </form>
  );
};
