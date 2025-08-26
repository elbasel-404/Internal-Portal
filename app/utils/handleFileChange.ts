import type { Dispatch, SetStateAction } from "react"

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
    setFiles: Dispatch<SetStateAction<File[]>>,
) => {
  const inputFiles = event.target.files
  if (!inputFiles) return
  if (inputFiles.length === 0) return
  setFiles((prev) => prev?.concat(Array.from(inputFiles)))
}
