import type { ReactNode } from 'react';
import { TransactionListData } from './components';

export const metadata = {
  title: 'Transaction List',
  description: 'Transaction List Data',
};
interface TransactionListLayoutProps {
  children: ReactNode;
}
const TransactionLayout = ({ children }: TransactionListLayoutProps) => {
  return (
    <>
      <TransactionListData />
      <section>{children}</section>
    </>
  );
};

export default TransactionLayout;
