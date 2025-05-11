export type TicketDetails = {
  id: string;
  requestDate: string;
  subject: string;
  technicalTeam: string;
  predicate: string;
  priority: string;
  category: string;
  location: string;
  state: string;
  description: string;
  descriptionSolution: string;
  attachments: File[];
};
