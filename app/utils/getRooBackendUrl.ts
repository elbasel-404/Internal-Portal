export const getRootBackendUrl = () => {
  const env = process.env.ROOT_BACKEND_URL;
  if (!env) {
    return "http://localhost:3000";
  }
  return env;
};
