'use client';

import {
  createFileHandler,
  dateFromAtom,
  dateToAtom,
  durationAtom,
} from '@atoms';
import { FormHeader, SubmitButton } from '@components/form';
import { paths } from '@lib';
import { FileWithId } from '@types';
import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import {
  AdditionalInfoSection,
  AttachmentsSection,
  DateDurationSection,
  TrainingCenterSection,
  TrainingDetailsSection,
  TrainingTypeSection,
} from './FormSections';
import { FileHandlerType, SectionProps } from './FormTypes/types';

export const TrainingForm = (): JSX.Element => {
  // State definitions
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [trainingName, setTrainingName] = useState<string>('');
  const [trainingType, setTrainingType] = useState<string>('');
  const [trainingCenter, setTrainingCenter] = useState<string>('');
  const [isOtherTrainingCenter, setIsOtherTrainingCenter] =
    useState<boolean>(false);
  const [trainingCenterName, setTrainingCenterName] = useState<string>('');
  const [trainingNature, setTrainingNature] = useState<string[]>([]);
  const [trainingMethod, setTrainingMethod] = useState<string>('internal');
  const [trainingProgram, setTrainingProgram] = useState<string>('');
  const [substituteEmployee, setSubstituteEmployee] = useState<string>('');
  const [dateFrom, setDateFrom] = useAtom(dateFromAtom);
  const [dateTo, setDateTo] = useAtom(dateToAtom);
  const [duration] = useAtom(durationAtom);

  // Handlers
  const fileHandler: FileHandlerType = createFileHandler(
    () => files,
    (newFiles: FileWithId[]) => setFiles(newFiles)
  );

  const handleTrainingNameChangeValue = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setTrainingName(event.target.value);
  };

  const handleTrainingCenterNameChangeValue = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setTrainingCenterName(event.target.value);
  };

  const handleTrainingProgramChangeValue = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTrainingProgram(event.target.value);
  };

  // Form sections
  const sections: SectionProps[] = [
    {
      component: (
        <TrainingTypeSection
          trainingType={trainingType}
          setTrainingType={setTrainingType}
          trainingNature={trainingNature}
          setTrainingNature={setTrainingNature}
        />
      ),
    },
    {
      component: (
        <TrainingDetailsSection
          trainingName={trainingName}
          handleTrainingNameChangeValue={handleTrainingNameChangeValue}
          trainingMethod={trainingMethod}
          setTrainingMethod={setTrainingMethod}
        />
      ),
    },
    {
      component: (
        <DateDurationSection
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          duration={duration}
        />
      ),
    },
    {
      component: (
        <TrainingCenterSection
          isOtherTrainingCenter={isOtherTrainingCenter}
          setIsOtherTrainingCenter={setIsOtherTrainingCenter}
          trainingCenter={trainingCenter}
          setTrainingCenter={setTrainingCenter}
          trainingCenterName={trainingCenterName}
          handleTrainingCenterNameChangeValue={
            handleTrainingCenterNameChangeValue
          }
        />
      ),
    },
    {
      component: (
        <AdditionalInfoSection
          substituteEmployee={substituteEmployee}
          setSubstituteEmployee={setSubstituteEmployee}
          trainingProgram={trainingProgram}
          handleTrainingProgramChangeValue={handleTrainingProgramChangeValue}
        />
      ),
    },
    {
      component: <AttachmentsSection files={files} fileHandler={fileHandler} />,
    },
  ];

  return (
    <form className='bg-white rounded-lg text-black text-lg p-4 space-y-4'>
      <FormHeader label='نموذج طلب دورة تدريبية' path={paths.training.href} />

      {sections.map((section, index) => (
        <div key={index} className='mb-8'>
          {section.component}
        </div>
      ))}

      <SubmitButton />
    </form>
  );
};
