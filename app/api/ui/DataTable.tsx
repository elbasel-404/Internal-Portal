import { cn } from "@utils"

interface DataTableProps {
  data: object[]
}
export const DataTable = ({ data }: DataTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-800">
          {Object.keys(data[0]).map((key) => (
            <th className="p-2 text-center border border-white" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className={cn("p-2", i % 2 === 0 ? "bg-white/10" : "")}>
            {Object.values(item).map((value, i) => (
              <td className="p-2 text-center" key={i}>
                {value as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
