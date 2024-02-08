// import { test, expect } from "@fixtures/fixtures";
// import { createHeaders, createInvalidHeaders } from "@helpers/createHeaders";
// import { getSchemaFromSwagger } from "@helpers/swaggerParser";
// import { validateJsonSchema } from "@helpers/validateJsonSchema";
// import { addWarning } from "@helpers/warnings";
// // import { validateAgainstSchema } from "@helpers/validateAgainstSchema";

// const endpoint = "/booking";

// test.describe.skip("booking/ GET requests @booking", async () => {
//   let headers;
//   let invalidHeader;

//   test.beforeAll(async () => {
//     headers = await createHeaders();
//     invalidHeader = await createInvalidHeaders();
//   });

// test("GET booking summary with specific room id @happy", async ({ request }) => {
//   const response = await request.get("booking/summary?roomid=1");

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.bookings.length).toBeGreaterThanOrEqual(1);

//   expect(body.bookings[0].bookingDates.checkin).toBeValidDate();
//   expect(body.bookings[0].bookingDates.checkout).toBeValidDate();

//   // Для создания JSON-схемы, мы в качестве последнего параметра, передаем 'true'
//   // при вызове validateJsonSchema

//   // await validateJsonSchema("GET_booking_summary", "booking", body, true);
//   await validateJsonSchema("GET_booking_summary", "booking", body);
//   // await validateAgainstSchema(body.bookings[0].bookingDates, "BookingDates", "booking");

//   await addWarning("This test should be refactored: '" + test.info().title + "' to use custom assertions");
// });
