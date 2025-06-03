"use client"

import { testAtom } from "../../atoms"
import { Button } from "@ui"
import { useAtom } from "jotai"

const JotaiTestPage = () => {
  const [counter, setCounter] = useAtom(testAtom)

  return (
    <div className="flex justify-center py-2 px-4 flex-col gap-4 items-center">
      <h1>Counter: {counter}</h1>
      <Button onClick={() => setCounter((prev) => prev - 1)}>Increment</Button>
      <Button onClick={() => setCounter((prev) => prev + 1)}>Decrement</Button>
    </div>
  )
}

export default JotaiTestPage
