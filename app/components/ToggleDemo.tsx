"use client"

// import { useAtomValue, useSetAtom } from "jotai";
// import { getDemo } from "../db/actions/getDemo";
import { toggleDemo } from "../db/actions/toggleDemo"
// import { demoAtom } from "../atoms/demoAtom";
import { apiErrorAtom } from "../atoms/apiErrorAtom"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { getDemo } from "../db/actions/getDemo"
import { cn } from "@utils"

export const dynamic = "force-dynamic"

export const ToggleDemo = () => {
  const isApiError = useAtomValue(apiErrorAtom)
  const setApiError = useSetAtom(apiErrorAtom)
  const [isDemo, setIsDemo] = useState<null | boolean>(null)

  const onSubmit = () => {
    console.log({ isApiError })
    if (isApiError) {
      setTimeout(() => {
        setApiError(null)
        window.location.reload()
      }, 1000)
      // const is      console.log("API Error");Demo = await getDemo();
      // setDemoAtom(isDemo);
    }
  }

  const initDemo = async () => {
    const isDemo = await getDemo()
    setIsDemo(isDemo)
  }

  useEffect(() => {
    initDemo()
  })

  return (
    <div
      dir="ltr"
      className="flex w-max flex-col items-center fixed bottom-[20px] left-[20px] rounded-xl overflow-hidden text-white"
    >
      <form className="bg-black w-full" action={toggleDemo} onSubmit={onSubmit}>
        <button
          className="flex justify-center items-center gap-2 flex-1 py-2 px-2"
          type="submit"
        >
          <div className="w-full  text-center">Toggle Demo</div>
          <div
            className={cn(
              "w-[30px] aspect-square rounded-full border",
              isDemo === null &&
                "animate-spin bg-gradient-to-r from-red-700 to-lime-500",
              isDemo === false && "bg-red-400",
              isDemo && "bg-green-400",
            )}
          />
        </button>
      </form>

      {isDemo !== null ? (
        <div
          className={cn(
            "text-sm flex gap-1 justify-center w-full px-2 py-2",
            isDemo ? "bg-green-400" : "bg-red-400",
          )}
        >
          <span className="text-black">demo:</span>
          <span className="text-black">{isDemo ? "true" : "false"}</span>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
