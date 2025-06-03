import { RingsIcon } from "@icons"
import { FilterTabs } from "../EmployeeServicesModal/FilterTabs"
import { Modal } from "../Modal"

export const InternalSystemsModal = () => {
  return (
    <Modal
      handleClickInternally={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[60vw] rounded-2xl app-scrollbar overflow-auto"
    >
      <div className="p-3 flex items-center gap-2 div rounded-lg bg-primary-opacity">
        <div className="p-3 rounded-xl bg-primary">
          <RingsIcon />
        </div>
        <p className="text-xl font-bold text-foreground">الأنظمة الداخلية</p>
      </div>
      <FilterTabs menuKey="InternalSystems" favoritesKey="InternalSystems" />
    </Modal>
  )
}
