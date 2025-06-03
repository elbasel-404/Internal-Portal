import { CalenderSmallIcon, LineUpIcon, TagIcon } from "@icons"
import type { User } from "@types"
import { Button, UserInfoCard } from "@ui"
import Image from "next/image"

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { name, department, duration, employeeId, image, job, score } = user

  return (
    <div className="bg-white">
      {/* <h2 className='text-2xl font-bold border-b border-[#ECF0F480] p-4'>
        بياناتي
      </h2> */}
      <div className="flex gap-6 p-4">
        <Image
          width={80}
          height={80}
          src={image}
          alt="user"
          className="w-[90px] h-[90px] sm:inline-block rounded-full border-2 border-cloudGray mt-6 hidden"
        />
        <div className="flex flex-col flex-1 px-2 gap-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="flex items-start gap-2">
              <Image
                width={80}
                height={80}
                src={image}
                alt="user"
                className="w-[70px] h-[70px] rounded-full border-2 border-cloudGray sm:hidden"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-medium">{name}</h3>
                <p className="text-grey-600">
                  المسمى الوظيفي: <span className="text-foreground">{job}</span>
                </p>
              </div>
            </div>

            <div className="flex items-end justify-center">
              <Button
                variant="default"
                className="bg-lightGrayish text-foreground hover:bg-lightGrayish cursor-default px-4 py-2.5 rounded-full shadow-none"
              >
                الرقم الوظيفي: {employeeId}
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <UserInfoCard
              title="القسم"
              icon={<TagIcon />}
              content={department}
            />
            <UserInfoCard
              title="الدرجة"
              icon={<LineUpIcon />}
              content={score}
            />
            <UserInfoCard
              title="مدة الخدمة"
              icon={<CalenderSmallIcon />}
              content={duration}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
