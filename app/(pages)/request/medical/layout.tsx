import type { ReactNode } from 'react';
import { MedicalData } from './components';

export const metadata = {
  title: 'Medical Insurance',
  description: 'Medical Insurance Data',
};
interface MedicalInsuranceLayoutProps {
  children: ReactNode;
}
const MedicalInsuranceLayout = ({ children }: MedicalInsuranceLayoutProps) => {
  return (
    <>
      <MedicalData />
      <section>{children}</section>
    </>
  );
};

export default MedicalInsuranceLayout;
