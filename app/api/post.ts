"use server";

const DEFAULT_TIMEOUT = 5000;

type Args = {
  url: string;
  body: unknown;
  timeout?: number;
};

export type PostResponse = {
  request: {
    timeoutInMs: number;
    endpointUrl: string;
    requestBody: unknown;
    requestHeaders: Record<string, string>;
    requestHref: string;
  };
  response: {
    responseStatus: {
      ok: boolean | null;
      responseStatusCode: number | null;
      responseStatusText: string | null;
    };
    error: string | null;
    responseData: unknown;
  };
};

export const post = async (args: Args): Promise<PostResponse> => {
  const timeoutInMs = args.timeout ?? DEFAULT_TIMEOUT;

  // !===============================================================
  // !START - ENV
  // !===============================================================
  const API_ROOT_URL = process.env.API_ROOT_URL as string;
  const API_KEY = process.env.API_KEY as string;
  const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string;
  const BEARER_TOKEN = process.env.BEARER_TOKEN as string;
  const SESSION_ID = process.env.SESSION_ID as string;

  if (!API_ROOT_URL) {
    throw new Error("API_ROOT_URL is not defined, check your .env file");
  }

  if (!API_KEY) {
    throw new Error("API_KEY is not defined, check your .env file");
  }

  if (!API_KEY_HEADER_NAME) {
    throw new Error("API_KEY_HEADER_NAME is not defined, check your .env file");
  }

  if (!BEARER_TOKEN) {
    throw new Error("BEARER_TOKEN is not defined, check your .env file");
  }

  if (!SESSION_ID) {
    throw new Error("SESSION_ID is not defined, check your .env file");
  }

  // !===============================================================
  // !END - ENV
  // !===============================================================

  // *===============================================================

  // !===============================================================
  // !START - SETUP
  // !===============================================================
  const fetchHref = `${API_ROOT_URL}${args.url}`;

  const HEADERS = {
    [API_KEY_HEADER_NAME]: API_KEY,
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
  };

  const requestBody = JSON.stringify(args.body);

  const callback = async () => {
    const response = await fetch(fetchHref, {
      method: "POST",
      headers: HEADERS,
      body: requestBody,
    });
    return response;
  };
  // !===============================================================
  // !END - SETUP
  // !===============================================================

  // *===============================================================

  // !===============================================================
  // !START - FETCH
  // !===============================================================
  // console.log("INFO: Fetching data from", fetchHref);
  // console.log("INFO: Request body", args.body);
  // console.log("INFO: HEADERS", HEADERS);
  // console.log("\x1b[31m", "--------------------------------------------");
  const response = await callback();
  const json = await response.json();
  console.log({ json });
  console.log({ requestBody: args.body });

  // ! Result
  // const jsonId = json.id;
  // const jsonJsonrpc = json.jsonrpc;
  const jsonResult = json.result;
  const jsonError = json?.error;

  // ! Data
  // console.log({ json });
  const jsonResultData = jsonResult?.data;
  const jsonResultStatus = jsonResult?.status;
  const jsonResultStatusCode = jsonResult?.statusCode;
  // console.log(_, __);
  // const { data, status, statusCode } = result;
  // console.log("INFO: STATUS", jsonResultStatus);
  // console.log("INFO: STATUS CODE", jsonResultStatusCode);
  // console.log(
  // "INFO: DATA",
  // Array.isArray(jsonResultData)
  // ? jsonResultData.length + " objects"
  // : jsonResultData
  // );
  // console.log("\x1b[31m", "--------------------------------------------");
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
  };
  return postResponse;
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

  // console.log({ fetchHref, headers, body });

  // const testData = await callback();
  // const testJson = await testData.json();
  // console.log(testJson);
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
  // console.log({ jsonData });
  //   const result = jsonData.result;
  //   const data = result.data;
  //   json = data;
  // } catch (err) {
  //   error = err as Error;
  //   const responseCopy = await callback();
  //   // console.log(responseCopy)response.text();;
  //   // response = await callback()data, ;
  //   const responseText = await responseCopy.text();
  //   json = responseText;
  //   // error = new Error(responseText);
  //   // console.error(error);
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
};
