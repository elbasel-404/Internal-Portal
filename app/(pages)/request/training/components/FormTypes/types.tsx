import { FileWithId, TrainingCourse } from '@types';
import { ChangeEvent, ReactNode } from 'react';

export interface FileHandlerType {
  upload: (files: FileList | null) => void;
  remove: (id: string) => void;
}

export interface AttachmentsSectionProps {
  files: FileWithId[];
  fileHandler: FileHandlerType;
}

export interface SectionProps {
  component: ReactNode;
}

export interface TrainingTypeSectionProps {
  trainingType: string;
  setTrainingType: (value: string) => void;
  trainingNature: string[];
  setTrainingNature: (values: string[]) => void;
}

export interface TrainingDetailsSectionProps {
  trainingName: string;
  handleTrainingNameChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  trainingMethod: string;
  setTrainingMethod: (value: string) => void;
}

export interface DateDurationSectionProps {
  dateFrom: Date;
  setDateFrom: (date: Date) => void;
  dateTo: Date;
  setDateTo: (date: Date) => void;
  duration: string;
}

export interface TrainingCenterSectionProps {
  isOtherTrainingCenter: boolean;
  setIsOtherTrainingCenter: (value: boolean) => void;
  trainingCenter: string;
  setTrainingCenter: (value: string) => void;
  trainingCenterName: string;
  handleTrainingCenterNameChangeValue: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface AdditionalInfoSectionProps {
  substituteEmployee: string;
  setSubstituteEmployee: (value: string) => void;
  trainingProgram: string;
  handleTrainingProgramChangeValue: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export interface TrainingLocationSectionProps {
  trainingCity: string;
  setTrainingCity: (value: string) => void;
  trainingCountry: string;
  setTrainingCountry: (value: string) => void;
  travelDays: string;
  trainingAssignment: string;
  setTrainingAssignment: (value: string) => void;
  trainingMethod: string;
  handleTravelDaysChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ExtendedTrainingSectionProps {
  extendedTraining: boolean;
  setExtendedTraining: (value: boolean) => void;
  trainingCourses: TrainingCourse[];
}
