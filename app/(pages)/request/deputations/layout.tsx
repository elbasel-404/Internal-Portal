import { ReactNode } from 'react';
import { DeputationData } from './components';

export const metadata = {
  title: 'Deputations',
  description: 'Deputation data',
};
interface DeputationLayoutProps {
  children: ReactNode;
}
const DeputationLayout = ({ children }: DeputationLayoutProps) => {
  return (
    <>
      <DeputationData />
      <section>{children}</section>
    </>
  );
};

export default DeputationLayout;
