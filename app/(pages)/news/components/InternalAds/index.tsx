import { NewsHeader } from '@components';
import { paths } from '@lib';
import { NewsSection } from '../../../home/components';
import {getAdsNewsList} from'@server';

export const InternalAds = async() => {
  const newsData = await getAdsNewsList()
  return (
    <div className='bg-white rounded-xl'>
      <NewsHeader title='إعلانات داخلية' url={paths.internalAds.href} />
      <NewsSection ads={newsData} familyNews={[]} news={[]} tabs={[]} />
    </div>
  );
};
