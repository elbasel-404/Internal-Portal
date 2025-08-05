import { InputData } from "@api/types/InputData"

type EndpointUrl = {
  url: string
  requestBody?: InputData[]
}

export const endpointsUrls: EndpointUrl[] = [
  {
    url: "api/po/hr/holidays/request",
    requestBody: [] as const,
  },
  {
    url: "api/po/read/portal-news",
    requestBody: [
      {
        key: "news_id",
        value: "",
      },
      {
        key: "news_type",
        value: "ads",
      },
    ] as const,
  },
]
