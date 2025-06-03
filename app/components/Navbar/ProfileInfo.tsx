import { Button, Popover, PopoverContent, PopoverTrigger } from "@ui"
import Image from "next/image"

import { getUser } from "@server"

export const ProfileInfo = async () => {
  const user = await getUser()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          className="w-10 h-10 rounded-full cursor-pointer"
          width={40}
          height={40}
          src="/demo-img.png"
          alt="profile-picture"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col items-center justify-center gap-3 py-5 px-4 bg-white rounded-xl shadow-md w-full"
      >
        <Image
          className="w-20 h-20 rounded-full"
          width={40}
          height={40}
          src="/demo-img.png"
          alt="profile-picture"
        />
        <h1 className="text-2xl text-foreground text-center">{user.name}</h1>
        <p className="font-light">مدير الأنظمة الداخلية (مكلف)</p>
        <Button className="w-full min-h-12 text-primary font-medium bg-primary-opacity rounded-full shadow-none hover:text-white hover:bg-primary">
          بياناتي
        </Button>
        <Button className="w-full min-h-12 text-danger-foreground font-medium bg-danger rounded-full shadow-none hover:text-white hover:bg-danger-500">
          تسجيل الخروج
        </Button>
      </PopoverContent>
    </Popover>
  )
}
