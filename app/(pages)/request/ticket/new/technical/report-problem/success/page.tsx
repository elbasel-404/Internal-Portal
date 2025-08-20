interface ReportTechnicalProblemPageProps {
  searchParams: Promise<{
    category?: string
    subcategory?: string
    u_subcategory_2?: string
    subcategory3?: string
    number?: string
    sys_id?: string
    caller?: string
    email?: string
    state?: string
    priority?: string
    assignmentGroup?: string
    assignedTo?: string
    short_description?: string
    description?: string
    opened_at?: string
  }>
}

const ReportTechnicalProblemPage = async ({ searchParams }: ReportTechnicalProblemPageProps) => {
  const params = await searchParams

  const tableData = [
    { field: "Ticket Number", value: params.number },
    { field: "System ID", value: params.sys_id },
    { field: "Caller", value: params.caller },
    { field: "Email", value: params.email },
    { field: "Category", value: params.category },
    { field: "Subcategory", value: params.subcategory },
    { field: "Subcategory 2", value: params.u_subcategory_2 },
    { field: "Subcategory 3", value: params.subcategory3 },
    { field: "State", value: params.state },
    { field: "Priority", value: params.priority },
    { field: "Assignment Group", value: params.assignmentGroup },
    { field: "Assigned To", value: params.assignedTo },
    { field: "Short Description", value: params.short_description },
    { field: "Description", value: params.description },
    { field: "Opened At", value: params.opened_at },
  ]

  return (
    <div className="p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">!Success</h1>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 text-center">
                Value
              </th>
              <th className="px-6 py-4 font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 text-center">
                Field
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr
                key={row.field}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}
              >
                <td className="px-6 py-4 text-gray-900 text-center">
                  {row.value ?? <span className="text-gray-400 italic">Not provided</span>}
                </td>
                <td className="px-6 py-4 text-gray-700 w-1/3 text-center">
                  {row.field}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="text-xs text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>
    </div>
  )
}

export default ReportTechnicalProblemPage
