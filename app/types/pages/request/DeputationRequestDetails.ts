export type DeputationRequestDetails = {
  id: string;
  requestType: string;
  requestDate: string;
  documentType: string;
  documentAddress: string;
  target: string;
  employee: string;
  sector: string;
  management: string;
  status: string;
  attachments: File[];
};
