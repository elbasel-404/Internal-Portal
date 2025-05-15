import { ReactNode } from 'react';
import { EvaluationData } from './components';

export const metadata = {
  title: 'Supplier Evaluation Request',
  description: 'Supplier Evaluation Request data',
};
interface VacationsLayoutProps {
  children: ReactNode;
}
const VacationsLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      <EvaluationData />
      {children}
    </>
  );
};

export default VacationsLayout;
