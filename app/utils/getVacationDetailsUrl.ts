import { paths } from "@lib"

export const getVacationDetailsUrl = (id: string) =>
  `${paths.vacationDetails.href}/${id}`
