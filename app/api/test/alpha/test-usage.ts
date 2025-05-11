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
//     console.error("Error:", result.error || result.validationError);
//     return;
//   }

//   if (result.data && Array.isArray(result.data)) {
//     const helpers = createHelpers();

//     result.data.forEach((item) => {
//       if (helpers.hasState(item)) {
//         console.log(`Vacation state: ${item.state}`);
//       }

//       if (helpers.hasHolidayStatus(item)) {
//         const [id, name] = item.holiday_status_id;
//         console.log(`Holiday status: ${name} (ID: ${id})`);
//       }
//     });

//     console.log(`Retrieved ${result.data.length} vacations`);
//   }
// }

// // Call the example function
// // fetchAndProcessVacations().catch(console.error);
