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
import { useState } from 'react';

const evaluation = [
  { id: 1, name: 'ممتاز' },
  { id: 2, name: 'مؤهل بشكل عالي' },
  { id: 3, name: 'مؤهل' },
  { id: 4, name: 'أقل من المستوى المطلوب' },
  { id: 5, name: 'ضعيف' },
];

const employeeList = [
  { id: 1, name: 'محمد عبدالعزيز الحربي' },
  { id: 2, name: 'فاطمة خالد الشمراني' },
  { id: 3, name: 'عبدالعزيز فهد العتيبي' },
  { id: 4, name: 'ريم صالح الزهراني' },
  { id: 5, name: 'فيصل علي الدوسري' },
];

export const ProbationPeriodForm = () => {
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

  const handleAppointmentDateChange = (date: Date | null | undefined) => {
    setAppointmentDate(date || new Date());
  };

  const handleProbationPeriodEndDateChange = (
    date: Date | null | undefined
  ) => {
    setProbationPeriodEndDate(date || new Date());
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
            types={employeeList}
            value={employeeName}
            onChange={(value) => setEmployeeName(value)}
          />
          <InputField
            name='jobNumber'
            label='الرقم الوظيفى'
            placeholder=''
            value={jobNumber}
            onChange={(e) => setJobNumber(e.target.value)}
          />
          <InputField
            name='jobTitle'
            label='المسمى الوظيفى'
            placeholder=''
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <InputField
            name='managment'
            label='الإدارة/القطاع'
            placeholder=''
            value={managment}
            onChange={(e) => setManagment(e.target.value)}
          />
          <DateField
            name='appointmentDate'
            label='تاريخ التعيين'
            required={false}
            date={appointmentDate}
            onChange={handleAppointmentDateChange}
          />
          <DateField
            name='probationPeriodEndDate'
            label='تاريخ انتهاء فترة التجربة'
            required={false}
            date={probationPeriodEndDate}
            onChange={handleProbationPeriodEndDateChange}
          />
        </div>
        <RadioField
          label='التوصية:'
          name='recommendation'
          options={[
            { value: 'option1', label: 'اجتياز فترة التجربة' },
            { value: 'option2', label: 'تمديد فترة التجربة' },
            { value: 'option3', label: 'إنهاء خدمات الموظف' },
          ]}
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
          <SelectField
            label='ملائمة ثقافة الهيئة'
            name='organizationCulture'
            placeholder=''
            types={evaluation}
            value={organizationCulture}
            onChange={(value) => setOrganizationCulture(value)}
          />
          <SelectField
            label='جودة مخرجات العمل'
            name='workOutputQuality'
            placeholder=''
            types={evaluation}
            value={workOutputQuality}
            onChange={(value) => setWorkOutputQuality(value)}
          />
          <SelectField
            label='تحمل المسؤولية'
            name='responsibility'
            placeholder=''
            types={evaluation}
            value={responsibility}
            onChange={(value) => setResponsibility(value)}
          />
          <SelectField
            label='روح المبادرة'
            name='initiative'
            placeholder=''
            types={evaluation}
            value={initiative}
            onChange={(value) => setInitiative(value)}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <SelectField
            label='الامتثال للسياسات والحفاظ على مواعيد العمل '
            name='policyCompliance'
            placeholder=''
            types={evaluation}
            value={policyCompliance}
            onChange={(value) => setPolicyCompliance(value)}
          />
          <SelectField
            label='العمل ضمن فريق'
            name='teamWork'
            placeholder=''
            types={evaluation}
            value={teamWork}
            onChange={(value) => setTeamWork(value)}
          />
          <SelectField
            label='مهارات التواصل'
            name='communicationSkills'
            placeholder=''
            types={evaluation}
            value={communicationSkills}
            onChange={(value) => setCommunicationSkills(value)}
          />
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
