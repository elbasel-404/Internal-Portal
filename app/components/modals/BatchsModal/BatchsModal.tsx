import { getUser } from "@db/actions"
import { getUserId } from "@server"
import { Modal } from "../Modal"
import { BatchsForm } from "./BatchsForm"

export const BatchsModal = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { batchProducts } = await getUser(userId)
  return (
    <Modal
      refreshOnClose={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[80vw] [95vh] rounded-none p-0 app-scrollbar overflow-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-[3px] border-r-primary">
        <p className="text-xl font-bold text-foreground">إضافة دفعة</p>
      </div>
      <BatchsForm batchProducts={batchProducts} />
    </Modal>
  )
}
