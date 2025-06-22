import { PaperPlaneIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"

interface FormActionsProps {
  onClose: () => void
  // onSubmit is not used in this component
}

export const FormActions = ({ onClose }: FormActionsProps) => {
  return (
    <div className="flex justify-end mb-2 gap-2 px-4">
      <Button
        onClick={onClose}
        type="button"
        className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
      >
        <XMarkIcon className="fill-stormGray w-0 h-0" />
        إغلاق
      </Button>

      <Button
        className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
        type="submit"
      >
        <PaperPlaneIcon className="fill-primary group-hover:fill-white" />
        حفظ
      </Button>
    </div>
  )
}
