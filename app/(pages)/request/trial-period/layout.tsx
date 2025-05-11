import type { ReactNode } from 'react';
import { TrialPeriodData } from './components';

export const metadata = {
  title: 'Trial Period',
  description: 'Trial Period Data',
};
interface MedicalInsuranceLayoutProps {
  children: ReactNode;
}
const TrialPeriodLayout = ({ children }: MedicalInsuranceLayoutProps) => {
  return (
    <>
      <TrialPeriodData />
      <section>{children}</section>
    </>
  );
};

export default TrialPeriodLayout;
