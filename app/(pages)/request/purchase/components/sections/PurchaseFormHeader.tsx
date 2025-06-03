import { FormHeader } from "@components/form"
import { paths } from "@lib"

export const PurchaseFormHeader = () => {
  return <FormHeader label="نموذج طلب شراء" path={paths.purchase.href} />
}
