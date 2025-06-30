import { BookmarkIcon, ClockIcon } from "@icons"
import Image from "next/image"
import type { AdsListRequst } from "@types"
import Link from "next/link"

type NewsGridProps = {
  newsData: AdsListRequst[]
  path: string
}

export const NewsGrid = ({ newsData, path }: NewsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
      {newsData?.map((n) => (
        <div
          key={n.id}
          className="bg-white flex flex-col gap-4 group hover:-translate-y-1 transition-all ease-in-out duration-500"
        >
          <Link href={path.replace(/:\w+$/, "") + `/${n.id}`}>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={n.image}
                alt={n.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-white px-6 py-4 rounded-xl group-hover:bg-primary-opacity transition duration-500">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-between transform translate-x-full group-hover:translate-x-0 transition duration-500 ease-in-out">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <ClockIcon />
                    <button>{n.date}</button>
                  </p>
                  <button>
                    <BookmarkIcon />
                  </button>
                </div>

                <div className="flex items-center justify-between transform translate-x-0 group-hover:-translate-x-full transition duration-500 ease-in-out">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <ClockIcon />
                    <button>{n.date}</button>
                  </p>
                  <button>
                    <BookmarkIcon />
                  </button>
                </div>
              </div>

              <h5 className="text-xl font-medium text-darkBlue">{n.title}</h5>
              <span className="text-[#354A64] text-sm">{n.description}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
