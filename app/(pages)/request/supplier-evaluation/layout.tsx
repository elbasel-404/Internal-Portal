import { ReactNode } from 'react';
import { EvaluationData } from './components';

export const metadata = {
  title: 'Vacations',
  description: 'Vacations data',
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
