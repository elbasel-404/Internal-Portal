"use client"

import { completionRequestAtom } from "@atoms"
import { InputField } from "@components/form"
import { CheckIcon, XMarkIcon } from "@icons"
import { Button } from "@ui"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export const EmailAcountForm = () => {
  const [email, setEmail] = useState("")
  const [confirm, setConfirm] = useState(false)
  const router = useRouter()

  const [, setCompletionRequest] = useAtom(completionRequestAtom)

  const closeModal = () => {
    router.back()
  }
  const handleConfirm = () => {
    if (email !== "") {
      setConfirm(true)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCompletionRequest(true)
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 mt-4">
      <div className="flex flex-col gap-4 px-4 mt-4">
        {confirm ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src="/paper-plane.svg"
              alt=""
              width={100}
              height={100}
              className="w-fit h-fit"
            />
            <p className="text-xl font-bold text-darkBlue">
              هل انت متأكد من ارسال الطلب؟
            </p>
          </div>
        ) : (
          <InputField
            label="اسم الحساب المطلوب"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <div className="flex justify-end mb-2 pb-2 gap-2">
          {!confirm && (
            <Button
              onClick={handleConfirm}
              className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
              type="button"
            >
              <CheckIcon className="fill-primary group-hover:fill-white" />
              انشاء
            </Button>
          )}

          <Button
            onClick={closeModal}
            type="button"
            className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
          >
            <XMarkIcon className="fill-stormGray w-5 h-5" />
            إغلاق
          </Button>

          {confirm && (
            <Button
              className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
              type="submit"
            >
              <CheckIcon className="fill-primary group-hover:fill-white" />
              موافق
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
