import { ReactNode } from 'react';
import { RecommendationData } from './components';

export const metadata = {
  title: 'Recommendation',
  description: 'Recommendation Data',
};
interface RecommendationLayoutProps {
  children: ReactNode;
}
const RecommendationLayout = ({ children }: RecommendationLayoutProps) => {
  return (
    <>
      <RecommendationData />
      <section>{children}</section>
    </>
  );
};

export default RecommendationLayout;
