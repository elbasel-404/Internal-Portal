'use client';

import { Table } from '@components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AddNewGoalButton,
  FormActions,
  GoalDetailsSection,
  GoalsFormHeader,
  IndividualGoalSection,
  OrganizationalGoalsSection,
} from './components';

const tableHeaders = [
  { label: 'مؤشر الأداء' },
  { label: 'وزن المؤشر %' },
  { label: 'خطوات الإنجاز' },
  { label: 'مقياس المؤشر' },
  { label: 'نوع المستهدف' },
  { label: 'المستهدف (رقم/تاريخ)' },
];

interface FormData {
  organizationalGoalLevel1: string;
  strategicGoalLevel2: string;
  strategicGoalLevel3: string;
  individualGoal: string;
  measurementPeriod: string;
  goalWeight: string;
  startDate: Date;
  endDate: Date;
}

export const GoalsForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    organizationalGoalLevel1: '',
    strategicGoalLevel2: '',
    strategicGoalLevel3: '',
    individualGoal: '',
    measurementPeriod: '',
    goalWeight: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const closeModal = () => {
    router.back();
  };

  const handleInputChange = (
    name: string,
    value: string | Date | null | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <GoalsFormHeader title='إنشاء هدف جديد' />

      <div className='px-4 space-y-4'>
        <OrganizationalGoalsSection
          formData={{
            organizationalGoalLevel1: formData.organizationalGoalLevel1,
            strategicGoalLevel2: formData.strategicGoalLevel2,
            strategicGoalLevel3: formData.strategicGoalLevel3,
          }}
          onInputChange={handleInputChange}
        />

        <IndividualGoalSection
          individualGoal={formData.individualGoal}
          onInputChange={handleInputChange}
        />

        <GoalDetailsSection
          formData={{
            measurementPeriod: formData.measurementPeriod,
            goalWeight: formData.goalWeight,
            startDate: formData.startDate,
            endDate: formData.endDate,
          }}
          onInputChange={handleInputChange}
        />
      </div>

      <div>
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-4 px-[18px] border-r-[3px] border-r-primary'>
          <p className='text-xl font-bold text-foreground'>مؤشر الأداء</p>
        </div>
        <Table
          toggleId={false}
          columns={tableHeaders}
          rows={[]}
          tableClassName='h-fit'
        />
        <div className='px-4 flex flex-col gap-4'>
          <AddNewGoalButton modalName='GoalsModal'>
            إضافة مؤشر جديد
          </AddNewGoalButton>
          <div className='w-full p-4 bg-[#00A65A] bg-opacity-15 rounded-lg mt-4'>
            <h3 className='text-darkBlue font-medium mb-2'>
              الحد الأدنى لعدد مؤشرات الأداء: 2، مع تحديد وزن كل مؤشر بين 5%
              و95%.
            </h3>
            <div className='w-full bg-white h-3'>
              <div
                className='bg-[#00A65A] h-3 transition-all duration-300'
                style={{ width: `100%` }}
              />
            </div>
            <div className='font-medium text-foreground text-lg'>{100}%</div>
          </div>
        </div>
      </div>

      <FormActions onClose={closeModal} onSubmit={handleSubmit} />
    </form>
  );
};
