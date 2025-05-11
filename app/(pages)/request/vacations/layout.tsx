import { ReactNode } from 'react';
import { VacationData } from './components';

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
      <VacationData />
      {children}
    </>
  );
};

export default VacationsLayout;
