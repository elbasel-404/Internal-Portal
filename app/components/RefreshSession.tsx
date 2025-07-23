"use client"

import { Loader } from "lucide-react"
import { useEffect } from "react"
import { refreshSession } from "../server/refreshSession"

export const RefreshSession = () => {
  const init = async () => {
    refreshSession()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex gap-4">
      <h1 className="text-xl font-bold text-white">
        Refreshing your session, please wait...
      </h1>
      <Loader className="animate-spin" />
    </div>
  )
}
