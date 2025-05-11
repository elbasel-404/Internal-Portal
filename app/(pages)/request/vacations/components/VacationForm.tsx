'use client';

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  SelectField,
  SubmitButton,
  TextareaField,
} from '@components/form';
import { paths } from '@lib';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formAction } from './helpers/formAction';
import { getStateAction } from './helpers/getStateAction';

import type { VacationType } from '@api/schemas/vacation-types/schema';
import { initialState } from './helpers/initialState';
import type { State } from './helpers/State';

const substituteEmployees = [
  { id: 1, name: 'عاصم بن رشود العصيمي' },
  { id: 2, name: 'محمد بن علي الرفاعي' },
];

const stateAction = getStateAction<State>(formAction);

interface VacationFormProps {
  vacationElements: VacationType[];
}
export const VacationForm = ({ vacationElements }: VacationFormProps) => {
  const [state, action, pending] = useActionState(stateAction, initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [deathPerson, setDeathPerson] = useState('');
  const [duration, setDuration] = useState('1');
  const [vacationType, setVacationType] = useState('7');
  const [substituteEmployee, setSubstituteEmployee] = useState('1');

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

  const handleVacationTypeChange = (value: string) => {
    setVacationType(value);
  };

  const handleSubstituteEmployeeChange = (value: string) => {
    setSubstituteEmployee(value);
  };

  const handleDateFromChange = (value: Date | undefined) => {
    setDateFrom(value || new Date());
  };

  const handleDatToChange = (value: Date | undefined) => {
    setDateTo(value || new Date());
  };

  const handleBirthDateChange = (value: Date | undefined) => {
    setBirthDate(value || new Date());
  };

  const handleDeathPersonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeathPerson(event.target.value);
  };

  console.log({ state, pending });

  useEffect(() => {
    if (dateFrom && dateTo) {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      setDuration(diffDays > 0 ? `${diffDays.toString()} يوم` : '1 يوم');
    }
  }, [dateFrom, dateTo]);

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
      <FormHeader label='نموذج طلب إجازة' path={paths.vacations.href} />
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
      <div
        className={`grid grid-cols-1 ${
          vacationType === '16' || vacationType === '18'
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2'
        } gap-4`}
      >
        <div className='space-y-2'>
          <SelectField
            label='نوع الاجازة'
            name='holiday_status_id'
            types={vacationElements}
            placeholder=''
            value={vacationType}
            onChange={handleVacationTypeChange}
          />
        </div>
        {vacationType === '16' && (
          <div className='space-y-2'>
            <DateField
              required
              label='تاريخ ميلاد الطفل'
              name='childbirth_date'
              date={birthDate}
              onChange={
                handleBirthDateChange as (date: Date | null | undefined) => void
              }
            />
          </div>
        )}

        {vacationType === '18' && (
          <InputField
            label='المتوفى'
            name='death_person'
            placeholder=''
            value={deathPerson}
            onChange={handleDeathPersonChange}
          />
        )}
        <div className='space-y-2'>
          <SelectField
            label='الموظف البديل'
            name='substitute_employee_id'
            types={substituteEmployees}
            placeholder=''
            value={substituteEmployee}
            onChange={handleSubstituteEmployeeChange}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-0'>
        <div className='space-y-2'>
          <DateField
            required
            label='تاريخ البداية'
            name='date_from'
            date={dateFrom}
            onChange={
              handleDateFromChange as (date: Date | null | undefined) => void
            }
          />
        </div>
        <div className='space-y-2'>
          <DateField
            required
            label='تاريخ النهاية'
            name='date_to'
            date={dateTo}
            onChange={
              handleDatToChange as (date: Date | null | undefined) => void
            }
          />
        </div>
        <div className='space-y-2'>
          <InputField
            label='المدة'
            name='duration'
            disabled
            value={duration}
            placeholder=''
          />
        </div>
      </div>

      {/* Notes */}
      <TextareaField
        name='notes'
        label='ملاحظات'
        placeholder='ملاحظات حول الطلب'
        required
      />

      {/* Attachments */}
      <AttachmentsField
        files={files}
        handleFileUpload={handleFileUpload}
        handleRemoveFile={handleRemoveFile}
        required
      />

      <SubmitButton />
    </form>
  );
};
