export const getRegExFromHref = (href: string) => {
  const escapedHref = href.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "/")
  return new RegExp(`^${escapedHref}$`)
}
