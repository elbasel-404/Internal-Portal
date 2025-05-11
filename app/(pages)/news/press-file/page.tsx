import { paths } from '@lib';
import { getNewsListRequests } from '@server';
import { NewsList } from '../components';

const PressFilePage = async () => {
  const pressFileData = await getNewsListRequests();
  return (
    <>
      <NewsList
        newsData={pressFileData}
        title='الملف الصحفي'
        path={paths.pressFileDetails.href}
      />
    </>
  );
};

export default PressFilePage;
