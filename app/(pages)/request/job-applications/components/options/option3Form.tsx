import { InputField, SelectField } from '@components/form';
import { employeeList } from '../config';

export const Option3Form = () => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
        <InputField
          label='صاحب الطلب'
          name='applicant'
          placeholder='حمد بن يوسف القشيميط'
          disabled
        />
        <SelectField
          label='الموظف المستقيل'
          name='resignedEmployee'
          placeholder=''
          types={employeeList}
        />
        <InputField
          label='المسمى الوظيفي'
          name='jobTitle'
          placeholder=''
          required
          disabled
        />
        <InputField
          label='الفئة الوظيفية'
          name='jobCategory'
          placeholder=''
          required
          disabled
        />
        <InputField
          label='الدرجة الوظيفية'
          name='jobGrade'
          placeholder=''
          required
          disabled
        />
        <InputField label='القطاع' name='sector' placeholder='' disabled />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <InputField
          label='الإدارة العامة'
          name='generalManagement'
          placeholder=''
          disabled
        />
        <InputField
          label='تاريخ الاستقالة'
          name='resignedDate'
          placeholder=''
          required={false}
          disabled
        />
        <InputField
          label='القسم'
          name='department'
          placeholder=''
          required
          disabled
        />
        <InputField label='الإدارة' name='management' placeholder='' disabled />
      </div>
    </>
  );
};
