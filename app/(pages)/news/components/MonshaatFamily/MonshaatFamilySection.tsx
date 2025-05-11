import { NewsHeader } from '@components';
import { paths } from '@lib';
import { MonshaatCarousel } from './MonshaatCarousel';
import { MonshaatGrid } from './MonshaatGrid';
import { monshaatData } from './config';

export const MonshaatFamilySection = () => {
  return (
    <div className='bg-white rounded-xl'>
      <NewsHeader title='عائلة منشآت' url={paths.monshaatFamily.href} />
      <div className='mt-6'>
        <MonshaatGrid monshaatData={monshaatData} />
        <MonshaatCarousel />
      </div>
    </div>
  );
};
