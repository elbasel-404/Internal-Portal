import { NewsHeader } from "@components"
import { paths } from "@lib"
import { MonshaatCarousel } from "./MonshaatCarousel"
import { MonshaatGrid } from "./MonshaatGrid"
import { getFamilyNewsList } from "@server"
// import { monshaatData } from './config';

export const revalidate = 8400 // revalidate every 24 hours

export const MonshaatFamilySection = async () => {
  const data = await getFamilyNewsList()
  return (
    <div className="bg-white rounded-xl">
      <NewsHeader title="عائلة منشآت" url={paths.monshaatFamily.href} />
      <div className="mt-6">
        <MonshaatGrid monshaatData={data} />
        <MonshaatCarousel />
      </div>
    </div>
  )
}
