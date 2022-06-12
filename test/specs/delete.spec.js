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
const endpoint = require('../services/reqres');

describe('Delete API tests using supertest', () => {
	it('should successfully pass the test for delete request', async () => {
		const response = await request(BASE_URL).delete(endpoint.userByPage(2));

		expect(response.statusCode).to.be.equal(204);
	});
});