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

const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('../constants/urls');
const { user1Payload } = require('../data/payloads');
const endpoint = require('../services/reqres');

describe('Patch API tests using supertest', () => {
	it('should successfully pass the test for patch request', async () => {
		const response = await request(BASE_URL)
			.patch(endpoint.userByPage(2))
			.send(user1Payload)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');

		expect(response.statusCode).to.be.equal(200);
		expect(response.body.name).to.be.equal(user1Payload.name);
		expect(response.body.job).to.be.equal(user1Payload.job);
		expect(response.body.updatedAt).not.to.be.null;
	});
});