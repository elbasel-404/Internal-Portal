"use server"

export const logFormData = async (data: FormData) => {
  const dataObject = Object.fromEntries(data.entries())
  console.log({ dataObject })
}
