import { ReactNode } from 'react';
import { OvertimeAssignmentData } from './components';

export const metadata = {
  title: 'Overtime Assignment',
  description: 'Overtime Assignment data',
};
interface OvertimeAssignmentLayoutProps {
  children: ReactNode;
}
const OvertimeAssignmentLayout = ({ children }: OvertimeAssignmentLayoutProps) => {
  return (
    <>
      <OvertimeAssignmentData />
      <section>{children}</section>
    </>
  );
};

export default OvertimeAssignmentLayout;
