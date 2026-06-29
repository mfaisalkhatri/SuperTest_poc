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

// describe('Get API tests using supertest', () => {
// 	const baseurl = 'https://reqres.in';
// 	it('should successfully pass the test for get api with query param', (done) => {
// 		request(baseurl)
// 			.get('/api/users')
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.set('x-api-key', 'reqres-free-v1')
// 			.query({ page: '2' })
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(200);
// 				expect(res.body.page).to.be.equal(2);
// 				expect(res.body.data[0].id).to.be.equal(7);
// 				expect(res.body.data[0].first_name).to.be.equal('Michael');
// 				done();
// 			});
// 	});
// 	it('should successfully pass the test for get api without query param', (done) => {
// 		request(baseurl)
// 			.get('/api/users/2')
// 			.set('x-api-key', 'reqres-free-v1')
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(200);
// 				expect(res.body.data.id).to.be.equal(2);
// 				expect(res.body.data.first_name).to.be.equal('Janet');
// 				done();
// 			});
// 	});

// 	it('should successfully pass the test for get api with path param', (done) => {
// 		let param = 1;
// 		request('https://fakerestapi.azurewebsites.net')
// 			.get('/api/v1/Authors/' + param)
// 			.end(function (err, res) {
// 				expect(res.statusCode).to.be.equal(200);
// 				expect(res.body.id).to.be.equal(1);
// 				done();
// 			});
// 	});
// });
