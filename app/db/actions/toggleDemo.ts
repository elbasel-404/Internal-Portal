"use server"

import { cookies } from "next/headers"
// import { disableDemo } from "./disableDemo"
// import { enableDemo } from "./enableDemo"
import { getDemo } from "./getDemo"
import { revalidatePath } from "next/cache"

export const toggleDemo = async () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* _prevState: any, */
  /* _formData: FormData, */
  {
    // return { isDemo: false }
    const isDemo = await getDemo()
    const cookieStore = await cookies()
    if (isDemo) {
      cookieStore.set("demo", "false")
    } else {
      cookieStore.set("demo", "true")
    }
    revalidatePath("/", "layout")
    return { isDemo: !isDemo }
    // if (isDemo) return await disableDemo()

    // await enableDemo()
    // return {}
  }
