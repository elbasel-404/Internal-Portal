import { CirclePlusIcon } from "@icons"
import { Table } from "@components"
import { ModalLink } from "@components/modals/ModalLink"
import { ModalName } from "@types"

interface traineeInterface {
  title: string
  data: Array<any>
  tableHeaders: Array<{ label: string }>
  modalname: ModalName
}
export const TraineeTypeContent = ({
  title,
  data,
  tableHeaders,
  modalname,
}: traineeInterface) => {
  return (
    <div className="px-4 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{title}</h2>
        <ModalLink
          name={modalname}
          className="flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary"
        >
          <CirclePlusIcon className="fill-white group-hover:fill-primary" />
          إضافة
        </ModalLink>
      </div>
      <Table columns={tableHeaders} rows={data} />
    </div>
  )
}
