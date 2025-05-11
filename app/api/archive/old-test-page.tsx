// "use client";

// import { JsonView, darkStyles } from "react-json-view-lite";
// import "react-json-view-lite/dist/index.css";
// import { useEffect, useState } from "react";
// import { getFormAction } from "@api/getFormAction";

// export const dynamic = "force-dynamic";

// const ApiTestPage = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [data, setData] = useState<any>(null);

//   const [operation, setOperation] = useState<"list" | "details" | "create">(
//     "list"
//   );
//   const [endpointName, setEndpointName] = useState<"vacations" | "remoteWork">(
//     "vacations"
//   );

//   const [inputName, setInputName] = useState<"employee_id" | "id">(
//     "employee_id"
//   );

//   const [inputPlaceholder, setInputPlaceholder] =
//     useState<string>("employee_id (1711)");

//   const formAction = async (formData: FormData) => {
//     const action = getFormAction(endpointName, operation);
//     const response = await action(formData);
//     setData(response);
//     console.log({ response });
//   };

//   useEffect(() => {
//     switch (operation) {
//       case "list":
//         setInputName("employee_id");
//         setInputPlaceholder("employee_id (1711)");
//         break;
//       case "details":
//         setInputName("id");
//         setInputPlaceholder("id (1)");
//         break;
//       case "create":
//         setInputName("employee_id");
//         setInputPlaceholder("employee_id (1711)");
//         break;
//       default:
//         break;
//     }
//   }, [operation]);

//   return (
//     <main className="space-y-4">
//       <div>
//         <form action={formAction} className="flex flex-col gap-2">
//           <div className="flex items-center gap-4">
//             <label htmlFor="endpointName">Endpoint: </label>
//             <select
//               className="flex-1 p-2 text-white bg-black border border-white"
//               value={endpointName}
//               onChange={(e) =>
//                 setEndpointName(e.target.value as "vacations" | "remoteWork")
//               }
//             >
//               <option value="vacations">vacations</option>
//               <option value="remoteWork">remoteWork</option>
//             </select>
//             <label htmlFor="operatoin">Operation: </label>
//             <select
//               className="flex-1 p-2 text-white bg-black border border-white"
//               value={operation}
//               onChange={(e) =>
//                 setOperation(e.target.value as "list" | "details" | "create")
//               }
//             >
//               <option value="list">list</option>
//               <option value="details">details</option>
//               <option value="create">create</option>
//             </select>
//           </div>
//           <input
//             required
//             placeholder={inputPlaceholder}
//             className="p-2 text-white bg-black border border-white"
//             type="number"
//             name={inputName}
//           />
//           <button className="p-2 text-green-400 bg-black border border-white">
//             Fetch Data
//           </button>
//         </form>
//       </div>
//       <div>
//         {!data && "NO DATA"}
//         {data && (
//           <JsonView
//             data={data as object}
//             shouldExpandNode={(level: number) => level < 2}
//             style={{ ...darkStyles, container: "bg-black text-white" }}
//           />
//         )}
//       </div>
//     </main>
//   );
// };

// export default ApiTestPage;
