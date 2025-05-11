'use client';

import {
  AttachmentsField,
  CheckboxField,
  DateField,
  FormHeader,
  SelectField,
  SubmitButton,
  TextareaField,
  TimeField,
} from '@components/form';
import { paths } from '@lib';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formAction } from './helpers/formAction';
import { getStateAction } from './helpers/getStateAction';
import { initialState } from './helpers/initialState';
import { State } from './helpers/State';

const stateAction = getStateAction<State>(formAction);

const PermissionTypes = [
  { id: 1, name: 'الاستئذان لعمل' },
  { id: 2, name: 'الاستئذان شخصى' },
];

export const PermissionForm = () => {
  const [state, action, pending] = useActionState(stateAction, initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [permissionTypeValue, setPermissionTypeValue] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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

  const handlePermissionTypeChange = (value: string) => {
    setPermissionTypeValue(value); // Update the permission type value
  };

  useEffect(() => {
    const { success, errors } = state;
    if (success) toast.success('تم انشاء الطلب بنجاح');
    if (errors) toast.error(errors);
  }, [state]);

  useEffect(() => {
    if (pending) {
      toast.loading('جاري انشاء الطلب', {
        id: 'permission-form-loading-toast',
      });
    } else {
      toast.dismiss('permission-form-loading-toast');
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
    <form action={action} className='bg-white rounded-lg text-black text-lg p-4 space-y-4'>
      <FormHeader label='نموذج طلب استئذان' path={paths.permissions.href} />
      <input
        type='text'
        name='employee_id'
        id='employee_id'
        hidden
        aria-hidden
        readOnly
        value='1722'
        className='hidden'
      />
      <div className='py-4 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SelectField
            name='type_id'
            label='نوع الإستئذان'
            types={PermissionTypes}
            value={permissionTypeValue}
            onChange={handlePermissionTypeChange}
          />
          {permissionTypeValue === '1' && (
            <CheckboxField
              name='more_one_day'
              label='أكثر من يوم'
              required={false}
              checked={isMultipleDays}
              onChange={(value) => setIsMultipleDays(value)}
              className='flex justify-between md:justify-start items-center md:gap-x-36 mt-2'
            />
          )}

          {isMultipleDays ? (
            <>
              <DateField
                date={startDate}
                onChange={(value) => setStartDate(value || new Date())}
                name='date_from'
                label='تاريخ البداية'
                required
              />
              <DateField
                date={endDate}
                onChange={(value) => setEndDate(value || new Date())}
                name='date_to'
                label='تاريخ النهاية'
                required
              />
            </>
          ) : (
            <div
            // className={`${permissionTypeValue === '1' && 'col-span-full'}`}
            >
              <DateField
                date={startDate}
                onChange={(value) => setStartDate(value || new Date())}
                name='date_from'
                label='التاريخ'
                required
              />
            </div>
          )}

          {/* {!isMultipleDays && ( */}
          <>
            <TimeField
              time={startTime}
              onChange={(value) => setStartTime(value || new Date())}
              name='hour_from'
              label='من الساعة'
              required
            />
            <TimeField
              time={endTime}
              onChange={(value) => setEndTime(value || new Date())}
              name='hour_to'
              label='إلى الساعة'
              required
            />
          </>
          {/* )} */}
        </div>
        <TextareaField
          name='description'
          label='سبب الاستئذان'
          required={false}
        />
        {permissionTypeValue === '1' && (
          <AttachmentsField
            files={files}
            handleFileUpload={handleFileUpload}
            handleRemoveFile={handleRemoveFile}
          />
        )}
        <SubmitButton />
      </div>
    </form>
  );
};
