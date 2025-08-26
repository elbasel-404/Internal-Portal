"use server"

export const acceptRequest = async (formData: FormData) => {
  const requestId = formData.get("requestId")
  console.log("Accepted request with ID:", requestId)
}
