import { getPressFileDetails } from "@server"
import { PressFileDetails } from "../../../press-file/components"

type Params = Promise<{ id: string }>

interface MonshaatDetailsDetailsPageProps {
  params: Params
}

const MonshaatDetailsDetailsPage = async ({
  params,
}: MonshaatDetailsDetailsPageProps) => {
  const { id } = await params

  const { date, title, description, imageUrl } = (await getPressFileDetails(
    id,
  )) || { date: "", title: "", description: "", imageUrl: "" }
  return (
    <div>
      <PressFileDetails details={{ date, title, description, imageUrl }} />
    </div>
  )
}

export default MonshaatDetailsDetailsPage
