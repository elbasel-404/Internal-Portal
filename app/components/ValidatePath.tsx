// app/components/validatePath.tsx
'use client';

// import { ErrorMessage } from '@lib';
// import { throwError } from '@utils';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getHrefs } from '../server/getHrefs';
import { getRegExFromHref } from '../server/getRegExFromHref';

export const ValidatePath = () => {
  const validate = async (shouldValidate = false) => {
    if (!shouldValidate) return;
    const regExPaths = await getHrefs();

    const isPath = regExPaths.some((href) => {
      const pattern = getRegExFromHref(href);
      const isMatch = pattern.test(pathName);
      // console.log({ pattern, isMatch, pathName });
      return isMatch;
    });
    if (!isPath) {
      console.log({ errorPath: pathName });
      console.error('invalid path', { shouldValidate, regExPaths, isPath });
    }
  };
  const pathName = usePathname();

  useEffect(() => {
    if (!pathName) return;
    const isTestHref = /\/test\/[A-Za-z]+/.test(pathName);
    const isNotificationHref = /\/notification\/[A-Za-z]+/.test(pathName);
    const isModalHref = /\/modal\/[A-Za-z]+/.test(pathName);
    const shouldValidate = !(isTestHref || isNotificationHref || isModalHref);

    validate(shouldValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return null;
};
