import { InputField, SelectField } from '@components/form';
import {
  categoryTypes,
  classificationTypes,
  locationTypes,
  priorityTypes,
  typeTypes,
} from './config';

export const NonTechnicalRequest = () => {
  return (
    <>
      <InputField name='subject' label='الموضوع' placeholder='' required />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <SelectField
          name='classification'
          label='التصنيف'
          placeholder=''
          types={classificationTypes}
        />
        <SelectField
          name='type'
          label='النوع'
          placeholder=''
          types={typeTypes}
        />
        <SelectField
          name='category'
          label='الفئة'
          placeholder=''
          types={categoryTypes}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <SelectField
          name='priority'
          label='الأولوية'
          placeholder=''
          types={priorityTypes}
        />
        <SelectField
          name='location'
          label='الموقع'
          placeholder=''
          types={locationTypes}
        />
      </div>
    </>
  );
};
