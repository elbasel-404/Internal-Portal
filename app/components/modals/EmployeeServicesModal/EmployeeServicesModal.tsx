import { UserWithFolderIcon } from "@icons"
import { Modal } from "../Modal"
import { FilterTabs } from "./FilterTabs"

export const EmployeeServicesModal = () => {
  return (
    <Modal
      handleClickInternally={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[60vw] rounded-2xl app-scrollbar overflow-auto"
    >
      <div className="p-3 flex items-center gap-2 div rounded-lg bg-primary-opacity">
        <div className="p-3 rounded-xl bg-primary">
          <UserWithFolderIcon className="#fff" />
        </div>
        <p className="text-xl font-bold text-foreground">خدمات الموظفين</p>
      </div>
      <FilterTabs menuKey="Citizen" favoritesKey="Citizen" />
    </Modal>
  )
}
