import { Route } from "next"

// Helper to get a nice link for a row
export const getRowLink = (link?: string, rowId?: string): Route | "#" => {
  if (!link || !rowId) return "#"
  return (link.replace(/:\w+$/, "") + `/${rowId.replace("#", "")}`) as Route
}

// Check if field is currency related
export const isCurrencyField = (key: string): boolean => {
  return [
    "totalWithoutTax",
    "totalWithTax",
    "unitPrice",
    "completedCost",
    "remainingCost",
    "unitPriceWithTax",
    "subtotal",
    "subtotalWithTax",
  ].includes(key)
}
