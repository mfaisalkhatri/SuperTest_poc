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

import request from 'supertest'
import { expect } from 'chai';

describe('Get API Tests using SuperTest', () => {
	const baseurl = "http://localhost:3004";

	it('should fetch the records from Get API using a query param', async () => {
		let response = await request(baseurl).get('/getOrder').query({ product_id: 3 });

		expect(response.statusCode).to.be.equal(200);
		expect(response.body.message).to.be.equal('Order found!!');
		expect(response.body.orders.length).to.be.above(0);
		expect(response.body.orders[0].user_id).to.be.equal('3');
		expect(response.body.orders[0].product_id).to.be.equal('3');
		expect(response.body.orders[0].product_name).to.be.equal('Samsung S24 Ultra');
		expect(response.body.orders[0].product_amount).to.be.equal(4300);
		expect(response.body.orders[0].qty).to.be.equal(1);
		expect(response.body.orders[0].tax_amt).to.be.equal(5.99);
		expect(response.body.orders[0].total_amt).to.be.equal(4305.99);
	});

	it('should demo get API with header', async () => {

	});
});
