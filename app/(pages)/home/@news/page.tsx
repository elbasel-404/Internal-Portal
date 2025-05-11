import { defaultNewsTabs } from '@lib';
import { getUserId } from '@server';
import { NewsSection } from '../components';
import { getUser } from '@db/actions';

const NewsSlot = async () => {
  const userId = await getUserId();
  let tabs = defaultNewsTabs;

  if (userId) {
    const user = await getUser(userId);
    const activeNewsTabsKeys = user.activeNewsTabsKeys;
    tabs = tabs.filter((i) => activeNewsTabsKeys.includes(i.key));
  }

  return <NewsSection tabs={tabs} />;
};
export default NewsSlot;
