// SubmitButton.tsx
import { ModalLink } from "@components/modals/ModalLink"
import { AnglesLeftIcon } from "@icons"

export const SubmitButtonOld = () => {
  return (
    <ModalLink
      name="ConfirmationModal"
      className="flex font-medium justify-center rounded-lg items-center gap-2 bg-primary text-white px-4 py-1 border-2 border-primary"
    >
      <span className="text-lg font-bold">إرسال الطلب</span>
      <AnglesLeftIcon width={18} height={18} className="fill-white" />
    </ModalLink>
  )
}
