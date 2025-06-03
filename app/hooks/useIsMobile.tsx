import { useWindowSize } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!width) return
    setIsMobile(width < MOBILE_BREAKPOINT)
  }, [width])

  return isMobile
}
