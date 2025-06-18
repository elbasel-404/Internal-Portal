import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@ui"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNeighbours = 1
  const getPageItems = () => {
    const totalNumbers = pageNeighbours * 2 + 5
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | "LEFT" | "RIGHT")[] = []
    const leftBound = Math.max(2, currentPage - pageNeighbours)
    const rightBound = Math.min(totalPages - 1, currentPage + pageNeighbours)
    const hasLeftEllipsis = leftBound > 2
    const hasRightEllipsis = rightBound < totalPages - 1
    pages.push(1)
    if (hasLeftEllipsis) pages.push("LEFT")
    for (let i = leftBound; i <= rightBound; i++) pages.push(i)
    if (hasRightEllipsis) pages.push("RIGHT")
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
      <Button
        variant="default"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white shadow-none text-strom-gray hover:bg-transparent"
      >
        <ChevronRight />
      </Button>
      {getPageItems().map((item, index) => {
        if (item === "LEFT" || item === "RIGHT") {
          return (
            <span
              key={item + index}
              className="flex items-center px-3 text-gray-500"
            >
              ...
            </span>
          )
        }
        return (
          <Button
            key={item}
            variant="default"
            size="sm"
            onClick={() => onPageChange(item as number)}
            className={`bg-white shadow-none p-3 rounded-none text-strom-gray hover:bg-[#F6F8FA] ${
              currentPage === item ? "bg-[#F6F8FA] text-[#007C9E]" : ""
            }`}
          >
            {item}
          </Button>
        )
      })}
      <Button
        variant="default"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white shadow-none text-strom-gray hover:bg-transparent"
      >
        <ChevronLeft />
      </Button>
    </div>
  )
}
