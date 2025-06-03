import { FileWithId } from "@types"

/**
 * Helper functions for file operations
 */
export const createFileHandler = (
  getAtom: () => FileWithId[],
  setAtom: (files: FileWithId[]) => void,
) => {
  return {
    upload: (uploadedFiles: FileList | null) => {
      if (!uploadedFiles) return

      const newFiles = Array.from(uploadedFiles).map(
        (file) =>
          ({
            id: crypto.randomUUID(),
            name: file.name,
          }) as FileWithId,
      )

      setAtom([...getAtom(), ...newFiles])
    },
    remove: (id: string) => {
      const updatedFiles = getAtom().filter((file) => file.id !== id)
      setAtom(updatedFiles)
    },
  }
}
