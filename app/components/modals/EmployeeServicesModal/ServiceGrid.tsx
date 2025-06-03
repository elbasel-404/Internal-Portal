import type { MenuItem } from "@types"
import { Button } from "@ui"
import { HeartIcon } from "lucide-react"
import Link from "next/link"
import { SidebarIcons } from "../../Sidebar/SidebarIcons"

interface ServiceGridProps {
  services: MenuItem[]
  favorites: MenuItem[]
  onToggleFavorite: (item: MenuItem) => void
}

export const ServicesGrid = ({
  services,
  favorites,
  onToggleFavorite,
}: ServiceGridProps) => (
  <>
    <div className="bg-primary-opacity rounded-lg flex justify-center items-center gap-2 p-2 text-primary text-xl font-medium">
      <p>عدد الخدمات:</p>
      <p>{services.length}</p>
    </div>
    <div className="py-3 flex flex-wrap gap-3 overflow-auto app-scrollbar">
      {services.map((service) => (
        <div
          className="md:flex-grow-[1] w-full md:w-[calc(50%-24px)] lg:w-[calc(30%-24px)] h-fit"
          key={service.label}
        >
          <Link
            href={service.href}
            className="flex flex-col relative items-center gap-2 p-4 rounded-xl bg-white shadow-sm"
          >
            <div className="p-4 rounded-full border-[3px] border-primary-opacity">
              {SidebarIcons[service.iconKey]}
            </div>
            <p className="2xl:text-xl text-gray-500">{service.label}</p>
            <Button
              className="shadow-none w-7 h-7 bg-transparent group absolute top-3 right-3 border-2 border-primary-opacity p-1"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                onToggleFavorite(service)
              }}
            >
              <HeartIcon
                className={`text-primary group-hover:fill-primary ${
                  favorites.some((fav) => fav.label === service.label)
                    ? "fill-primary"
                    : ""
                }`}
                size={18}
              />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  </>
)
