import Link from "next/link"
import { ArrowLeftIcon } from "@icons"
import { Button } from "@ui"
import type { Route } from "next"

interface ArrowButtonProps {
  title: string
  link?: Route
  bgButtonColor?: string
  titleWeight?: string
  className?: string
}

export const ArrowButton = ({
  title,
  titleWeight,
  bgButtonColor,
  link,
  className,
}: ArrowButtonProps) => {
  return (
    <Link href={link || "#"} className={className}>
      <Button
        size="sm"
        icon={
          <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
            <ArrowLeftIcon width={11} height={11} className="fill-foreground" />
          </span>
        }
        iconRight={false}
        className={`rounded-full pl-1 ${bgButtonColor} shadow-none hover:bg-background`}
      >
        <span className={`text-sm ${titleWeight} text-foreground`}>
          {title}
        </span>
      </Button>
    </Link>
  )
}
