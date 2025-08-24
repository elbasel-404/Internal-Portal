/**
 * Pauses the execution for a specified number of seconds.
 *
 * @param seconds The number of seconds to sleep.
 * @returns A Promise that resolves after the specified duration.
 */
export const sleep = async (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
