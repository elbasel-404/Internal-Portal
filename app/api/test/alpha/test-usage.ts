// import { getApiCallback } from "./test-files/test copy 7";

// // Example usage
// const { callback, createHelpers } = getApiCallback({
//   endpoint: "vacations",
//   operation: "list",
// });

// // Example function to demonstrate usage
// export async function fetchAndProcessVacations() {
//   const requestBody = { employee_id: 1 };

//   const result = await callback(requestBody);

//   if (result.error || result.validationError) {
//     return;
//   }

//   if (result.data && Array.isArray(result.data)) {
//     const helpers = createHelpers();

//     result.data.forEach((item) => {
//       if (helpers.hasState(item)) {
//       }

//       if (helpers.hasHolidayStatus(item)) {
//         const [id, name] = item.holiday_status_id;
//       }
//     });

//   }
// }

// // Call the example function
