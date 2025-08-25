"use client" // if in Next.js App Router

import { getPurchaseProductsByRequestId } from "@server"
import { useEffect, useState } from "react"
import { Modal } from "../Modal"
import { BatchProductsForm } from "./BatchProductsForm"

import type { PurchaseProduct } from "@types"

export const BatchProductsModal = () => {
  const [productsRequestById, setProductsRequestById] = useState<
    PurchaseProduct[] | null
  >(null)

  useEffect(() => {
    const id = localStorage.getItem("requestId")
    if (!id) return

    getPurchaseProductsByRequestId(id).then(setProductsRequestById)
  }, [])

  if (!productsRequestById) return null // or loader/spinner

  return (
    <Modal
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
      initialContentClassName="w-[35vw] h-[85vh] rounded-none p-0 app-scrollbar overflow-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-[3px] border-r-primary">
        <p className="text-xl font-bold text-foreground">المنتجات</p>
      </div>
      <BatchProductsForm productsDataRequest={productsRequestById} />
    </Modal>
  )
}
