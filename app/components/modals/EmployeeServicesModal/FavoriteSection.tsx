import { MenuItem } from "@types"
import { Button } from "@ui"
import { HeartIcon } from "lucide-react"
import Link from "next/link"
import { SidebarIcons } from "../../Sidebar/SidebarIcons"

interface FavoriteSectionProps {
  favorites: MenuItem[]
  onToggleFavorite: (item: MenuItem) => void
}

export const FavoriteSection = ({
  favorites,
  onToggleFavorite,
}: FavoriteSectionProps) => {
  if (!favorites.length) return null

  return (
    <div
      className={`bg-lightGrayish px-4 pt-4 rounded-2xl ${favorites.length > 6 ? "h-3/5" : "h-fit"} overflow-y-auto app-scrollbar my-3`}
    >
      <div className="mb-6">
        <div className="bg-primary-opacity rounded-lg flex justify-center items-center gap-2 p-2 text-primary text-xl font-medium">
          <HeartIcon size={18} className="mb-1" />
          <p className="text-xl font-medium"> المفضلة:</p>
          <p>{favorites.length} خدمات</p>
        </div>
        <div className="py-3 flex flex-wrap gap-3 h-auto">
          {favorites.map((favItem) => (
            <div
              className="md:flex-grow-[1] w-full md:w-[calc(50%-24px)] lg:w-[calc(30%-24px)]"
              key={favItem.label}
            >
              <Link
                href={favItem.href}
                className="flex flex-col relative items-center gap-2 p-4 rounded-xl bg-white shadow-sm"
              >
                <div className="p-4 rounded-full border-[3px] border-primary-opacity">
                  {SidebarIcons[favItem.iconKey]}
                </div>
                <p className="2xl:text-xl text-gray-500">{favItem.label}</p>
                <Button
                  className="shadow-none w-7 h-7 bg-primary hover:bg-primary group absolute top-3 right-3 border-2 border-primary-opacity p-1"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    onToggleFavorite(favItem)
                  }}
                >
                  <HeartIcon className="fill-white" size={18} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
