import type { RequestType } from "@types"
import { twMerge } from "tailwind-merge"

interface MyRequestsProps {
  requests: RequestType[]
}

export const MyRequests = ({ requests }: MyRequestsProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center p-2 bg-slate-200">
          <h2 className="flex-1 text-center">رقم الطلب</h2>
          <h2 className="flex-1 text-center">المسمى</h2>
          <h2 className="flex-1 text-center">تاريخ الطلب</h2>
        </div>
        {requests.map((request, index) => (
          <div
            key={request.id}
            className={twMerge(
              "flex items-center p-2",
              index % 2 !== 0 && "bg-slate-200",
            )}
          >
            <p className="flex-1 text-center">{request.id}</p>
            <p className="flex-1 text-center">{request.description}</p>
            <p className="flex-1 text-center">{request.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
