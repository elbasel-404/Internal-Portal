import {
  ListTreeIcon,
  MailIcon,
  PhoneTagIcon,
  RecycleIcon,
  SignsPostIcon,
  TableIcon,
  TagsIcon,
  UserWithTagIcon,
} from "@icons"
import Image from "next/image"

interface EmployeeCardProps {
  image: string
  name: string
  position: string
  phone: string
  email: string
  sector: string
  generalAdministration: string
  management: string
  department: string
  generalManager: string
  recycleWork: string
  address: string
}

export const EmployeeCard = ({
  image,
  name,
  position,
  phone,
  recycleWork,
  address,
  email,
  sector,
  generalAdministration,
  management,
  department,
  generalManager,
}: EmployeeCardProps) => {
  return (
    <>
      <div className="rounded-xl bg-primary-opacity p-4 flex flex-col gap-4">
        <div className="flex gap-3">
          <Image
            src={image}
            alt="employee image"
            width={300}
            height={300}
            className="w-16 h-16 rounded-full border-[6px] border-white"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-medium">{name}</h2>
            <p className="text-grey-600 text-sm font-medium">{position}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-3">
            <PhoneTagIcon />
            <p className="text-sm font-medium text-grey-600">{phone}</p>
          </div>
          <div className="flex gap-3">
            <RecycleIcon />
            <p className="text-sm font-medium text-grey-600">{recycleWork}</p>
          </div>
          <div className="flex gap-3">
            <SignsPostIcon />
            <p className="text-sm font-medium text-grey-600">{address}</p>
          </div>
          <div className="flex gap-3">
            <MailIcon />
            <p className="text-sm font-medium text-grey-600">{email}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center bg-white rounded-xl p-4">
        <TableIcon width={18} height={18} className="fill-shadowBlue" />
        <p className="text-blue-300 text-sm font-medium">
          القطاع:
          <span className="text-gray-700"> {sector}</span>
        </p>
      </div>
      <div className="flex gap-3 items-center bg-white rounded-xl p-4">
        <UserWithTagIcon className="fill-shadowBlue" />
        <p className="text-blue-300 text-sm font-medium">
          الإدارة العامة:
          <span className="text-gray-700"> {generalAdministration}</span>
        </p>
      </div>
      <div className="flex gap-3 items-center bg-white rounded-xl p-4">
        <TagsIcon width={18} height={18} className="fill-shadowBlue" />
        <p className="text-blue-300 text-sm font-medium">
          الإدارة:
          <span className="text-gray-700"> {management}</span>
        </p>
      </div>
      <div className="flex gap-3 items-center bg-white rounded-xl p-4">
        <ListTreeIcon width={18} height={18} className="fill-shadowBlue" />
        <p className="text-blue-300 text-sm font-medium">
          القسم:
          <span className="text-gray-700"> {department}</span>
        </p>
      </div>
      <div className="flex gap-3 items-center bg-white rounded-xl p-4">
        <Image src={"/employee-7.svg"} alt="manager" width={40} height={40} />
        <div className="flex flex-col">
          <h2 className="text-grey-400 font-light text-sm">المدير المباشر</h2>
          <p className="text-grey-600 font-bold text-sm">{generalManager}</p>
        </div>
      </div>
    </>
  )
}
