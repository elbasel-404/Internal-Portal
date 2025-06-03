import {
  BookmarkIcon,
  ClockIcon,
  DislikeIcon,
  LikeIcon,
  PaperPlaneIcon,
  ShareIcon,
  TextIcon,
} from "@icons"
import { Button, Textarea } from "@ui"
import Image from "next/image"

export interface PressFileDetailsProps {
  details: {
    date: string
    title: string
    imageUrl: string
    description: string
  }
}

export const PressFileDetails = ({ details }: PressFileDetailsProps) => {
  return (
    <div className="bg-white rounded-lg">
      <header className="flex items-center border-b border-[#ECF0F480] p-4">
        <div className="flex gap-3 items-center">
          <h2 className="text-darkBlue font-bold text-2xl">التفاصيل</h2>
        </div>
      </header>
      <div className="p-4 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <ClockIcon />
            <button>{details.date}</button>
          </p>
          <h1 className="text-xl lg:text-3xl font-bold leading-6 text-foreground">
            {details.title}
          </h1>
          <div className="flex flex-wrap gap-1">
            <Button
              variant="outline"
              className="flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2 hover:bg-primary-opacity group"
            >
              <BookmarkIcon
                width={12}
                height={12}
                className="mr-2 fill-grey-500 group-hover:fill-primary"
              />
              <p className="text-sm text-grey-500 font-light group-hover:text-primary">
                حفظ
              </p>
            </Button>
            <Button
              variant="outline"
              className="flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2 hover:bg-primary-opacity group"
            >
              <ShareIcon
                width={12}
                height={12}
                className="mr-2 fill-grey-500 group-hover:fill-primary"
              />
              <p className="text-sm text-grey-500 font-light group-hover:text-primary">
                مشاركة
              </p>
            </Button>
            <Button
              variant="outline"
              className="flex gap-1 w-fit shadow-none bg-grey-100 px-2 hover:bg-primary-opacity group"
            >
              <TextIcon
                width={12}
                height={12}
                className="mr-2 fill-grey-500 group-hover:fill-primary"
              />
              <p className="text-sm text-grey-500 font-light group-hover:text-primary">
                الحجم
              </p>
            </Button>
          </div>
        </div>

        <Image
          src={details.imageUrl}
          alt="Press Event"
          width={800}
          height={400}
          className="rounded-lg w-full h-full my-4"
        />

        <div
          className="text-grey-600 leading-7"
          dangerouslySetInnerHTML={{ __html: details.description }}
        />
        <div className="mb-4">
          <a
            href="https://franchisesa.monshaat.gov.sa/step1"
            className="text-primary underline"
            target="_blank"
          >
            https://franchisesa.monshaat.gov.sa/step1
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 bg-primary-opacity rounded-full w-fit p-4">
          <p className="sm:text-lg font-medium text-primary">
            هل اعجبك المحتوي؟
          </p>
          <Button className="bg-transparent rounded-full border border-primary shadow-none p-2">
            <LikeIcon />
          </Button>
          <Button className="bg-transparent rounded-full border border-primary shadow-none p-2">
            <DislikeIcon />
          </Button>
        </div>

        <div className="flex flex-col mt-8 border-t pt-4 gap-4">
          <h2 className="text-2xl font-semibold text-foreground">التعليقات</h2>
          <div className="flex items-center gap-2">
            <Image
              width={150}
              height={150}
              src="/demo-img.png"
              alt="user"
              className="w-12 h-12 rounded-full border-2 border-cloudGray"
            />
            <div className="w-full">
              <Textarea
                className="w-full shadow-lg p-2 border border-grey-100 rounded-xl"
                placeholder="اكتب تعليق ..."
                rows={3}
              ></Textarea>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-primary rounded-lg h-12 shadow-none hover:bg-primary w-full text-white p-4"
          >
            <span className="text-xl font-semibold">ارسل التعليق</span>
            <PaperPlaneIcon
              width={20}
              height={20}
              className="fill-white font-bold"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
