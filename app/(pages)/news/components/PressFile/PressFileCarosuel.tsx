"use client"

import { NewsHeader } from "@components"
import { paths } from "@lib"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui"
import { PressFileCard } from "./PressFileCard"
import { pressFileData } from "./config"

export const PressFileCarousel = () => {
  return (
    <div className="bg-white space-y-4 rounded-xl pb-12">
      <NewsHeader title="الملف الصحفي" url={paths.pressFile.href} />
      <Carousel
        opts={{
          loop: true,
          align: "end",
          direction: "rtl",
        }}
        className="p-4"
      >
        <CarouselContent>
          {pressFileData.map((file, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3">
              <PressFileCard {...file} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-14 left-[35%] md:left-[40%] lg:left-[45%] flex items-center justify-center">
          <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 bg-primary-opacity" />
        </div>
        <div className="absolute -bottom-14 right-[35%] md:right-[40%] lg:right-[45%] flex items-center justify-center">
          <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 bg-primary-opacity" />
        </div>
      </Carousel>
    </div>
  )
}
