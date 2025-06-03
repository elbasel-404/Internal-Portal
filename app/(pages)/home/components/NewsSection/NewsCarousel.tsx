import { BookmarkIcon, ClockIcon } from "@icons"
import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui"
import Image from "next/image"
import type { AdsListRequst } from "@types"

type NewsCarouselProps = {
  newsData: AdsListRequst[]
}

export const NewsCarousel = ({ newsData }: NewsCarouselProps) => {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "end",
        direction: "rtl",
      }}
      className="w-full relative"
    >
      <CarouselContent>
        {newsData?.map((slide) => (
          <CarouselItem key={slide.id}>
            <Card className="border-0 overflow-hidden rounded-2xl relative">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-20 right-0 p-6 text-right text-white w-full">
                <div className="bg-white px-6 py-4 rounded-xl w-fit sm:w-1/2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <ClockIcon />
                      <span>{slide.date}</span>
                    </p>
                    {/* TODO: Make this a button */}
                    <BookmarkIcon />
                  </div>
                  <h5 className="text-xl font-medium text-darkBlue">
                    {slide.title}
                  </h5>
                  <span className="text-[#354A64] text-sm">
                    {slide.description}
                  </span>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-20 right-16 -translate-y-1/2 z-10">
        <CarouselPrevious className="bg-white/90 hover:bg-white border-0 shadow-lg" />
      </div>
      <div className="absolute bottom-20 right-20 -translate-y-1/2 z-10">
        <CarouselNext className="bg-white/90 hover:bg-white border-0 shadow-lg" />
      </div>
    </Carousel>
  )
}
