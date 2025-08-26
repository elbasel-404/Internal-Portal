"use server"

export const rejectRequest = async (formData: FormData) => {
  const requestId = formData.get("requestId")
  console.log("Rejected request with ID:", requestId)
}
