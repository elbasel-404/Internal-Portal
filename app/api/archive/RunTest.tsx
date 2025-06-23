// "use client";

// import { getUseStateAction } from "@api/getUseStateAction";
// import { PostResponse } from "@api/post";
// import { Animate } from "@components";
// import { allEndpoints } from "@monshaat/portal-api";
// import { cn } from "@utils";
// import {
//   FoldVertical,
//   LoaderCircle,
//   Play as PlayIcon,
//   Square,
//   UnfoldVertical,
// } from "lucide-react";
// import { useActionState, useEffect, useState } from "react";
// import { darkStyles, JsonView } from "react-json-view-lite";
// import "react-json-view-lite/dist/index.css";
// import { z } from "zod";
// import { Skeleton } from "../../ui/skeleton";
// import { Endpoint, type Operation } from "@api/getFormAction";
// const operation: Operation = "list";

// export const RunTest = () => {
//   const inputPlaceholder = "1711";
//   const inputName = "employee_id";
//   const inputLabel = inputName;
//   const inputDefaultValue = inputPlaceholder;
//   const inputTooltip = `${inputName}: ${typeof inputDefaultValue}`;
//   const inputType = typeof inputDefaultValue === "number" ? "number" : "text";

//   const [collapsed, setCollapsed] = useState(false);
//   let responseSchemaa: typeof listResponseSchema | typeof detailsResponseSchema;
//   const [endpointName, setEndpointName] = useState<Endpoint | null>(null);
//   const [inputValue, setInputValue] = useState(inputDefaultValue);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const [operation, setOperation] = useState<Operation>("list");
//   const useStateAction = getUseStateAction(
//     endpointName ?? "vacations",
//     operation
//   );
//   const { details, list } = allEndpoints[endpointName ?? "vacations"];
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { responseSchema: detailsResponseSchema } = details;
//   const { responseSchema: listResponseSchema } = list;

//   switch (operation) {
//     case "list":
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       responseSchemaa = listResponseSchema;
//       break;
//     // case "details":
//     //   responseSchemaa = detailsResponseSchema;
//     //   break;
//     default:
//       break;
//   }

//   type InitialState = {
//     data: null | z.infer<typeof responseSchemaa>;
//     metaData: PostResponse | null;
//     error: null | string;
//     endpoint: string;
//     operation: string;
//     validationError: null | string;
//   };
//   const initState: InitialState = {
//     data: null,
//     metaData: null,
//     operation: "list",
//     error: null,
//     endpoint: "",
//     validationError: null,
//   };

//   const [state, formAction, actionPending] = useActionState(
//     useStateAction,
//     initState
//   );

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [parsedData, setParsedData] = useState<any[] | null>(null);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rawData, setRawData] = useState<any[] | null>(null);

//   const parseData = async () => {
//     if (state.data) {
//       const parsedData = state.data.map(
//         ({
//           id,
//           create_date,
//           display_name,
//           date_from,
//           date_to,
//           write_date,
//           state,
//         }) => {
//           return {
//             id,
//             create_date,
//             display_name,
//             date_from,
//             date_to,
//             write_date,
//             state,
//           };
//         }
//       );
//       setParsedData(parsedData);
//       setRawData(state.data);
//     }
//   };
//   useEffect(() => {
//     parseData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state]);

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setEndpointName(e.target.value as Endpoint);
//   };

//   // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   const formData = new FormData(e.currentTarget);
//   //   const employee_id = formData.get(inputName) as string;
//   //   const response = await formAction(formData);
//   // };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <form
//       // onSubmit={handleFormSubmit}
//       action={formAction}
//       className="border border-white rounded-3xl"
//     >
//       <div className="p-4">
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <button className="block p-2 transition-all border border-white rounded-full hover:text-green-500 hover:scale-105">
//               {actionPending && (
//                 <LoaderCircle className="text-green-400 animate-spin" />
//               )}
//               {!actionPending && <PlayIcon />}
//             </button>
//             <select
//               value={endpointName ?? ""}
//               onChange={handleSelectChange}
//               className="text-2xl font-bold capitalize bg-black"
//             >
//               {Object.entries(allEndpoints).map(([key]) => (
//                 <option key={key} value={key}>
//                   {key}
//                 </option>
//               ))}
//             </select>
//             <button className="relative text-red-400 group">
//               <span>{actionPending && <Square />}</span>
//               <span className="duration-500 absolute gap-2 text-xs font-mono flex items-center transition-all group-hover:opacity-100 justify-center p-2 border border-white min-w-max min-h-full bg-black/70 opacity-0 inset-0 transform -translate-y-[100%] rounded-md">
//                 Cancel
//               </span>
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <label
//               className="relative font-mono text-2xl text-blue-400 group"
//               htmlFor={inputName}
//             >
//               <span>{inputLabel + ":"}</span>
//               <span className="duration-500 absolute gap-2 text-sm font-mono flex items-center transition-all group-hover:opacity-100 justify-center p-2 border border-white min-w-max min-h-full bg-black/70 opacity-0 inset-0 transform -translate-y-[100%] rounded-md">
//                 {inputTooltip.split(": ")[0] + ":"}
//                 <span className="text-green-400">
//                   {inputTooltip.split(": ")[1]}
//                 </span>
//               </span>
//             </label>
//             <input
//               onChange={handleInputChange}
//               value={inputValue}
//               id={inputName}
//               name={inputName}
//               placeholder={inputPlaceholder}
//               type={inputType}
//               className="bg-black block max-w-[30%] border border-white text-white rounded-md p-2 text-xl"
//             />
//             <button
//               onClick={() => setCollapsed((prev) => !prev)}
//               type="button"
//               className="ml-4"
//             >
//               <Animate>
//                 {parsedData && (
//                   <Animate>
//                     {!collapsed && <FoldVertical />}
//                     {collapsed && <UnfoldVertical />}
//                   </Animate>
//                 )}
//               </Animate>
//             </button>
//           </div>
//         </div>
//       </div>
//       <Animate>
//         {!collapsed && (
//           <div className={`p-4 border-t border-white rounded-xl`}>
//             <Animate>
//               {actionPending && (
//                 <Skeleton className="w-full  h-[240px] bg-white/20 text-black space-y-4 p-4">
//                   {Array.from({ length: 12 }).map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-full h-[2px] text-black bg-white/70"
//                     />
//                   ))}
//                 </Skeleton>
//               )}
//             </Animate>
//             {parsedData && !actionPending && (
//               <div className="w-full">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-slate-800">
//                       {Object.keys(parsedData[0]).map((key) => (
//                         <th
//                           className="p-2 text-center border border-white"
//                           key={key}
//                         >
//                           {key}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {parsedData.map((item, i) => (
//                       <tr
//                         key={i}
//                         className={cn("p-2", i % 2 === 0 ? "bg-white/10" : "")}
//                       >
//                         {Object.values(item).map((value, i) => (
//                           <td className="p-2 text-center" key={i}>
//                             {value as React.ReactNode}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="my-4 border border-white bg-green-400/80" />
//               </div>
//             )}
//             {/* {parsedData && !actionPending && rawData && ( */}
//             <div dir="ltr" className="flex flex-col justify-center">
//               <span>Raw Data: </span>
//               <JsonView
//                 data={
//                   (rawData as object[]) ||
//                   state.error ||
//                   state.validationError ||
//                   state.metaData
//                 }
//                 shouldExpandNode={(level: number) => level < 0}
//                 style={{ ...darkStyles, container: "bg-black text-white" }}
//               />
//             </div>
//             {/* )} */}
//           </div>
//         )}
//       </Animate>
//     </form>
//   );
// };
