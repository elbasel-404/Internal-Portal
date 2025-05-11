import { Endpoint } from "@types";
import { getRootBackendUrl } from "./getRooBackendUrl";

export const getFetchUrl = (url: Endpoint) => {
  const rootBackgroundUrl = getRootBackendUrl();
  return `${rootBackgroundUrl}/api/${url}`;
};
