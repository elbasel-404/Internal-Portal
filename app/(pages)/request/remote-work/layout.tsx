import { ReactNode } from 'react';
import { RemoteWorkData } from './components';

export const metadata = {
  title: 'Remote Work',
  description: 'Remote work data',
};
interface VacationsLayoutProps {
  children: ReactNode;
}
const RemoteWorksLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      <RemoteWorkData />
      <section>{children}</section>
    </>
  );
};

export default RemoteWorksLayout;
