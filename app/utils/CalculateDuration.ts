import { addDays, isFriday, isSaturday } from "date-fns"

export const calculateDurationExcludingWeekends = (start: Date, end: Date) => {
  let count = 0
  let currentDate = start

  while (currentDate <= end) {
    if (!isFriday(currentDate) && !isSaturday(currentDate)) {
      count++
    }
    currentDate = addDays(currentDate, 1)
  }

  return count
}
