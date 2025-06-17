// 'use client';

// import {
//   AttachmentsField,
//   DateField,
//   FormHeader,
//   InputField,
//   SelectField,
//   SubmitButton,
//   SubstituteField,
//   TextareaField
// } from '@components/form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { paths } from '@lib';
// import { Form } from '@ui';
// import { calculateDurationExcludingWeekends } from '@utils';
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// const VacationSchema = z.object({
//   leaveType: z.string().min(1, 'يرجى اختيار نوع الإجازة'),
//   substitute: z.string().min(1, 'يرجى اختيار الموظف البديل'),
//   startDate: z.date({ required_error: 'يرجى إدخال تاريخ البداية' }),
//   endDate: z.date({ required_error: 'يرجى إدخال تاريخ النهاية' }),
//   duration: z.string(),
//   notes: z.string().min(1, 'يرجى إدخال ملاحظات'),
//   babyBirthDate: z.date().optional(),
//   deceasedName: z.string().optional(),
//   attachments: z.array(z.instanceof(File)).optional(),
// });

// const VacationTypes = [
//   { id: '1', description: 'اجازة سنوية' },
//   { id: '2', description: 'اجازة مرضية' },
//   { id: '3', description: 'اجازة المولود' },
//   { id: '4', description: 'اجازة وفاة' },
//   { id: '5', description: 'اجازة امتحان' },
// ];

// const SubstituteEmployees = [
//   { id: '1', description: 'عاصم بن رشود العصيمي' },
//   { id: '2', description: 'محمد بن علي الرفاعي' },
// ];

// export const VacationForm = () => {
//   const form = useForm({
//     resolver: zodResolver(VacationSchema),
//     defaultValues: {
//       leaveType: '',
//       substitute: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       duration: '',
//       notes: '',
//       babyBirthDate: new Date(),
//       deceasedName: '',
//       attachments: [] as File[],
//     },
//   });

//   const { watch, setValue } = form;

//   const leaveType = watch('leaveType');
//   const startDate = watch('startDate');
//   const endDate = watch('endDate');

//   useEffect(() => {
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);

//       if (start <= end) {
//         const duration = calculateDurationExcludingWeekends(start, end);
//         setValue('duration', `${duration} يوم`);
//       } else {
//         setValue('duration', '');
//       }
//     } else {
//       setValue('duration', '');
//     }
//   }, [startDate, endDate, setValue]);

//   const handleFileUpload = (files: FileList | null) => {
//     if (!files) return;
//     const newFiles = Array.from(files);
//     const currentFiles = form.getValues('attachments') || [];
//     form.setValue('attachments', [...currentFiles, ...newFiles]);
//   };

//   const handleRemoveFile = (index: number) => {
//     const currentFiles = form.getValues('attachments') || [];
//     const updatedFiles = currentFiles.filter((_, i) => i !== index);
//     form.setValue('attachments', updatedFiles);
//   };

//   const onSubmit = (values: z.infer<typeof VacationSchema>) => {
//     form.reset();
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit((values) => onSubmit(values))}
//         className='bg-white rounded-md'
//       >
//         <FormHeader label='نموذج طلب إجازة' path={paths.vacations.href} />
//         <div className='p-4 space-y-6'>
//           <div
//             className={`grid grid-cols-1 ${
//               leaveType === '3' || leaveType === '4'
//                 ? 'md:grid-cols-3'
//                 : 'md:grid-cols-2'
//             } gap-4`}
//           >
//             <SelectField
//               name='leaveType'
//               label='نوع الإجازة'
//               types={VacationTypes}
//             />
//             {leaveType === '3' && (
//               <DateField name='babyBirthDate' label='تاريخ المولود' required />
//             )}
//             {leaveType === '4' && (
//               <InputField
//                 name='deceasedName'
//                 label='اسم المتوفى'
//                 placeholder='ادخل اسم المتوفى'
//                 disabled={false}
//                 required
//               />
//             )}
//             <SubstituteField employee={SubstituteEmployees} />
//           </div>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//             <DateField name='startDate' label='تاريخ البداية' required />
//             <DateField name='endDate' label='تاريخ الانتهاء' required />
//             <InputField
//               name='duration'
//               label='المدة'
//               placeholder='عدد الأيام'
//               disabled
//               required={false}
//             />
//           </div>
//           <TextareaField
//             name='notes'
//             label='ملاحظات'
//             placeholder='ملاحظات حول الطلب'
//             required
//           />
//           <AttachmentsField
//             files={form.getValues('attachments')}
//             handleFileUpload={handleFileUpload}
//             handleRemoveFile={handleRemoveFile}
//           />
//           <SubmitButton />
//         </div>
//       </form>
//     </Form>
//   );
// };
