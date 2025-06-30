import { type AdsListRequst } from "@types"
import { NewsCard } from "./NewsCard"
import { NewsCarousel } from "./NewsCarousel"
import { NewsGrid } from "./NewsGrid"

type NewsContentProps = {
  data: AdsListRequst[]
}

export const NewsContent = ({ data }: NewsContentProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-x-4 px-4">
        <aside className="bg-white col-span-1 order-2 lg:-order-1">
          <div className="space-y-4">
            {/* <NewsCard newsData={data?.slice(0, 3)} /> */}
            <NewsCard newsData={data} />
          </div>
        </aside>
        <div className="col-span-3">
          <NewsCarousel newsData={data} />
        </div>
      </div>
      {/* <NewsGrid newsData={data?.slice(0, 3)} /> */}
      <NewsGrid newsData={data} />
    </>
  )
}
