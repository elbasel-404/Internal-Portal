export type ProbationPeriodDetails = {
  employeeName: string;
  jobNumber: string;
  jobTitle: string;
  management: string;
  appointmentDate: string;
  endProbationPeriodDate: string;
  recommendation: string;
  notes: string;
  attachments: File[];
  probationLineIds?: {
    question: string;
    answer: string;
  }[];
};
