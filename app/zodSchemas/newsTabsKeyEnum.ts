import { newsTabsKeys } from '@lib';
import { z } from 'zod';

export const newsTabsKeyEnum = z.enum(newsTabsKeys);
