/**
 * Common types used across the purchase form components
 */

export type PurchaseType = "material" | "project" | "direct_payment"
export type YesNoOption = "yes" | "no" | ""
export type AttachmentType =
  | "termsBooklet"
  | "specifications"
  | "samples"
  | "other"

export interface FileWithId extends File {
  id: string
}

export interface FileHandler {
  upload: (uploadedFiles: FileList | null) => void
  remove: (id: string) => void
}

export interface PlanData {
  id: string
  name: string
}

export interface ProgramData {
  id: string
  name: string
  planId: string
}

export interface ProjectData {
  id: string
  name: string
  programId: string
}
