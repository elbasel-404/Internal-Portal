import type { ReactNode } from 'react';
import { InternalCoursesData } from './components';

export const metadata = {
  title: 'Internal Courses Calendar',
  description: 'Internal Courses Calendar Data',
};
interface InternalCoursesCalendarLayoutProps {
  children: ReactNode;
}
const InternalCoursesCalendarLayout = ({
  children,
}: InternalCoursesCalendarLayoutProps) => {
  return (
    <>
      <InternalCoursesData />
      <section>{children}</section>
    </>
  );
};

export default InternalCoursesCalendarLayout;
