'use server';

import { paths } from '@lib';

export const getHrefs = async () => {
  const hrefList = Object.values(paths).map((p) => p.href);
  return [...hrefList];
};
