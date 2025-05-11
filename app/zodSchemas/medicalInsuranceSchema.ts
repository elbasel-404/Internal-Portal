import { z } from 'zod';

export const MedicalSchema = z.object({
  relation: z.string().min(1, 'اختر صلة القرابة'),
  type: z.string().min(1, 'اختر النوع'),
  nameAR: z.string().min(1, 'ادخل الاسم للفرد بالعربية'),
  nameEN: z.string().min(1, 'ادخل الاسم للفرد بالإنجليزية'),
  attachments: z.array(z.instanceof(File)).optional(),
});
