import {
  getChangeContractAgreementRequests,
  getChangeContractPurchaseRequests,
} from "@server"
import { ChangeContractTable } from "./components"

const ChangeContractListPage = async () => {
  const changeContractPurchaseData = await getChangeContractPurchaseRequests()
  const changeContractAgreementeData =
    await getChangeContractAgreementRequests()
  return (
    <div className="space-y-4 mb-12">
      <ChangeContractTable
        purchaseData={changeContractPurchaseData}
        agreementData={changeContractAgreementeData}
      />
    </div>
  )
}

export default ChangeContractListPage
