import { NewsHeader } from '@components';
import { paths } from '@lib';
import { FeaturedSection } from './FeaturedSection';
import { NewsCardSection } from './NewsCardSection';

const NewsSection = () => {
  return (
    <div className='bg-white rounded-xl'>
      <NewsHeader title='الأخبار' url={paths.news.href} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 p-4'>
        <FeaturedSection />
        <NewsCardSection />
      </div>
    </div>
  );
};

export default NewsSection;
