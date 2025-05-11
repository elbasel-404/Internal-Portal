import { paths } from '@lib';
import { getNewsListRequests } from '@server';
import { NewsList } from '../components';

const NewsPage = async () => {
  const newsData = await getNewsListRequests();
  return (
    <>
      <NewsList
        newsData={newsData}
        title='الأخبار'
        path={paths.newsDetails.href}
      />
    </>
  );
};

export default NewsPage;
