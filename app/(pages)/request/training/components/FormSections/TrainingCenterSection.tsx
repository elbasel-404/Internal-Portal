import { CheckboxField, InputField, SelectField } from '@components/form';
import { TrainingCenters } from '../config';
import { TrainingCenterSectionProps } from '../FormTypes/types';

export const TrainingCenterSection = ({
  isOtherTrainingCenter,
  setIsOtherTrainingCenter,
  trainingCenter,
  setTrainingCenter,
  trainingCenterName,
  handleTrainingCenterNameChangeValue,
}: TrainingCenterSectionProps) => (
  <div className='space-y-6'>
    {!isOtherTrainingCenter && (
      <SelectField
        label='مراكز التدريب'
        name='trainingCenters'
        placeholder='___'
        types={TrainingCenters}
        value={trainingCenter}
        onChange={(value) => setTrainingCenter(value)}
      />
    )}

    <CheckboxField
      label='مركز تدريب اخر'
      name='otherTrainingCenter'
      required={false}
      checked={isOtherTrainingCenter}
      onChange={(value) => setIsOtherTrainingCenter(value)}
      className='flex md:items-center gap-x-3'
      labelStyle='text-foreground font-medium leading-0'
      checkboxStyle='-order-1 mt-1 md:mt-0'
    />

    {isOtherTrainingCenter && (
      <InputField
        label='اسم مركز التدريب'
        name='trainingCenterName'
        placeholder='...'
        value={trainingCenterName}
        onChange={handleTrainingCenterNameChangeValue}
        required
      />
    )}
  </div>
);
