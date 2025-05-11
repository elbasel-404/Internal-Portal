import { paths } from '@lib';
import { getNewsListRequests } from '@server';
import { NewsList } from '../components';

const MonshaatFamilyPage = async () => {
  const monshaatFamilyData = await getNewsListRequests();
  return (
    <>
      <NewsList
        newsData={monshaatFamilyData}
        title='عائلة منشأت'
        path={paths.monshaatFamilyDetails.href}
      />
    </>
  );
};

export default MonshaatFamilyPage;
