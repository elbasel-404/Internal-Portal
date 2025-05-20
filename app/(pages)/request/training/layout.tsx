import { ReactNode } from 'react';
import { TrainingData } from './components';

export const metadata = {
  title: 'Training',
  description: 'Training Data',
};
interface TrainingLayoutProps {
  children: ReactNode;
}
const TrainingLayout = ({ children }: TrainingLayoutProps) => {
  return (
    <>
      <TrainingData />
      <section>{children}</section>
    </>
  );
};

export default TrainingLayout;
