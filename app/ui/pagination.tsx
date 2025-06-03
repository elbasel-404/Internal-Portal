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
}: PaginationProps) => (
  <div className="flex gap-2">
    <Button
      variant="default"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="bg-white shadow-none text-strom-gray hover:bg-transparent"
    >
      <ChevronRight />
    </Button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <Button
        key={page}
        variant="default"
        size="sm"
        onClick={() => onPageChange(page)}
        className={`bg-white shadow-none p-3 rounded-none text-strom-gray hover:bg-[#F6F8FA] ${
          currentPage === page ? "bg-[#F6F8FA] text-[#007C9E]" : ""
        }`}
      >
        {page}
      </Button>
    ))}
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
