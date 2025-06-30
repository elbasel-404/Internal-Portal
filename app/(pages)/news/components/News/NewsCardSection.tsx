import { BookmarkIcon, ClockIcon } from "@icons"
import { Card } from "@ui"
import Image from "next/image"
// import { newsData } from './config';
import { getNewsListRequests } from "@server"

export const revalidate = 8400 // revalidate every 24 hours

export const NewsCardSection = async () => {
  const newsData = await getNewsListRequests()

  const sideNews = newsData.slice(1, 4)

  return (
    <div className="col-span-1 flex flex-col w-full">
      {sideNews.map((news) => (
        <Card
          key={news.id}
          className="grid grid-cols-3 p-2 shadow-none border-none transition"
        >
          <div className="col-span-1 relative size-32">
            <Image
              fill
              className="object-cover rounded-md"
              src={news.image}
              alt={news.title}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-3 py-4">
            <div className="flex items-center justify-between ">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <ClockIcon />
                <span className="mt-1">{news.date}</span>
              </p>
              <BookmarkIcon className="hover:fill-primary hover:cursor-pointer" />
            </div>
            <h3 className="text-foreground text-lg leading-tight">
              {news.title}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  )
}
