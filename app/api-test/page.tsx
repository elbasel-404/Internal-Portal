import { getFetchHeaders } from "../server/getFetchHeaders"
import { Animate } from "@components"
import { Headers } from "./components/Headers"
import { RequestBody } from "./components/RequestBody"
import { getStoredEmployeeId } from "@auth"
import { Enviroment } from "./components/Enviroment"
import { Form } from "./components/Form"
import { fetchData } from "./server/fetchData"
import { UrlSelect } from "./components/UrlSelect"

const ApiPage = async () => {
  const { headers } = await getFetchHeaders()
  const headersList = Object.entries(headers).map(([key, value]) => {
    return { key, value }
  })

  const employeeId = await getStoredEmployeeId()
  if (!employeeId)
    throw new Error(
      "Employee id not found, make sure you have it in cookies store",
    )
  const employeeIdRequestObject = {
    key: "employee_id",
    value: employeeId,
  }

  const apiRootUrl = process.env.API_ROOT_URL as string

  return (
    <main className="min-h-screen px-4 py-8 text-white bg-black">
      <Form action={fetchData}>
        <UrlSelect />
        <Animate className="md:gap-2 md:flex ">
          <Headers headersList={headersList} />
          <RequestBody body={[employeeIdRequestObject]} />
        </Animate>
        <Animate>
          <Enviroment envVars={[{ key: "apiRootUrl", value: apiRootUrl }]} />
        </Animate>
      </Form>
    </main>
  )
}

export default ApiPage
