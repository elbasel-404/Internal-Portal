import { NewsHeader } from '@components';
import { paths } from '@lib';
import { NewsSection } from '../../../home/components';

export const InternalAds = () => {
  return (
    <div className='bg-white rounded-xl'>
      <NewsHeader title='إعلانات داخلية' url={paths.internalAds.href} />
      <NewsSection tabs={[]} />
    </div>
  );
};
