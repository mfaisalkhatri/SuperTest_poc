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

const { expect } = require('chai');
const { BASE_URL, FAKER_BASE_URL } = require('../constants/urls');
const endpoint = require('../services/reqres');
const faker_endpoint = require('../services/faker');
const { getCall } = require('../helper/api');

describe('Get API tests using supertest', () => {
	it('should successfully pass the test for get api with query param', async () => {
		const response = await getCall(BASE_URL, endpoint.allUsers, { page: '2' })
		
		expect(response.statusCode).to.be.equal(200);
		expect(response.body.page).to.be.equal(2);
		expect(response.body.data[0].id).to.be.equal(7);
		expect(response.body.data[0].first_name).to.be.equal('Michael');
	});
	it('should successfully pass the test for get api without query param', async () => {
		const response = await getCall(BASE_URL, endpoint.userByPage(2))

		expect(response.statusCode).to.be.equal(200);
		expect(response.body.data.id).to.be.equal(2);
		expect(response.body.data.first_name).to.be.equal('Janet');
	});

	it('should successfully pass the test for get api with path param', async () => {
		let param = 1;
		const response = await getCall(FAKER_BASE_URL, faker_endpoint.authors(param))

		expect(response.statusCode).to.be.equal(200);
		expect(response.body.id).to.be.equal(param);
	});
});
