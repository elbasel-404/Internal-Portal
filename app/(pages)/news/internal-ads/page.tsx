import { paths } from '@lib';
import { getAdsNewsList } from '@server';
import { NewsList } from '../components';

const InternalAdsPage = async () => {
  const internalAdsData = await getAdsNewsList();
  return (
    <>
      <NewsList
        newsData={internalAdsData}
        title='إعلانات داخلية'
        path={paths.internalAdsDetails.href}
      />
    </>
  );
};

export default InternalAdsPage;
