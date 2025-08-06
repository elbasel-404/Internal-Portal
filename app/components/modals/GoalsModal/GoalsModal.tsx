import { getIndicatorsRequests } from "@server"
import { Modal } from "../Modal"
import { GoalsForm } from "./GoalsForm"

export const GoalsModal = async () => {
  const indicatorData = await getIndicatorsRequests()
  return (
    <Modal
      // refreshOnClose={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[60vw] h-[95vh] 2xl:h-fit rounded-none p-0 app-scrollbar overflow-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-[3px] border-r-primary">
        <p className="text-xl font-bold text-foreground">قائمة الأهداف</p>
      </div>
      <GoalsForm indicatorData={indicatorData} />
    </Modal>
  )
}
