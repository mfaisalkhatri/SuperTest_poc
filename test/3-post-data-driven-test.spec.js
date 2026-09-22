  import request from "supertest";
  import { expect } from "chai";
  import bookings from "../testdata/bookings.json" with { type: "json" };
  
describe("Data driven Post API tests using supertest", () => {
  bookings.forEach((booking) => {
    it(`creates booking for ${booking.firstname} ${booking.lastname}`, async () => {
      const response = await request("http://localhost:3001")
        .post("/booking")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(booking)
        .expect(200);

      expect(response.body.bookingid).to.exist;
      expect(response.body.bookingid).to.not.be.null;
      expect(response.body.booking.firstname).to.equal(booking.firstname);
      expect(response.body.booking.lastname).to.equal(booking.lastname);

    console.log(response.body);
    });
  });
});