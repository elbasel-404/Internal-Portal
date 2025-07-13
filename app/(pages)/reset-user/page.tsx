"use client"

// import { logout } from "@auth"
import { deleteUserId } from "@server"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { createUser } from "../../server/createUser"
import { redirect } from "next/navigation"

const ResetUerPage = () => {
  const resetUser = async () => {
    await deleteUserId()
    await createUser()
    setTimeout(() => {
      redirect("/home")
    }, 3000)
    // await logout()
  }

  useEffect(() => {
    resetUser()
  }, [])

  return (
    <main dir="ltr" className="flex items-center justify-center gap-2">
      <h1 className="text-xl text-center font-bold">
        Reseting your userId..., please wait
      </h1>
      <Loader className="animate-spin" />
    </main>
  )
}

export default ResetUerPage
