"use client"

import { useEffect } from "react"
import { registerChartjsPlugins } from "@utils"

export const RegisterChartJSPlugins = () => {
  useEffect(() => {
    registerChartjsPlugins()
  }, [])

  return null
}
