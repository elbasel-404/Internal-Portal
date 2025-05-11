import { SelectField } from '@components/form';
import {
  applicantTypes,
  fullNameTypes,
  justificationTypes,
  periodTypes,
  requestClassificationTypes,
  requestTypes,
} from './config';

export const TechnicalRequest = () => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <SelectField
          name='request'
          label='الخدمة'
          placeholder=''
          types={requestTypes}
        />
        <SelectField
          name='classification'
          label='التصنيف'
          placeholder=''
          types={requestClassificationTypes}
        />
        <SelectField
          name='Justification'
          label='التبرير'
          placeholder=''
          types={justificationTypes}
        />
        <SelectField
          name='applicant'
          label='صاحب الطلب'
          placeholder=''
          types={applicantTypes}
        />
        <SelectField
          name='fullName'
          label='الاسم بالكامل'
          placeholder=''
          types={fullNameTypes}
        />
        <SelectField
          name='period'
          label='المدة المطلوبة'
          placeholder=''
          types={periodTypes}
        />
      </div>
    </>
  );
};
