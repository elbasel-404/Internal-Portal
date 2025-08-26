import { ProductsType } from './ProductsType'

type optionType = {
  name: string
  checked: boolean
}

export type ChangeContractDetails = {
  requestChangeId: string
  refuseReason: string
  purchaseOrderNumber: string
  awardAmount: string
  commpletionRate: string
  competitionName: string
  proposedChanges: string
  changeJustification: string
  applicantName: string
  changeType: optionType[]
  newItem: optionType[]
  periodExtensionOrReduction: optionType[]
  requestDate: string
  contractExpirationDate: string
  reductionAmount: string
  increaseAmount: string
  reductionPercentage: string
  increasePercentage: string
  productsBeforeChange: ProductsType[]
  productsAfterChange: ProductsType[]
  attachments: File[]
}
