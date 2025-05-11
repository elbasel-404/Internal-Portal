import type { ReactNode } from 'react';
import { BankAccountData } from './components';

export const metadata = {
  title: 'Bank Account Change',
  description: 'Bank Account Change Data',
};
interface BankAccountChangeLayoutProps {
  children: ReactNode;
}
const BankAccountChangeLayout = ({
  children,
}: BankAccountChangeLayoutProps) => {
  return (
    <>
      <BankAccountData />
      <section>{children}</section>
    </>
  );
};

export default BankAccountChangeLayout;
