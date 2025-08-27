import { DownloadIcon } from "@icons"
import { paths } from "@lib"
import { Button } from "@ui"
import Image from "next/image"
import Link from "next/link"
interface SideBarContentProps {
  isOpen: boolean
}

export const AppSection = ({ isOpen }: SideBarContentProps) => {
  return (
    <>
      {isOpen && (
        <div>
          <Image
            width={100}
            height={100}
            src="/background app.svg"
            alt="background app"
            className="w-full h-full relative top-24"
          />
          <div className="w-56 flex flex-col gap-3 justify-center items-center z-50 relative right-5 lg:right-7 bottom-96 lg:bottom-80">
            <div className="flex flex-col items-center gap-3 mt-4">
              <h2 className="text-2xl text-center text-white font-medium">
                تطبيق الموظفين بحلته الجديدة
              </h2>
              <p className="text-white">صارت أسهل!</p>
              <Link href={paths.employeeApplication.href}>
                <Button className="bg-primary text-white rounded-sm px-4 py-6 w-fit font-medium text-base shadow-none hover:bg-darkBlue flex justify-center items-center">
                  <DownloadIcon />
                  حمل التطبيق الآن
                </Button>
              </Link>
            </div>
            <Image
              width={300}
              height={300}
              src="/app.svg"
              alt="app"
              className="w-full px-4"
            />
          </div>
        </div>
      )}
    </>
  )
}
