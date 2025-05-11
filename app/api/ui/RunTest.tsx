// "use client";

// import type { Endpoint, Operation } from "@api/getFormAction";
// import { getUseStateAction } from "@api/getUseStateAction";
// import type { PostResponse } from "@api/post";
// // import { Animate } from "@components";
// import { allEndpoints } from "@monshaat/portal-api";
// // import { cn } from "@utils";

// import {
//   FoldVertical as FoldVerticalIcon,
//   LoaderCircle as LoaderCircleIcon,
//   Play as PlayIcon,
//   Square as SquareIcon,
//   UnfoldVertical as UnfoldVerticalIcon,
// } from "lucide-react";

// import {
//   type Dispatch,
//   type SetStateAction,
//   useActionState,
//   useEffect,
//   useState,
// } from "react";
// import { darkStyles, JsonView } from "react-json-view-lite";
// import { z } from "zod";
// import "react-json-view-lite/dist/index.css";
// import { DataTable } from "./DataTable";
// import { cn } from "@utils";

// const OPERATION: Operation = "list";

// const inputPlaceholder = "1711";
// const inputName = "employee_id";
// const inputLabel = inputName;
// const inputDefaultValue = inputPlaceholder;
// const inputTooltip = `${inputName}: ${typeof inputDefaultValue}`;
// // const inputType = typeof inputDefaultValue === "number" ? "number" : "text";

// const selectClassName =
//   "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

// export const RunTest = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   let responseSchemaa: typeof listResponseSchema | typeof detailsResponseSchema;
//   const [endpointName, setEndpointName] = useState<Endpoint | null>(null);
//   // const [inputValue, setInputValue] = useState(inputDefaultValue);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const [operation, setOperation] = useState<Operation>("list");
//   const useStateAction = getUseStateAction(
//     endpointName ?? "vacations",
//     OPERATION
//   );
//   const { details, list } = allEndpoints[endpointName ?? "vacations"];
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { responseSchema: detailsResponseSchema } = details;
//   const { responseSchema: listResponseSchema } = list;

//   switch (OPERATION) {
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

//   const transformData = async () => {
//     console.log({ state });
//     if (state.data) {
//       const parsedData = state.data.map(
//         ({
//           // holiday_status_id,
//           // degree_id,
//           id,
//           create_date,
//           display_name,
//           // date_fr,
//           // date_to,
//           employee_id,
//           write_date,
//           state,
//         }) => {
//           return {
//             id,
//             employee_id,
//             create_date,
//             display_name,
//             date_from: new Date(),
//             date_to: new Date(),
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
//     transformData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state]);

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log({ e });
//     setEndpointName(e.target.value as Endpoint);
//   };

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setInputValue(e.target.value);
//   // };

//   return (
//     <form action={formAction} className="border border-white rounded-3xl">
//       <div className="p-4">
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <button className="block p-2 transition-all border border-white rounded-full hover:text-green-500 hover:scale-105">
//               {actionPending && (
//                 <LoaderCircleIcon className="text-green-400 animate-spin" />
//               )}
//               {!actionPending && <PlayIcon />}
//             </button>
//             <select
//               value={endpointName ?? ""}
//               onChange={handleSelectChange}
//               className={cn(
//                 "text-2xl border border-blue-400 rounded-xl font-bold capitalize bg-black",
//                 selectClassName
//               )}
//             >
//               {Object.entries(allEndpoints).map(([key]) => (
//                 <option className="bg-black" key={key} value={key}>
//                   {key}
//                 </option>
//               ))}
//             </select>
//             <button className="relative text-red-400 group">
//               <span>{actionPending && <SquareIcon />}</span>
//               <span className="duration-500 absolute gap-2 text-xs font-mono flex items-center transition-all group-hover:opacity-100 justify-center p-2 border border-white min-w-max min-h-full bg-black/70 opacity-0 inset-0 transform -translate-y-[100%] rounded-md">
//                 Cancel
//               </span>
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <TextInput
//               defaultValue={inputDefaultValue}
//               label={inputLabel}
//               name={inputName}
//               placeholder={inputPlaceholder}
//               tooltip={inputTooltip}
//             />
//             <CollapseToggle setCollapsed={setCollapsed} collapsed={collapsed} />
//           </div>
//         </div>
//       </div>
//       {!collapsed && (
//         <div className={`p-4 border-t border-white rounded-xl`}>
//           {parsedData && !actionPending && (
//             <div className="w-full">
//               <DataTable data={parsedData} />
//               <div className="my-4 border border-white bg-green-400/80" />
//             </div>
//           )}
//           <div dir="ltr" className="flex flex-col justify-center">
//             <span>Raw Data: </span>
//             <JsonView
//               data={
//                 (rawData as object[]) ||
//                 state.error ||
//                 state.validationError ||
//                 state.metaData
//               }
//               shouldExpandNode={(level: number) => level < 0}
//               style={{ ...darkStyles, container: "bg-black text-white" }}
//             />
//           </div>
//         </div>
//       )}
//     </form>
//   );
// };

// // ! CollapseTrigger
// // ! ====================================================================================
// interface CollapseToggleIconProps {
//   collapsed: boolean;
//   setCollapsed: Dispatch<SetStateAction<boolean>>;
// }
// const CollapseToggle = ({
//   collapsed,
//   setCollapsed,
// }: CollapseToggleIconProps) => {
//   return (
//     <button
//       onClick={() => setCollapsed((prev) => !prev)}
//       type="button"
//       className="ml-4"
//     >
//       {!collapsed && <FoldVerticalIcon />}
//       {collapsed && <UnfoldVerticalIcon />}
//     </button>
//   );
// };

// // ! TextInput
// // ! ====================================================================================
// interface TextInputProps {
//   name: string;
//   placeholder: string;
//   label: string;
//   defaultValue: string;
//   tooltip: string;
// }

// const TextInput = ({
//   name,
//   placeholder,
//   label,
//   defaultValue,
//   tooltip,
// }: TextInputProps) => {
//   return (
//     <>
//       <label
//         className="relative font-mono text-2xl text-blue-400 group"
//         htmlFor={name}
//       >
//         <span>{label + ":"}</span>
//         <span className="duration-500 absolute gap-2 text-sm font-mono flex items-center transition-all group-hover:opacity-100 justify-center p-2 border border-white min-w-max min-h-full bg-black/70 opacity-0 inset-0 transform -translate-y-[100%] rounded-md">
//           {tooltip.split(": ")[0] + ":"}
//           <span className="text-green-400">{tooltip.split(": ")[1]}</span>
//         </span>
//       </label>
//       <input
//         defaultValue={defaultValue}
//         id={name}
//         name={name}
//         placeholder={placeholder}
//         type="text"
//         className="bg-black block max-w-[30%] border border-white text-white rounded-md p-2 text-xl"
//       />
//     </>
//   );
// };
