import { SelectField, TextareaField } from '@components/form';
import { SubstituteEmployees } from '../config';
import { AdditionalInfoSectionProps } from '../FormTypes/types';

export const AdditionalInfoSection = ({
  substituteEmployee,
  setSubstituteEmployee,
  trainingProgram,
  handleTrainingProgramChangeValue,
}: AdditionalInfoSectionProps) => (
  <div className='space-y-6'>
    <SelectField
      label='الموظف البديل'
      name='substitute_employee_id'
      types={SubstituteEmployees}
      placeholder='___'
      value={substituteEmployee}
      onChange={(value) => setSubstituteEmployee(value)}
    />

    <TextareaField
      label='برنامج الدورة'
      name='trainingProgram'
      placeholder=''
      required
      value={trainingProgram}
      onChange={handleTrainingProgramChangeValue}
    />
  </div>
);
