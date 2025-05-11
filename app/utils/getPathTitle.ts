import { paths } from "@lib";

export const getPathTitle = (path: string) => {
  const pathPatterns = Object.values(paths).map(({ href, title }) => {
    return {
      href,
      title,
    };
  });

  // Convert path with dynamic segments (:id) to regex-friendly version

  const matchedPath = pathPatterns.find(({ href }) => {
    const escapedHref = href.replace(/:\w+/g, '[^/]+');
    const hrefPattern = new RegExp(`^${escapedHref}$`);
    return hrefPattern.test(path);
  });

  return matchedPath?.title;
};
