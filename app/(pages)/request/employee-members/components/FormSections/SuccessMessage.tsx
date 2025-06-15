interface SuccessMessageProps {
  requestId: string | number | null
}

export const SuccessMessage = ({ requestId }: SuccessMessageProps) => {
  return (
    <div className="bg-white text-black text-lg p-4 space-y-4">
      <p className="text-center">تم انشاء الطلب بنجاح</p>
      <p className="text-center">رقم الطلب: {requestId}</p>
    </div>
  )
}
