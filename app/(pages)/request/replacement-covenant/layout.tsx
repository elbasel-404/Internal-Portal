import type { ReactNode } from 'react';
import { ReplacementCovenantData } from './components';

export const metadata = {
  title: 'Replacement Covenant',
  description: 'Replacement Covenant Data',
};
interface ReplacementCovenantLayoutProps {
  children: ReactNode;
}
const ReplacementCovenantLayout = ({
  children,
}: ReplacementCovenantLayoutProps) => {
  return (
    <>
      <ReplacementCovenantData />
      <section>{children}</section>
    </>
  );
};

export default ReplacementCovenantLayout;
