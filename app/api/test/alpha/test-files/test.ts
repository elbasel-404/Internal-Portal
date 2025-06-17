// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { z } from "zod";

// /**
//  * Generic type guard to check if an object has a specific property with a non-null value
//  * @param obj The object to check
//  * @param prop The property name to check for
//  * @returns Type predicate indicating whether the property exists and has a non-null value
//  */
// function hasProperty<T, K extends string, V>(
//   obj: T,
//   prop: K
// ): obj is T & { [P in K]: NonNullable<V> } {
//   return (
//     obj !== null &&
//     obj !== undefined &&
//     typeof obj === "object" &&
//     prop in obj &&
//     (obj as any)[prop] !== undefined &&
//     (obj as any)[prop] !== null &&
//     (obj as any)[prop] !== false
//   );
// }

// /**
//  * Specialized type guard for checking if an object has an ID-name tuple property
//  */
// function hasIdNameTuple<T, K extends string>(
//   obj: T,
//   prop: K
// ): obj is T & { [P in K]: [number, string] } {
//   return hasProperty(obj, prop);
// }

// // Example usage:
// type VacationDetail = z.output<typeof VacationsDetailsSchema>[number];

// const vacation = validatedResponseBody[0];

// // Check for any property
// if (hasProperty<VacationDetail, "state", string>(vacation, "state")) {
// }

// // Check for ID-name tuple
// if (hasIdNameTuple(vacation, "holiday_status_id")) {
//   const [id, name] = vacation.holiday_status_id; // TypeScript knows this is [number, string]
// }

// // Create helper functions for specific properties you use frequently
// function hasHolidayStatus(vacation: VacationDetail) {
//   return hasIdNameTuple(vacation, "holiday_status_id");
// }

// // Usage
// if (hasHolidayStatus(vacation)) {
//   const [id, name] = vacation.holiday_status_id;
// }
