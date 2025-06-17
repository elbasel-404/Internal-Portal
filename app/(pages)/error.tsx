"use client" // Error boundaries must be Client Components

import { useEffect, useState } from "react"
import { errorMessageSchema } from "../zodSchemas/errorMessageSchema"
import { ErrorCode } from "../lib/ErrorCode"
import { clearUser } from "@server"
import { Modal } from "@components/modals/Modal"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const resetUser = async () => {
  await clearUser()
}

const errorHandlers: Record<
  ErrorCode,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  { function: Function; label: string; cause: string }
> = {
  invalidPath: {
    function: () => {
      if (typeof window !== "undefined") window.location.href = "/home"
    },
    label: "Go to the home page",
    cause: "invalidPath",
  },
  invalidUserId: {
    function: resetUser,
    label: "Clear user and try again",
    cause: "invalidUserId",
  },
  slotsNotFound: {
    function: resetUser,
    label: "Clear user and try again",
    cause: "slotsNotFound",
  },
  invalidUserSchema: {
    function: resetUser,
    label: "Clear user and try again",
    cause: "invalidUserSchema",
  },
  noUserInDatabase: {
    function: resetUser,
    label: "Clear user and try again",
    cause: "noUserInDatabase",
  },
}

export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [callback, setCallback] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    function: Function
    label: string
    cause: string
  }>({
    function: async () => {
      await clearUser()
    },
    label: "Try again",
    cause: "unknown error",
  })

  useEffect(() => {
    // Log the error to an error reporting service
    const errorMessage = error.message
    const errorStack = error.stack
    const errorCause = error.cause
    const errorDigest = error.digest
    const errorName = error.name

    const validatedErrorMessage =
      errorMessageSchema.safeParse(errorMessage).data
    if (validatedErrorMessage) {
      const handler = errorHandlers[validatedErrorMessage]
      if (handler) {
        setCallback(handler)
      }
    }
  }, [error])

  const handleClick = async () => {
    await callback.function()
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  return (
    <Modal initialContentClassName="bg-black/80 w-screen h-screen gap-4 flex items-center justify-center flex-col">
      <h2 className="text-red-600 text-3xl">Something went wrong</h2>
      <p className="text-lg fixed bottom-0 left-0 mb-8 ml-8 text-red-600">
        {callback.cause}
      </p>
      <button
        className="py-2 px-4 rounded-md hover:bg-black/80 transition-all hover:scale-105 text-2xl text-white bg-black/60 border border-white hover:ring-2  ring-green-600/80"
        onClick={handleClick}
      >
        {callback.label}
      </button>
    </Modal>
  )
}
