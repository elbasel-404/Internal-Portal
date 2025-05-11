'use client';

import { useRelatedUsers } from '@hooks/data';
import { RelatedUsersCarousel } from '../../../../(pages)/home/components/HomePageSliders/RelatedUsersCarousel';

const RelatedUsersCarouselTestPage = () => {
  const { data } = useRelatedUsers();

  if (!data) return null;
  return (
    <main className='min-h-screen flex items-center justify-center'>
      <div className='p-4 bg-white rounded-3xl'>
        <RelatedUsersCarousel relatedUsers={data} />
      </div>
    </main>
  );
};
export default RelatedUsersCarouselTestPage;
