import { z } from 'zod';

export const JobApplicationsSchema = z.object({
  requestType: z.string().min(1, 'اختر نوع الطلب'),
  applicant: z.string().min(1, 'ادخل اسم صاحب الطلب'),
  jobTitle: z.string().min(1, 'اختر المسمى الوظيفي'),
  department: z.string().min(1, 'اختر القسم'),
  requestJustifications: z.string().min(1, 'ادخل مبررات الطلب'),
  employeeName: z.string().min(1, 'اختر اسم الموظف'),
  resignedEmployee: z.string().min(1, 'اختر الموظف المستقيل'),
  jobCategory: z.string().min(1, 'ادخل الفئة الوظيفية'),
  jobGrade: z.string().min(1, 'ادخل الدرجة الوظيفية'),
});
