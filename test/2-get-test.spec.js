/*
   Copyright 2022 Mohammad Faisal Khatri

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import request from "supertest";
import { expect } from "chai";
import "dotenv/config";
import booking from "../testdata/booking.json" with { type: "json" };

describe("Get API Tests using SuperTest", () => {
  const ecommerce_baseurl = "http://localhost:3004";
  const restfulbooker_baseurl = "http://localhost:3001";
  const httpbin_baseurl = "http://localhost:80";
  let bookingid;

  it(`creates booking for Michael Denver`, async () => {
    const response = await request(restfulbooker_baseurl)
      .post("/booking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(booking)
      .expect(200);

    expect(response.body.bookingid).to.exist;
    expect(response.body.bookingid).to.not.be.null;
    bookingid = response.body.bookingid;
  });

  it("should fetch the records from Get API using a query param", async () => {
    let response = await request(ecommerce_baseurl)
      .get("/getOrder")
      .query({ product_id: 3 });

    expect(response.statusCode).to.be.equal(200);
    expect(response.body.message).to.be.equal("Order found!!");
    expect(response.body.orders.length).to.be.above(0);
    expect(response.body.orders[0].user_id).to.equal("3");
    expect(response.body.orders[0].product_id).to.equal("3");
    expect(response.body.orders[0].product_name).to.contain(
      "Samsung S24 Ultra",
    );
    expect(response.body.orders[0].product_amount).to.be.greaterThan(4000);
    expect(response.body.orders[0].qty).to.be.greaterThan(0);
    expect(response.body.orders[0].tax_amt).to.be.lessThan(6.0);
    expect(response.body.orders[0].total_amt).to.be.greaterThanOrEqual(4305.98);
  });

  it("should fetch the records from GET API using path parameter", async () => {
    let response = await request(restfulbooker_baseurl)
      .get(`/booking/${bookingid}`)
      .set("Accept", "application/json");

    expect(response.statusCode).to.be.equal(200);

    expect(response.body.firstname).to.equal(booking.firstname);
    expect(response.body.lastname).to.equal(booking.lastname);
    expect(response.body.totalprice).to.equal(booking.totalprice);
    expect(response.body.depositpaid).to.equal(booking.depositpaid);
    expect(response.body.bookingdates.checkin).to.equal(
      booking.bookingdates.checkin,
    );
    expect(response.body.bookingdates.checkout).to.equal(
      booking.bookingdates.checkout,
    );
    expect(response.body.additionalneeds).to.equal(booking.additionalneeds);
  });

  it("should successfully authenticate with valid credentials", async () => {
    const user = process.env.USER;
    const password = process.env.PASSWORD;

    let response = await request(httpbin_baseurl)
      .get("/basic-auth/user/passwd")
      .set("Accept", "application/json")
      .auth(user, password)
      .expect(200);

    expect(response.body.authenticated).to.be.true;
    expect(response.body.user).to.equal("user");
  });

  it("should return 401 with invalid credentials", async () => {
    const user = "faisal";
    const password = "password123";

    await request(httpbin_baseurl)
      .get("/basic-auth/user/passwd")
      .set("Accept", "application/json")
      .auth(user, password)
      .expect(401);
  });

  it("should successfully authenticate user using bearer authentication", async () => {
    const auth_token = process.env.AUTH_TOKEN;
    let response = await request(httpbin_baseurl)
      .get("/bearer")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + auth_token)
      .expect(200);

    expect(response.body.authenticated).to.be.true;
    expect(response.body.token).to.equal(auth_token);
  });

  it("should return all orders", async () => {
    const response = await request(ecommerce_baseurl).get("/getAllOrders");
	expect (response.statusCode).to.be.equal(200);
  });
});
