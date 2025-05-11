import { ReactNode } from 'react';
import { PermissionData } from './components';

export const metadata = {
  title: 'Permissions',
  description: 'Permissions data',
};
interface PermissionssLayoutProps {
  children: ReactNode;
}
const PermissionLayout = ({ children }: PermissionssLayoutProps) => {
  return (
    <>
      <PermissionData />
      <section>{children}</section>
    </>
  );
};

export default PermissionLayout;
