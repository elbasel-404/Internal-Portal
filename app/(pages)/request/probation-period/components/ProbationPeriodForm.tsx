'use client';

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  RadioField,
  SelectField,
  SubmitButton,
  TextareaField,
} from '@components/form';
import { paths } from '@lib';
import { ProbationPeriodEmployees, ProbationPeriodFields } from '@types';
import { useState } from 'react';

interface ProbationPeriodFormProps {
  probationPeriodEmployees: ProbationPeriodEmployees[];
  probationPeriodQuestions: ProbationPeriodFields[];
  probationPeriodAnswers: ProbationPeriodFields[];
  probationPeriodRecommendation: ProbationPeriodFields[];
}

export const ProbationPeriodForm = ({
  probationPeriodEmployees,
  probationPeriodQuestions,
  probationPeriodAnswers,
  probationPeriodRecommendation,
}: ProbationPeriodFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [managment, setManagment] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [probationPeriodEndDate, setProbationPeriodEndDate] = useState(
    new Date()
  );
  const [recommendation, setRecommendation] = useState('');
  const [organizationCulture, setOrganizationCulture] = useState('');
  const [workOutputQuality, setWorkOutputQuality] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [initiative, setInitiative] = useState('');
  const [policyCompliance, setPolicyCompliance] = useState('');
  const [teamWork, setTeamWork] = useState('');
  const [communicationSkills, setCommunicationSkills] = useState('');

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

  const handleEmployeeChange = (value: string) => {
    setEmployeeName(value);

    const selected = probationPeriodEmployees.find((emp) => emp.id === value);
    if (selected) {
      setJobNumber(selected.jobNumber);
      setJobTitle(selected.jobTitle);
      setManagment(selected.department);
      setAppointmentDate(new Date(selected.appointmentDate));
      setProbationPeriodEndDate(new Date(selected.endProbationPeriodDate));
    }
  };

  return (
    <form className='bg-white rounded-md p-4'>
      <FormHeader
        label='نموذج طلب تقييم فترة التجربة'
        path={paths.probationPeriod.href}
      />
      <div className='p-4 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <SelectField
            name='employeeName'
            label='اسم الموظف'
            placeholder='...'
            types={probationPeriodEmployees.map(({ id, employeeName }) => ({
              id,
              name: employeeName,
            }))}
            value={employeeName}
            onChange={handleEmployeeChange}
            required
          />
          <InputField
            name='jobNumber'
            label='الرقم الوظيفى'
            placeholder=''
            value={jobNumber}
            disabled
          />
          <InputField
            name='jobTitle'
            label='المسمى الوظيفى'
            placeholder=''
            value={jobTitle}
            disabled
          />
          <InputField
            name='managment'
            label='الإدارة/القطاع'
            placeholder=''
            value={managment}
            disabled
          />
          <DateField
            name='appointmentDate'
            label='تاريخ التعيين'
            date={appointmentDate}
            required={false}
          />
          <DateField
            name='probationPeriodEndDate'
            label='تاريخ انتهاء فترة التجربة'
            date={probationPeriodEndDate}
            required={false}
          />
        </div>
        <RadioField
          label='التوصية:'
          name='recommendation'
          options={probationPeriodRecommendation.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          required={true}
          selectedValue={recommendation}
          onChange={(value) => setRecommendation(value)}
          labelStyle='font-medium text-base'
          radioStyle='flex-col md:flex-row'
          className='flex-col md:flex-row md:items-center'
        />
        <div className='bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
          <h2 className='text-primary font-bold text-xl'>
            معايير تقييم فترة التجربة
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {probationPeriodQuestions?.slice(0, 4).map((question, index) => (
            <SelectField
              label={question.name}
              name={question.name}
              placeholder=''
              types={probationPeriodAnswers ?? []}
              value={
                {
                  0: organizationCulture,
                  1: workOutputQuality,
                  2: responsibility,
                  3: initiative,
                }[index] || ''
              }
              onChange={(value) => {
                switch (index) {
                  case 0:
                    setOrganizationCulture(value);
                    break;
                  case 1:
                    setWorkOutputQuality(value);
                    break;
                  case 2:
                    setResponsibility(value);
                    break;
                  case 3:
                    setInitiative(value);
                    break;
                }
              }}
            />
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {probationPeriodQuestions?.slice(4, 7).map((question, index) => (
            <SelectField
              label={question.name}
              name={question.name}
              placeholder=''
              types={probationPeriodAnswers ?? []}
              value={
                {
                  0: policyCompliance,
                  1: teamWork,
                  2: communicationSkills,
                }[index] || ''
              }
              onChange={(value) => {
                switch (index) {
                  case 0:
                    setPolicyCompliance(value);
                    break;
                  case 1:
                    setTeamWork(value);
                    break;
                  case 2:
                    setCommunicationSkills(value);
                    break;
                }
              }}
            />
          ))}
        </div>

        <TextareaField
          name='permissonReason'
          label='ملاحظات'
          placeholder='ملاحظات حول الطلب'
          required={false}
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
