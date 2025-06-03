import { formAction } from "./server/formAction"
import { getValue } from "./server/getValue"
import { environmentVariablesKeys } from "./server/keys"

const EnvironmentPage = async () => {
  return (
    <main className={mainStyle}>
      <h1>Environment</h1>
      <section>
        {environmentVariablesKeys.map(async (key) => {
          const value = await getValue(key)
          return (
            <div key={key} className={divStyle}>
              <h2 className={h2Style}>{key}: </h2>
              <span className={spanStyle}>{value}</span>
            </div>
          )
        })}
      </section>
      <section>
        <form action={formAction}>
          {environmentVariablesKeys.map((key) => {
            return (
              <input
                key={key}
                name={key}
                type="text"
                className={inputStyle}
                placeholder={key}
              />
            )
          })}
          <button className={buttonStyle}>Save</button>
        </form>
      </section>
    </main>
  )
}

export default EnvironmentPage
const mainStyle = "min-h-screen bg-black text-white p-2 space-y-4"
const spanStyle = "text-red-500 bg-white/20 p-1 rounded-lg"
const divStyle = "flex items-center gap-2"
const h2Style = "text-lg"
const buttonStyle = "border border-white rounded-lg text-white px-4 py-2 mt-2"
const inputStyle =
  "bg-black text-white px-1 py-2 border border-white block w-1/2 rounded-lg"
