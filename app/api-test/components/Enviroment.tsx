import { InputData } from "@api/types/InputData"
import { Collapse } from "@api/ui/Collapse"
import { Inputs } from "@api/ui/Inputs"

export const Enviroment = ({ envVars }: { envVars: InputData[] }) => {
  return (
    <Collapse title="Envrioment" className="flex-1">
      <Inputs showPlusIcon={false} keyPrefix="env-vars" enteries={envVars} />
    </Collapse>
  )
}
