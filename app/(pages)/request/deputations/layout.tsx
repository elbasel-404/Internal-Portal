import { ReactNode } from 'react';
import { DeputationData } from './components';

export const metadata = {
  title: 'Deputations',
  description: 'Deputation data',
};
interface WorkDocumentLayoutProps {
  children: ReactNode;
}
const WorkDocumentLayout = ({ children }: WorkDocumentLayoutProps) => {
  return (
    <>
      <DeputationData />
      <section>{children}</section>
    </>
  );
};

export default WorkDocumentLayout;
