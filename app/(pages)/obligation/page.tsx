import { getObligationDetails } from "@server"
import { ObligationForm } from "./components"

const ObligationPage = async () => {
  const obligationDetails = await getObligationDetails()
  return (
    <div className="bg-white rounded-lg">
      <header className="flex items-center">
        <div className="flex gap-4 items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary rounded-tr-lg rounded-tl-lg w-full">
          <h2 className="text-primary font-bold text-xl">نموذج الإفصاح</h2>
        </div>
      </header>
      <div className="p-4 rounded-md bg-cloudGray mt-6 mx-4">
        <div
          className="text-grey-600 font-medium leading-7 text-lg"
          dangerouslySetInnerHTML={{ __html: obligationDetails?.details || "" }}
        />
      </div>
      <ObligationForm />
    </div>
  )
}

export default ObligationPage
