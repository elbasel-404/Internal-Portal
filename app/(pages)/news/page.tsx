import { InternalAds, MonshaatFamily, News, PressFile } from "./components"

export const revalidate = 86400 // revalidte every 24 hours

const NewsListPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <PressFile />
      <News />
      <MonshaatFamily />
      <InternalAds />
    </div>
  )
}

export default NewsListPage
