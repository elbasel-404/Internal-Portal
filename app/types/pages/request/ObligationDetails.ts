export type ObligationDetails = {
  details: string
  family?: {
    answer: boolean
    description: string
  }
  relationship?: {
    answer: boolean
    description: string
  }
  work?: {
    answer: boolean
    description: string
  }
}
