import { BookmarkIcon, ClockIcon } from "@icons"
import type { AdsListRequst } from "@types"
import Link from "next/link"

type NewsGridProps = {
  newsData: AdsListRequst[]
  path: string
}

export const NewsCard = ({ newsData, path }: NewsGridProps) => {
  return (
    <aside className="bg-white col-span-1 order-2 lg:-order-1">
      <div className="space-y-4 h-[400px] rounded-xl overflow-y-auto app-scrollbar">
        {newsData?.map((n) => (
          <div
            key={n.id}
            className="bg-primary-opacity px-6 py-4 rounded-xl hover:bg-white"
          >
            <Link href={path.replace(/:\w+$/, "") + `/${n.id}`}>
              {/* TODO: Make this a button */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <ClockIcon />
                  <span>{n.date}</span>
                </p>
                <BookmarkIcon />
              </div>

              <h5 className="text-xl font-medium text-darkBlue">{n.title}</h5>
              <span className="text-[#354A64] text-sm">{n.description}</span>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  )
}
