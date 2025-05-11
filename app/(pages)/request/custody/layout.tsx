import type { ReactNode } from 'react';
import { CustodyData } from './components';

export const metadata = {
  title: 'Custody',
  description: 'Custody Data',
};
interface CustodyLayoutProps {
  children: ReactNode;
}
const ReplacementCovenantLayout = ({ children }: CustodyLayoutProps) => {
  return (
    <>
      <CustodyData />
      <section>{children}</section>
    </>
  );
};

export default ReplacementCovenantLayout;
