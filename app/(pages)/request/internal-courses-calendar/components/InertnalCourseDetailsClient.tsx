"use client"

import { RequestDetails, RequestStatus } from "@components"
import { AnglesLeftIcon } from "@icons"
import { acceptTraining, cancelTraining } from "@server"
import { RequestHeader, type RequestStatus as InternalStatus } from "@types"
import { Button } from "@ui"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
  courseId: string
  headers: RequestHeader[]
  caption: string
  status: InternalStatus[]
  trainingButton: boolean | undefined
}

export const InternalCourseDetailsClient = ({
  courseId,
  headers,
  caption,
  status,
  trainingButton,
}: Props) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      const response = await acceptTraining(courseId)
      if (response?.status === "success") {
        setSubmitted(true)
        toast.success(response.message || "تم تقديم الطلب بنجاح")
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ. الرجاء المحاولة لاحقًا.")
    } finally {
      setSubmitted(false)
    }
  }

  const handleCancel = async () => {
    try {
      const response = await cancelTraining(courseId)
      if (response?.status === "success") {
        setSubmitted(true)
        toast.success(response.message || "تم رفض الطلب بنجاح")
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ. الرجاء المحاولة لاحقًا.")
    } finally {
      setSubmitted(false)
    }
  }

  return (
    <>
      {!submitted && (
        <>
          <RequestStatus status={status} caption={caption} />
          <RequestDetails headers={headers} />
        </>
      )}
      <Button
        onClick={!trainingButton ? handleCancel : handleSubmit}
        className={`mt-4 flex w-full font-medium justify-center rounded-lg items-center gap-2 ${
          !trainingButton
            ? "bg-red-500 border-red-500 hover:bg-red-500"
            : "bg-primary border-primary hover:bg-primary"
        } text-white px-4 py-1 border-2`}
      >
        <span className="text-lg font-bold">
          {!trainingButton ? "قم بإلغاء الدورة" : "التقدم للدورة"}
        </span>
        <AnglesLeftIcon width={18} height={18} className="fill-white" />
      </Button>
    </>
  )
}
