import { BookmarkIcon } from "@icons"
import { Card, CardContent } from "@ui"
import Image from "next/image"
import { getNewsListRequests } from "@server"
// import { newsData } from './config';

export const revalidate = 8400 // revalidate every 24 hours

export const FeaturedSection = async () => {
  const newsData = await getNewsListRequests()
  const featuredNews = newsData[0]

  return (
    <>
      {featuredNews && (
        <Card className="lg:col-span-2 relative w-full h-full xl:h-[430px] overflow-hidden rounded-lg">
          <Image
            width={100}
            height={100}
            src={featuredNews.image}
            alt={featuredNews.title}
            className="w-full h-full xl:h-[430px] object-cover"
          />
          <CardContent
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.07) 0%, #091B36 80%)",
            }}
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
          >
            <div className="flex justify-between items-center text-gray-300 text-sm">
              <span>{featuredNews.date}</span>
              <BookmarkIcon className="fill-white cursor-pointer" />
            </div>
            <h3 className="text-2xl font-bold mt-2">{featuredNews.title}</h3>
            <p className="text-gray-200 mt-1">{featuredNews.description}</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
