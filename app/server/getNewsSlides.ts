import type { NewsCardSlide } from "@types"

export const getNewsSlides = async (): Promise<NewsCardSlide[]> => {
  return slides
}

const slides = [
  {
    id: 1,
    title:
      "منشآت تختتم أسبوع القانون بمناقشة أهم الفرص الواعدة لرواد الأعمال في قطاع القانون",
    date: "الإثنين 13 مايو 2024 - 5:00 مساءًا",
    image: "/info-img.jpeg",
    day: 14,
    month: "مايو",
  },
  {
    id: 2,
    title:
      "منشآت تختتم أسبوع القانون بمناقشة أهم الفرص الواعدة لرواد الأعمال في قطاع القانون",
    date: "الإثنين 13 مايو 2024 - 5:00 مساءًا",
    image: "/info-img.jpeg",
    day: 14,
    month: "مايو",
  },
  {
    id: 3,
    title:
      "منشآت تختتم أسبوع القانون بمناقشة أهم الفرص الواعدة لرواد الأعمال في قطاع القانون",
    date: "الإثنين 13 مايو 2024 - 5:00 مساءًا",
    image: "/info-img.jpeg",
    day: 14,
    month: "مايو",
  },
]
