"use server"

import { environmentStorage } from "@storage"
import { revalidatePath } from "next/cache"

export const formAction = async (formData: FormData) => {
  const formEntires = [...formData.entries()]
  formEntires.forEach(([key, value]) => {
    environmentStorage.set(key, value.toString())
  })

  revalidatePath("/environment", "layout")
}
