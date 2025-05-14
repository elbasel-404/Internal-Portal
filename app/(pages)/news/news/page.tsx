import { paths } from '@lib';
import { getNewsList } from '@server';
import { NewsList } from '../components';

const NewsPage = async () => {
  const newsData = await getNewsList();
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
