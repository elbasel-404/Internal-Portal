"use server"

const DEFAULT_TIMEOUT = 5000

type Args = {
  url: string
  body: unknown
  timeout?: number
}

export type PostResponse = {
  request: {
    timeoutInMs: number
    endpointUrl: string
    requestBody: unknown
    requestHeaders: Record<string, string>
    requestHref: string
  }
  response: {
    responseStatus: {
      ok: boolean | null
      responseStatusCode: number | null
      responseStatusText: string | null
    }
    error: string | null
    responseData: unknown
  }
}

export const post = async (args: Args): Promise<PostResponse> => {
  const timeoutInMs = args.timeout ?? DEFAULT_TIMEOUT

  // !===============================================================
  // !START - ENV
  // !===============================================================
  const API_ROOT_URL = process.env.API_ROOT_URL as string
  const API_KEY = process.env.API_KEY as string
  const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string
  const BEARER_TOKEN = process.env.BEARER_TOKEN as string
  const SESSION_ID = process.env.SESSION_ID as string

  // These environment variables are being validated, but no action is taken if they're missing
  // Since they're critical configuration values, the application might fail later if they're not present
  if (!API_ROOT_URL) {
    console.warn("API_ROOT_URL is missing")
  }

  if (!API_KEY) {
    console.warn("API_KEY is missing")
  }

  if (!API_KEY_HEADER_NAME) {
    console.warn("API_KEY_HEADER_NAME is missing")
  }

  if (!BEARER_TOKEN) {
    console.warn("BEARER_TOKEN is missing")
  }

  if (!SESSION_ID) {
    console.warn("SESSION_ID is missing")
  }

  // !===============================================================
  // !END - ENV
  // !===============================================================

  // *===============================================================

  // !===============================================================
  // !START - SETUP
  // !===============================================================
  const fetchHref = `${API_ROOT_URL}${args.url}`

  const HEADERS = {
    [API_KEY_HEADER_NAME]: API_KEY,
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
  }

  const requestBody = JSON.stringify(args.body)

  const callback = async () => {
    const response = await fetch(fetchHref, {
      method: "POST",
      headers: HEADERS,
      body: requestBody,
    })
    return response
  }
  // !===============================================================
  // !END - SETUP
  // !===============================================================

  // *===============================================================

  // !===============================================================
  // !START - FETCH
  // !===============================================================
  const response = await callback()
  const json = await response.json()

  // ! Result
  // const jsonId = json.id;
  // const jsonJsonrpc = json.jsonrpc;
  const jsonResult = json.result
  const jsonError = json?.error

  // ! Data
  const jsonResultData = jsonResult?.data
  const jsonResultStatus = jsonResult?.status
  const jsonResultStatusCode = jsonResult?.statusCode
  // const { data, status, statusCode } = result;
  // !===============================================================
  // !END - FETCH
  // !===============================================================

  // *===============================================================

  // !===============================================================
  // ! START - RESPONSE
  // !===============================================================
  const postResponse: PostResponse = {
    request: {
      timeoutInMs,
      endpointUrl: args.url,
      requestBody: args.body,
      requestHeaders: HEADERS,
      requestHref: fetchHref,
    },
    response: {
      responseStatus: {
        ok: response.ok,
        responseStatusCode: jsonResultStatusCode,
        responseStatusText: jsonResultStatus,
      },
      error: jsonError,
      responseData: jsonResultData,
    },
  }
  return postResponse
  // !===============================================================
  // ! END - RESPONSE
  // !===============================================================

  // *================================================
  // *================================================

  // !===============================================================
  // !===============================================================
  // !FUNCTION END
  // !===============================================================
  // !===============================================================

  // ! START - OLD IMPLEMENTATION
  // !===============================================================
  // const postResponse: PostResponse = {
  //   request: {
  //     timeoutInMs,
  //     endpointUrl: args.url,
  //     requestBody: args.body,
  //     requestHeaders: headers,
  //     requestHref: fetchHref,
  //   },
  //   response: {
  //     response: {
  //       ok: null,
  //       status: null,
  //       statusText: null,
  //     },
  //     error: null,
  //     responseJson: null,
  //   },
  // };

  // let json: unknown;
  // let response: Response | null = null;
  // let error: Error | null = null;

  // const testData = await callback();
  // const testJson = await testData.json();
  // return;

  // try {
  //   const race = (await Promise.race([
  //     callback(),
  //     new Promise((accept) => setTimeout(() => accept("timeout"), timeoutInMs)),
  //   ])) as Response | "timeout";

  //   if (race === "timeout") {
  //     postResponse.response.error = `Requesttimed out after ${timeoutInMs}ms`;
  //     return postResponse;
  //   }
  // const text = await race.text();
  // response = race;
  // const jsonData = await response.json();
  //   const result = jsonData.result;
  //   const data = result.data;
  //   json = data;
  // } catch (err) {
  //   error = err as Error;
  //   const responseCopy = await callback();
  //   // response = await callback()data, ;
  //   const responseText = await responseCopy.text();
  //   json = responseText;
  //   // error = new Error(responseText);
  // }
  // return {
  //   request: {
  //     timeoutInMs,
  //     endpointUrl: args.url,
  //     requestBody: args.body,
  //     requestHeaders: headers,
  //     requestHref: fetchHref,
  //   },
  //   response: {
  //     response: {
  //       ok: response?.ok ?? null,
  //       status: response?.status ?? null,
  //       statusText: response?.statusText ?? null,
  //     },
  //     error: error?.message ?? "",
  //     responseJson: json,
  //   },
  // };
}
