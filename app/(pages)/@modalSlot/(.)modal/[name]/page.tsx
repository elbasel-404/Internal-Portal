import { modalNameSchema } from "@zodSchemas"
import { ModalName } from "@types"
import { ComponentType } from "react"
import { notFound } from "next/navigation"

interface ModalSlotPageProps {
  params: Promise<{ name: string }>
}

const loadModal = async (name: ModalName) => {
  const modal = await import(`../../../../components/modals/${name}`).then(
    (module) => module[name],
  )
  return modal as ComponentType
}

const ModalSlotPage = async ({ params }: ModalSlotPageProps) => {
  const { name } = await params

  if (!name) return
  const parsedName = modalNameSchema.safeParse(name)
  if (!parsedName.success) {
    notFound()
  }

  const Modal = await loadModal(parsedName.data)
  return <Modal />
}

export default ModalSlotPage
