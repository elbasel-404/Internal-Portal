"use server"

import type { Rules } from "@types"
import { RulesSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"
import { z } from "zod"

export const getRulesRequests = async (): Promise<Rules[]> => {
  return getData<Rules>({
    url: "api/po/read/rules",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: RulesSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof RulesSchema>

        return {
          title: String(typedItem.title || ""),
          description: String(typedItem.resume || ""),
          policyNumber: String(typedItem.code || ""),
          timestamp: String(typedItem.create_date || "")
            .split(" ")
            .join(" | "),
          attachment: String(typedItem.attachment_url_browse || ""),
          download: String(typedItem.attachment_url_download || ""),
        }
      })
    },
    dummyData,
  })
}

const dummyData: Rules[] = [
  {
    title: "مدونة قواعد السلوك الوظيفي وأخلاقيات الوظيفة العامة",
    description:
      "تسعى الهيئة العامة للمنشآت الصغيرة والمتوسطة إلى تحقيق رؤية المملكة 2030 من خلال دعم المنشآت الصغيرة والمتوسطة، وتقديم خدماتها المتنوعة، بما يحقق أهدافها الاستراتيجية. هذا النص مثال للتوسعة عند الضغط على عرض المزيد لمعرفة ما إذا كان سيتم عرض كامل النص أو لا.",
    policyNumber: "2",
    timestamp: "06:32 | 03-05-2028",
    sideImages: ["/news-1.svg", "/news-2.svg", "/news-3.svg"],
    mainImage: "/rules.svg",
    attachment: "دليل الموظف.pdf",
    download: "",
  },
  {
    title: "السلوك الوظيفي وأخلاقيات الوظيفة",
    description:
      "يهدف هذا المستند إلى تنظيم العلاقة بين الموظفين والمنشأة وتحقيق الالتزام بأعلى معايير السلوك المهني.",
    policyNumber: "3",
    timestamp: "06:32 | 03-05-2028",
    sideImages: [],
  },
  {
    title: "اللائحة الإدارية",
    description:
      "توفر هذه اللائحة القواعد والسياسات الخاصة بتنظيم العمل الإداري الداخلي وطرق المتابعة والمساءلة.",
    policyNumber: "4",
    timestamp: "06:32 | 03-05-2028",
    sideImages: [],
  },
  {
    title: "سياسة الخصوصية",
    description: "تسعى الهيئة العامة للمنشآت الصغيرة والمتوسطة",
    policyNumber: "5",
    timestamp: "06:32 | 03-05-2028",
    sideImages: [],
  },
]
