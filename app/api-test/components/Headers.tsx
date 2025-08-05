import { Inputs } from "../ui/Inputs"
import { InputData } from "../types/InputData"
import { Collapse } from "../ui/Collapse"

export const Headers = ({ headersList }: { headersList: InputData[] }) => {
  return (
    <Collapse title="Headers" className="flex-1">
      <Inputs showPlusIcon={true} keyPrefix="headers'" enteries={headersList} />
    </Collapse>
  )
}
