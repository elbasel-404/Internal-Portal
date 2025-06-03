import { getStoredEmployeeId } from "@auth"

export const EmployeeId = async () => {
  const storedEmployeeId = await getStoredEmployeeId()
  return (
    <div
      dir="ltr"
      className="text-3xl flex items-center justify-center fixed top-0 w-screen h-20 text-white text-center z-50 bg-black"
    >
      <p>Employee ID: {storedEmployeeId ? storedEmployeeId : "null"}</p>
    </div>
  )
}
