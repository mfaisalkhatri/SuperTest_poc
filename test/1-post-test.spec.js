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
import authCredentials from "../testdata/auth_credentials.json" with { type: "json" };
import fs from "node:fs";
import Path from "path";
import { dirname } from "path";
import {
  buildMultipleOrders,
  buildOrder,
  buildOrdersFrom,
} from "../utils/OrderFactory.js";

describe("Post API tests using supertest", () => {
  const baseurl = "http://localhost:3004";
  let token;

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

  it("should create new orders using static data", async () => {
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

  it("should create new orders using static data from a variable", async () => {
    const order_details = [
      {
        user_id: "5",
        product_id: "7",
        product_name: "Lux Beauty Soap",
        product_amount: 9,
        qty: 1,
        tax_amt: 1,
        total_amt: 10,
      },
      {
        user_id: "5",
        product_id: "9",
        product_name: "Loreal Shampoo",
        product_amount: 12,
        qty: 3,
        tax_amt: 4,
        total_amt: 40,
      },
    ];

    await request(baseurl).post("/addOrder").send(order_details).expect(201);
  });

  it("should read the request payload from JSON file dynamically", async () => {
    const requestBody = JSON.parse(
      fs.readFileSync("./testdata/more_orders.json", "utf-8"),
    );

    await request(baseurl)
      .post("/addOrder")
      .send(requestBody)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.be.equal("Orders added successfully!");
      });
  });

  it("should generate the valid token", async () => {
    let response = await request(baseurl).post("/auth").send(authCredentials);

    expect(response.statusCode).to.be.equal(201);
    expect(response.body.message).to.be.equal("Authentication Successful!");
    expect(response.body.token).not.to.be.null;
    token = response.body.token;
  });

  it("should upload an image and return status code 200", async () => {
    const __dirname = process.cwd();
    const filePath = Path.join(__dirname, "/testdata/sample_image.png");

    let response = await request(baseurl)
      .post("/imageUpload")
      .attach("image", filePath)
      .set("Authorization", token);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body.message).to.be.equal("File uploaded successfully!");
    expect(response.body.file.originalName).to.be.equal("sample_image.png");
    expect(response.body.file.path).to.include("uploads/");
    expect(response.body.file.size).to.not.be.null;
  });

  it("should post url-encoded request payload", async () => {
    const userDetails = {
      firstname: "Faisal",
      lastname: "Khatri",
      position: "QA",
      projecturl: "https://github.com/mfaisalkhatri/SuperTest_poc",
    };
    let response = await request("http://localhost:80")
      .post("/post")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .type("form")
      .send(userDetails)
      .expect(200);
    expect(response.body.form.firstname).to.be.equal(userDetails.firstname);
    expect(response.body.form.lastname).to.be.equal(userDetails.lastname);
    expect(response.body.form.position).to.be.equal(userDetails.position);
    expect(response.body.form.projecturl).to.be.equal(userDetails.projecturl);
  });

  it("should post raw text request payload", async () => {
    const rawRequest = "Hello, in plain text!";

    let response = await request("http://localhost:80")
      .post("/post")
      .set("Content-Type", "text/plain")
      .send(rawRequest)
      .expect(200);
    expect(response.body.data).to.be.equal(rawRequest);
  });

  it("should post xml request payload", async () => {
    const xmlRequest = `<?xml version="1.0" encoding="UTF-8"?> <user> <id>101</id> <name>John Doe</name> <email>john@example.com</email> <role>Admin</role> </user>`;

    let response = await request("http://localhost:80")
      .post("/post")
      .set("Content-Type", "application/xml")
      .set("Accept", "application/xml")
      .send(xmlRequest)
      .expect(200);

    expect(response.body.data).to.be.equal(xmlRequest);
  });
  it("should generate single order using builder pattern with Datafaker", async () => {
    const orders = [buildOrder()];
    let response = await request(baseurl)
      .post("/addOrder")
      .send(orders)
      .expect(201);
    expect(response.body.orders[11].user_id).to.be.equal(orders[0].user_id);
    expect(response.body.orders[11].product_name).to.be.equal(
      orders[0].product_name,
    );
  });

  it("should send the request using Builder Pattern with DataFaker", async () => {
    const orders = buildMultipleOrders(5);
    let response = await request(baseurl)
      .post("/addOrder")
      .send(orders)
      .expect(201);
    expect(response.body.orders[13].user_id).to.be.equal(orders[1].user_id);
    expect(response.body.orders[13].product_name).to.be.equal(
      orders[1].product_name,
    );
  });

  it("should generate single order using builder pattern with custom values", async () => {
    const orders = buildOrdersFrom([
      {
        product_name: "iPhone",
        product_amount: 500,
      },
      {
        product_name: "iPad",
        product_amount: 699,
      },
      {
        product_name: "MacBook",
        product_amount: 1999,
      },
    ]);
    let response = await request(baseurl)
      .post("/addOrder")
      .send(orders)
      .expect(201);
    expect(response.body.orders[18].product_name).to.be.equal(
      orders[1].product_name,
    );
    expect(response.body.orders[18].product_amount).to.be.equal(
      orders[1].product_amount,
    );
  });
});
