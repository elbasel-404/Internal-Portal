import { z } from 'zod';

export const TrialPeriodSchema = z.object({
  employeeName: z.string().min(1, 'اختر اسم الموظف'),
  recommendation: z.string().min(1, 'اختر التوصية'),
  organizationCulture: z.string().min(1, 'اختر ملائمة ثقافة الهيئة'),
  workOutputQuality: z.string().min(1, 'اختر جودة مخرجات العمل'),
  responsibility: z.string().min(1, 'اختر تحمل المسؤولية'),
  initiative: z.string().min(1, 'اختر روح المبادرة'),
  policyCompliance: z.string().min(1, 'اختر الامتثال للسياسات والحفاظ على مواعيد العمل'),
  teamWork: z.string().min(1, 'اختر العمل ضمن فريق'),
  communicationSkills: z.string().min(1, 'اختر مهارات التواصل'),
  attachments: z.array(z.instanceof(File)).optional(),
});
