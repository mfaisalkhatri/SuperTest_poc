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
import orders from "../testdata/orders.json" with { type: "json" };

describe("Post API tests using supertest", () => {
  const baseurl = "http://localhost:3004";
  it("should create new order using JSON file payload", async () => {
    let response = await request(baseurl).post("/addOrder").send(orders);

    expect(response.statusCode).to.be.equal(201);
    expect(response.body.message).to.be.equal("Orders added successfully!");
    expect(response.body.orders[0].id).not.to.be.null;
    expect(response.body.orders.length).to.be.equal(4);
    expect(response.body.orders[1].product_name).to.be.equal("iPad");
    expect(response.body.orders[1].product_amount).to.be.equal(699);
    expect(response.body.orders[1].qty).to.be.equal(1);
    expect(response.body.orders[1].tax_amt).to.be.equal(7.99);
    expect(response.body.orders[1].total_amt).to.be.equal(706.99);
  });

  it("should create new order using static data", async () => {
    await request(baseurl)
      .post("/addOrder")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send([
        {
          user_id: "1",
          product_id: "1",
          product_name: "iPhone",
          product_amount: 500,
          qty: 1,
          tax_amt: 5.99,
          total_amt: 505.99,
        },
        {
          user_id: "1",
          product_id: "2",
          product_name: "iPad",
          product_amount: 699,
          qty: 1,
          tax_amt: 7.99,
          total_amt: 706.99,
        },
      ])
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect((res) => {
        expect(res.body.message).to.be.equal("Orders added successfully!");
        expect(res.body.orders).to.have.length(6);

        expect(res.body.orders[4]).to.include({
          product_name: "iPhone",
        });

        expect(res.body.orders[5]).to.include({
          total_amt: 706.99,
        });
      });
  });
});
