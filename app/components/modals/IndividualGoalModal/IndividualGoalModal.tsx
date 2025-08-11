import { Modal } from "../Modal"
import { IndividualGoalForm } from "./IndividualGoalForm"

export const IndividualGoalModal = async () => {
  return (
    <Modal
      // refreshOnClose={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[50vw] h-fit 2xl:h-fit rounded-none p-0 app-scrollbar overflow-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-[3px] border-r-primary">
        <p className="text-xl font-bold text-foreground">إنشاء هدف فردي جديد</p>
      </div>
      <IndividualGoalForm />
    </Modal>
  )
}
