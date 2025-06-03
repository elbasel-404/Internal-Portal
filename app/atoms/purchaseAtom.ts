"use client"

import { AttachmentType, FileWithId, PurchaseType, YesNoOption } from "@types"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// Basic information atoms
export const purchaseTypeAtom = atomWithStorage<PurchaseType>(
  "purchaseType",
  "operational",
)
export const addressRequestAtom = atomWithStorage<string>("addressRequest", "")
export const descriptionAtom = atomWithStorage<string>("description", "")
export const requestOutputsAtom = atomWithStorage<string>("requestOutputs", "")

// Attachments atoms
export const selectedAttachmentTypesAtom = atomWithStorage<AttachmentType[]>(
  "selectedAttachmentTypes",
  [],
)
export const filesAtom = atomWithStorage<FileWithId[]>("files", [])

// Project details atoms
export const planTypeAtom = atomWithStorage<string>("planType", "")
export const programNameAtom = atomWithStorage<string>("programName", "")
export const projectNameAtom = atomWithStorage<string>("projectName", "")
export const costsAtom = atom<number>(0)
export const batchAmount = atomWithStorage<number>("batchAmount", 0)

// Requirements atoms
export const institutionalDiscriminationAtom = atomWithStorage<YesNoOption>(
  "institutionalDiscrimination",
  "",
)
export const instFilesAtom = atomWithStorage<FileWithId[]>("instFiles", [])

export const cyberSecurityAtom = atomWithStorage<YesNoOption>(
  "cyberSecurity",
  "",
)
export const securityFilesAtom = atomWithStorage<FileWithId[]>(
  "securityFiles",
  [],
)

export const dataGovernanceAtom = atomWithStorage<YesNoOption>(
  "dataGovernance",
  "",
)
export const finalSettlementValueAtom = atomWithStorage<YesNoOption>(
  "finalSettlementValue",
  "",
)
export const dataFilesAtom = atomWithStorage<FileWithId[]>("dataFiles", [])

export const invoiceAtom = atomWithStorage<FileWithId[]>("invoice", [])
export const extractAtom = atomWithStorage<FileWithId[]>("extract", [])
export const wageProtectionAtom = atomWithStorage<FileWithId[]>(
  "wageProtection",
  [],
)
export const regularCertificatesAtom = atomWithStorage<FileWithId[]>(
  "regularCertificates",
  [],
)
export const finalSettlementAtom = atomWithStorage<FileWithId[]>(
  "finalSettlement",
  [],
)

export const completionRequestAtom = atom<boolean>(false)
