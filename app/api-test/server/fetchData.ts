"use server"

import type { ActionState } from "@api/types/ActionState"
import { sleep } from "@utils"

export const fetchData = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  await sleep(3)
  const DataObject = Object.fromEntries(formData.entries())
  console.log({ DataObject })
  console.log({ prevState })
  return {
    data: {
      test: "test",
    },
    error: null,
  }
}
