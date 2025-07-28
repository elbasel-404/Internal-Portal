export type ObligationFormProps = {
  family:
    | {
        answer: boolean
        description: string
      }
    | null
    | undefined
  relationship:
    | {
        answer: boolean
        description: string
      }
    | null
    | undefined
  work:
    | {
        answer: boolean
        description: string
      }
    | null
    | undefined
}
