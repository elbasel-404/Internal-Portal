declare namespace NodeJS {
  interface ProcessEnv {
    API_ROOT_URL: string
    API_KEY: string
    API_KEY_HEADER_NAME: string
    BEARER_TOKEN: string
    SESSION_ID: string
    AUTH_SECRET: string
    CLIENT_ID: string
    CLIENT_SECRET: string
    SCOPE: string
    GRANT_TYPE: string
  }
}
