import { InternalAds, MonshaatFamily, News, PressFile } from "./components"

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
