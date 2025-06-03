import { paths } from "@lib"
import Link from "next/link"

const NotFound = () => {
  return (
    <>
      <h2 className="text-red-500 text-3xl">Invalid Vacation ID</h2>
      <Link className="text-2xl text-blue-400 underline" href={paths.vacations}>
        Go Back
      </Link>
    </>
  )
}

export default NotFound
