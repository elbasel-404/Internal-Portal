"use client"

import { AttachmentType, FileWithId, PurchaseType, YesNoOption } from "@types"
import { atom } from "jotai"

// Basic information atoms
export const purchaseTypeAtom = atom<PurchaseType>("material")
export const addressRequestAtom = atom<string>("")
export const descriptionAtom = atom<string>("")
export const requestOutputsAtom = atom<string>("")

// Attachments atoms
export const selectedAttachmentTypesAtom = atom<AttachmentType[]>([])
export const filesAtom = atom<FileWithId[]>([])

// Project details atoms
export const planTypeAtom = atom<string>("")
export const programNameAtom = atom<string>("")
export const projectNameAtom = atom<string>("")
export const costsAtom = atom<number>(0)
export const batchAmount = atom<number>(0)

// Requirements atoms
export const institutionalDiscriminationAtom = atom<YesNoOption>("")
export const instFilesAtom = atom<FileWithId[]>([])

export const cyberSecurityAtom = atom<YesNoOption>("")
export const securityFilesAtom = atom<FileWithId[]>([])

export const dataGovernanceAtom = atom<YesNoOption>("")
export const finalSettlementValueAtom = atom<YesNoOption>("")
export const dataFilesAtom = atom<FileWithId[]>([])

export const invoiceAtom = atom<FileWithId[]>([])
export const extractAtom = atom<FileWithId[]>([])
export const wageProtectionAtom = atom<FileWithId[]>([])
export const regularCertificatesAtom = atom<FileWithId[]>([])
export const finalSettlementAtom = atom<FileWithId[]>([])

export const completionRequestAtom = atom<boolean>(false)
