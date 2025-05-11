'use client';

import {
  AttachmentsField,
  DateField,
  FormHeader,
  InputField,
  RadioField,
  SelectField,
  SubmitButton,
  TextareaField
} from '@components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from '@lib';
import { Form } from '@ui';
import { TrialPeriodSchema } from '@zodSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export const TrialPeriodForm = () => {
  const form = useForm({
    resolver: zodResolver(TrialPeriodSchema),
    defaultValues: {
      employeeName: '',
      jobNumber: '',
      jobTitle: '',
      management: '',
      appointmentDate: '',
      endTrialPeriodDate: '',
      recommendation: '',
      organizationCulture: '',
      workOutputQuality: '',
      responsibility: '',
      initiative: '',
      policyCompliance: '',
      teamWork: '',
      communicationSkills: '',
      notes: '',
      attachments: [] as File[],
    },
  });

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const currentFiles = form.getValues('attachments') || [];
    form.setValue('attachments', [...currentFiles, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues('attachments') || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue('attachments', updatedFiles);
  };

  const onSubmit = (values: z.infer<typeof TrialPeriodSchema>) => {
    console.log('Form Data:', values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className='bg-white rounded-md'
      >
        <FormHeader
          label='نموذج طلب تقييم فترة التجربة'
          path={paths.trialPeriod.href}
        />
        <div className='p-4 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <SelectField
              name='employeeName'
              label='اسم الموظف'
              placeholder='...'
              types={employeeList}
            />
            <InputField name='jobNumber' label='الرقم الوظيفى' placeholder='' />
            <InputField name='jobTitle' label='المسمى الوظيفى' placeholder='' />
            <InputField
              name='managment'
              label='الإدارة/القطاع'
              placeholder=''
            />
            <DateField
              name='appointmentDate'
              label='تاريخ التعيين'
              required={false}
            />
            <DateField
              name='trialPeriodEndDate'
              label='تاريخ انتهاء فترة التجربة'
              required={false}
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
            />
            <SelectField
              label='جودة مخرجات العمل'
              name='workOutputQuality'
              placeholder=''
              types={evaluation}
            />
            <SelectField
              label='تحمل المسؤولية'
              name='responsibility'
              placeholder=''
              types={evaluation}
            />
            <SelectField
              label='روح المبادرة'
              name='initiative'
              placeholder=''
              types={evaluation}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <SelectField
              label='الامتثال للسياسات والحفاظ على مواعيد العمل '
              name='policyCompliance'
              placeholder=''
              types={evaluation}
            />
            <SelectField
              label='العمل ضمن فريق'
              name='teamWork'
              placeholder=''
              types={evaluation}
            />
            <SelectField
              label='مهارات التواصل'
              name='communicationSkills'
              placeholder=''
              types={evaluation}
            />
          </div>
          <TextareaField
            name='permissonReason'
            label='ملاحظات'
            placeholder='ملاحظات حول الطلب'
            required={false}
          />
          <AttachmentsField
            files={form.getValues('attachments')}
            handleFileUpload={handleFileUpload}
            handleRemoveFile={handleRemoveFile}
            required
          />
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};
