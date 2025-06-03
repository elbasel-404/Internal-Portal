import { ModalLink } from "@components/modals/ModalLink"
import { ModalName } from "@types"
import { PlusIcon } from "lucide-react"

interface AddNewGoalButtonProps {
  modalName: ModalName
  children: React.ReactNode
}

export const AddNewGoalButton = ({
  modalName,
  children,
}: AddNewGoalButtonProps) => {
  return (
    <ModalLink
      name={modalName}
      className="w-full flex group font-medium justify-center items-center gap-1 bg-primary-opacity text-primary p-4 rounded-md"
    >
      <PlusIcon size={18} />
      {children}
    </ModalLink>
  )
}
