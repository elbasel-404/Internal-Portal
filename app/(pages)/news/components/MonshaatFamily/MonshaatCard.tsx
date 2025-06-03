import { BookmarkIcon, ClockIcon } from "@icons"
import { Card, CardContent } from "@ui"
import Image from "next/image"

interface NewsCardProps {
  title: string
  date: string
  image: string
}

export const MonshaatCard = ({ title, date, image }: NewsCardProps) => {
  return (
    <Card className="w-full hover:bg-primary-opacity shadow-none border-none rounded-2xl p-2">
      <CardContent className="p-4">
        <div className="flex  justify-between">
          <div className="flex items-center gap-3">
            <Image
              width={120}
              height={120}
              src={image}
              alt="News Logo"
              className="w-[70px] h-[70px]  object-cover"
            />
            <div className="flex flex-col justify-between ">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <ClockIcon />
                <span className="mt-1">{date}</span>
              </p>
              <h3 className="font-medium text-foreground text-lg leading-6">
                {title}
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start gap-3 mt-2">
            <BookmarkIcon />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
